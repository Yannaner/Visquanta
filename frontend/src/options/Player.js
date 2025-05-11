import * as THREE from 'three';

class Player {
    constructor(scene, rollerCoaster) { // Added rollerCoaster parameter
        this.scene = scene;
        this.rollerCoaster = rollerCoaster; // Store reference to the roller coaster
        this.avatar = null;
        this.initPlayer();
        this.state = 'idle'; // Possible states: 'idle', 'walking_to_gate', 'at_gate', 'riding', 'walking_away_loss', 'walking_away_refund'
        this.isMoving = false;
        this.targetPosition = new THREE.Vector3();
        this.moveSpeed = 5; // Units per second
        this.walkAnimationTime = 0;
    }

    initPlayer() {
        const avatarBody = new THREE.Mesh(
            new THREE.CapsuleGeometry(0.5, 1.0, 4, 8),
            new THREE.MeshStandardMaterial({ color: 0x0077ff, roughness: 0.6, metalness: 0.2 })
        );
        avatarBody.position.y = 0.5; // Base of capsule on ground

        const avatarHead = new THREE.Mesh(
            new THREE.SphereGeometry(0.3, 16, 16),
            new THREE.MeshStandardMaterial({ color: 0xffddaa, roughness: 0.5 })
        );
        avatarHead.position.y = 1.5; // Position head on top of body

        this.avatar = new THREE.Group();
        this.avatar.add(avatarBody);
        this.avatar.add(avatarHead);
        
        this.avatar.position.set(0, 0, 15); // Initial position, Y will be set by ground. Player stands on ground.
        this.avatar.castShadow = true;
        this.avatar.children.forEach(child => child.castShadow = true);
        this.scene.add(this.avatar);
        this.setHeightToGround(); 
    }

    setHeightToGround() {
        // Simple ground height adjustment. Assumes ground is at Y=0.
        // In a more complex scene, raycasting would be used.
        if (this.avatar) {
            this.avatar.position.y = 1.0; // Height of the capsule base + head offset
        }
    }

    moveTo(targetPosition, onComplete) {
        if (this.avatar) {
            this.targetPosition.copy(targetPosition);
            // Ensure target Y is also on the ground
            this.targetPosition.y = 1.0; 
            this.isMoving = true;
            this.onMovementComplete = onComplete; // Callback when movement finishes
            console.log(`Player: Starting move to ${targetPosition.x}, ${targetPosition.z}`);
        }
    }

    reactToOutcome(outcome) {
        this.avatar.visible = true; // Ensure player is visible at start of reaction
        switch (outcome) {
            case 'exercise': // Call option success
                this.state = 'walking_to_gate';
                console.log('Player: Moving to roller coaster gate.');
                this.moveTo(new THREE.Vector3(-28, 1, 0), () => { // Position near the gate
                    this.state = 'at_gate';
                    console.log('Player: Arrived at gate. Attempting to ride.');
                    if (this.rollerCoaster) {
                        this.rollerCoaster.playerRides(); // This will open the gate
                    }
                    // Delay "getting on" to allow gate to open visually
                    setTimeout(() => {
                        this.state = 'riding'; 
                        // Player avatar will now be handled by update() to follow cart
                        console.log('Player is now "on" the roller coaster!');
                    }, 1000); // 1 second delay for gate to open
                });
                break;
            case 'payout': // Put option success (rain)
                this.state = 'walking_away_refund';
                console.log('Player: It rained! Getting a refund.');
                if (this.rollerCoaster) {
                    this.rollerCoaster.shutDownRide(); // Gate closes, ride shuts
                }
                // Player might move to a "refund booth" or just show happiness
                // For now, just log and player stays
                console.log('Player received a refund!');
                break;
            case 'expired': // Option expired worthless
                this.state = 'walking_away_loss';
                this.avatar.visible = true; // Make sure player is visible to walk away
                console.log('Player: Option expired worthless. Walking away (simulation).');
                if (this.rollerCoaster) {
                    this.rollerCoaster.shutDownRide(); // Ensure gate is closed if it wasn't already
                }
                // Simulate walking away
                this.moveTo(new THREE.Vector3(0, 1, 25), () => { // Move to a "sad" spot
                    console.log('Player has walked away sadly.');
                    this.state = 'idle';
                });
                break;
            default:
                this.state = 'idle';
                console.log('Player: Unknown outcome or waiting.');
        }
    }

    update(deltaTime) {
        if (this.isMoving && this.avatar) {
            const distanceToTarget = this.avatar.position.distanceTo(this.targetPosition);
            if (distanceToTarget > 0.1) {
                const direction = this.targetPosition.clone().sub(this.avatar.position).normalize();
                this.avatar.position.add(direction.multiplyScalar(this.moveSpeed * deltaTime));
                this.avatar.lookAt(this.targetPosition); // Make player face the direction of movement

                // Simple bobbing animation (walking)
                this.walkAnimationTime += deltaTime * 10; // Adjust speed of bob
                this.avatar.position.y = 1.0 + Math.sin(this.walkAnimationTime) * 0.1;
            } else {
                this.avatar.position.copy(this.targetPosition); // Snap to target
                this.isMoving = false;
                this.avatar.position.y = 1.0; // Reset bob
                console.log('Player: Movement complete.');
                if (this.onMovementComplete) {
                    this.onMovementComplete();
                    this.onMovementComplete = null; // Clear callback
                }
            }
        }

        if (this.state === 'riding' && this.rollerCoaster && this.rollerCoaster.cart && this.avatar) {
            this.avatar.visible = true; // Make sure avatar is visible if it was hidden
            // Attach player to the cart - simple position copy for now
            // A better approach would be to add the avatar as a child of the cart group
            // and set a local position.
            const cartPosition = this.rollerCoaster.cart.position;
            this.avatar.position.set(cartPosition.x, cartPosition.y + 0.5, cartPosition.z); // Adjust Y to sit "in" cart
            
            // Match cart orientation - this might need refinement based on cart's lookAt
            const tangent = this.rollerCoaster.curve.getTangentAt( (this.rollerCoaster.cart.userData.t || 0) );
            const lookAtPosition = this.avatar.position.clone().add(tangent);
            this.avatar.lookAt(lookAtPosition);

        } else if (this.state !== 'riding' && this.state !== 'walking_to_gate' && this.state !== 'walking_away_loss') {
             // Ensure player is on the ground if not moving or riding
            if (!this.isMoving) {
                this.setHeightToGround();
            }
        }
    }
}

export default Player;