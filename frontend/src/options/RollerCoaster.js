import * as THREE from 'three';

class RollerCoaster {
    constructor(scene) {
        this.scene = scene;
        this.track = null;
        this.cart = null;
        this.gate = null;
        this.curve = null; // To store the CatmullRomCurve3 object
        this.initRollerCoaster();
    }

    initRollerCoaster() {
        // 1. Create a more interesting track using CatmullRomCurve3 and TubeGeometry
        this.curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-30, 2, 0),
            new THREE.Vector3(-20, 5, -10),
            new THREE.Vector3(0, 10, -15),
            new THREE.Vector3(20, 8, -5),
            new THREE.Vector3(30, 4, 5),
            new THREE.Vector3(15, 2, 15),
            new THREE.Vector3(-10, 3, 10),
            new THREE.Vector3(-30, 2, 0) // Closing the loop
        ]);

        const trackGeometry = new THREE.TubeGeometry(this.curve, 100, 0.8, 8, true);
        // Use a more metallic or detailed material for the track
        const trackMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x555555, 
            metalness: 0.8, 
            roughness: 0.3 
        });
        this.track = new THREE.Mesh(trackGeometry, trackMaterial);
        this.scene.add(this.track);

        // 2. Create a more detailed cart
        const cartGroup = new THREE.Group();

        const cartBodyGeometry = new THREE.BoxGeometry(2.5, 1.5, 4);
        const cartBodyMaterial = new THREE.MeshStandardMaterial({ color: 0xff4500, metalness: 0.5, roughness: 0.5 });
        const cartBody = new THREE.Mesh(cartBodyGeometry, cartBodyMaterial);
        cartBody.position.y = 0.75; // Lift body slightly
        cartGroup.add(cartBody);

        // Add some simple wheels (cylinders)
        const wheelGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 16);
        const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.9, roughness: 0.2 });
        
        const wheelPositions = [
            { x: -1.2, y: -0.25, z: 1.5 }, { x: 1.2, y: -0.25, z: 1.5 },
            { x: -1.2, y: -0.25, z: -1.5 }, { x: 1.2, y: -0.25, z: -1.5 }
        ];

        wheelPositions.forEach(pos => {
            const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
            wheel.rotation.z = Math.PI / 2; // Orient wheels correctly
            wheel.position.set(pos.x, pos.y, pos.z);
            cartGroup.add(wheel);
        });
        
        this.cart = cartGroup;
        // Initial position at the start of the curve
        const initialPoint = this.curve.getPointAt(0);
        this.cart.position.copy(initialPoint);
        this.cart.position.y += 1; // Adjust Y to sit on top of the track
        this.cart.castShadow = true;
        this.cart.children.forEach(child => {
            if (child.isMesh) child.castShadow = true;
        });
        this.scene.add(this.cart);

        // 3. Create an enhanced gate with pricing sign
        const gateGroup = new THREE.Group();
        
        // Main gate
        const gateGeometry = new THREE.BoxGeometry(5, 4, 0.5);
        const gateMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513, metalness: 0.2, roughness: 0.8 });
        this.gate = new THREE.Mesh(gateGeometry, gateMaterial);
        this.gate.position.y = 2;
        gateGroup.add(this.gate);
        
        // Price sign on gate
        const signGeometry = new THREE.BoxGeometry(3, 1, 0.1);
        const signMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
        const priceSign = new THREE.Mesh(signGeometry, signMaterial);
        priceSign.position.set(0, 3.5, 0.3);
        gateGroup.add(priceSign);
        
        // Gate posts
        const postGeometry = new THREE.BoxGeometry(0.3, 5, 0.3);
        const postMaterial = new THREE.MeshStandardMaterial({ color: 0x654321 });
        const leftPost = new THREE.Mesh(postGeometry, postMaterial);
        leftPost.position.set(-2.5, 2.5, 0);
        const rightPost = new THREE.Mesh(postGeometry, postMaterial);
        rightPost.position.set(2.5, 2.5, 0);
        gateGroup.add(leftPost);
        gateGroup.add(rightPost);
        
        // Position the gate group at the start of the track
        gateGroup.position.set(-30, 0, -2.5);
        gateGroup.castShadow = true;
        gateGroup.children.forEach(child => {
            if (child.isMesh) child.castShadow = true;
        });
        this.scene.add(gateGroup);
        this.gateGroup = gateGroup;
        this.gate.userData.isOpen = false;
    }

    updateCartPosition(time) {
        if (!this.curve || !this.cart) return;

        // Animate cart along the curve
        const loopTime = 20; // Time in seconds for one full loop
        const t = (time % loopTime) / loopTime;
        this.cart.userData.t = t; // Store t for player orientation
        
        const position = this.curve.getPointAt(t);
        const tangent = this.curve.getTangentAt(t).normalize();

        this.cart.position.copy(position);
        this.cart.position.y += 1; // Keep cart above the track

        // Align cart to the track direction
        this.cart.lookAt(position.clone().add(tangent));
    }

    openGate() {
        if (this.gate && !this.gate.userData.isOpen) {
            // Animate gate opening (slide upwards)
            this.gate.position.y += 3.5;
            this.gate.userData.isOpen = true;
            console.log("🎢 Gate opened - Call option exercised successfully!");
        }
    }

    closeGate() {
        if (this.gate && this.gate.userData.isOpen) {
            this.gate.position.y -= 3.5;
            this.gate.userData.isOpen = false;
            console.log("🚫 Gate closed - Ride shut down");
        }
    }

    // Method to be called when player exercises call option
    playerRides() {
        this.openGate();
        console.log("🎢 Player successfully exercised call option and is riding!");
    }

    // Method for when ride is shut (e.g. rain or option expired)
    shutDownRide() {
        this.closeGate();
        console.log("🌧️ Roller coaster ride shut down due to weather or expired option.");
    }
}

export default RollerCoaster;