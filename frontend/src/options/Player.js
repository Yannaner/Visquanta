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
            case 'exercise': // Call option - moving to gate
            case 'exercise_success': // Call option success
                this.state = 'walking_to_gate';
                console.log('Player: Moving to roller coaster gate for call option.');
                this.moveTo(new THREE.Vector3(-28, 1, 0), () => { // Position near the gate
                    this.state = 'at_gate';
                    console.log('Player: Arrived at gate. Attempting to exercise call option.');
                    if (this.rollerCoaster) {
                        this.rollerCoaster.playerRides(); // This will open the gate
                    }
                    // Delay "getting on" to allow gate to open visually
                    setTimeout(() => {
                        this.state = 'riding'; 
                        console.log('Player successfully exercised call option and is riding!');
                    }, 1000); // 1 second delay for gate to open
                });
                break;
                
            case 'payout': // Put option success (rain)
            case 'payout_success':
            case 'payout_pending':
                this.state = 'awaiting_weather';
                console.log('Player: Bought put option, waiting to see if rain insurance pays out.');
                // Player stays in place, watching the weather
                if (outcome === 'payout_success') {
                    console.log('Player: Put option paid out! Received insurance money.');
                    // Could add animation showing player celebrating
                }
                break;
                
            case 'expired': // Option expired worthless
            case 'expired_timeout':
            case 'expired_rain':
                this.state = 'walking_away_loss';
                this.avatar.visible = true; // Make sure player is visible to walk away
                console.log('Player: Option expired or became worthless. Walking away disappointed.');
                if (this.rollerCoaster) {
                    this.rollerCoaster.shutDownRide(); // Ensure gate is closed if it wasn't already
                }
                // Simulate walking away sadly
                this.moveTo(new THREE.Vector3(0, 1, 30), () => { // Move to a "disappointed" spot
                    console.log('Player has walked away, having learned about options risk management.');
                    this.state = 'idle';
                });
                break;
                
            default:
                this.state = 'idle';
                console.log('Player: Waiting or unknown outcome.');
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