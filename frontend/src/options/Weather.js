import * as THREE from 'three';

class Weather {
    constructor(scene) {
        this.scene = scene;
        this.weatherState = 'sunny'; // 'sunny', 'clouding_over', 'rainy', 'clearing_up'
        this.clouds = [];
        this.rainParticles = null;
        this.rainGeometry = null;
        this.cloudTargetCount = 5; // Target number of clouds for sunny weather
        this.isTransitioning = false;
        this.transitionTimer = 0;
        this.transitionDuration = 5; // 5 seconds for weather transition

        this.initWeather();
    }

    initWeather() {
        // Sun - A visible sphere representing the sun
        const sunGeometry = new THREE.SphereGeometry(10, 32, 32);
        const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffddaa, fog: false });
        this.sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
        this.sunMesh.position.set(100, 70, -100);
        this.scene.add(this.sunMesh);

        // Ambient light, gets dimmer when rainy
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(this.ambientLight);

        // Directional light from the sun
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        this.directionalLight.position.copy(this.sunMesh.position);
        this.directionalLight.target.position.set(0, 0, 0);
        this.scene.add(this.directionalLight);
        this.scene.add(this.directionalLight.target);

        // Initialize clouds
        for (let i = 0; i < this.cloudTargetCount; i++) {
            this.createAndAddCloud();
        }

        // Rain Particle System
        const particleCount = 5000;
        this.rainGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = Math.random() * 200 - 100; // x
            positions[i * 3 + 1] = Math.random() * 100 + 50; // y (start high)
            positions[i * 3 + 2] = Math.random() * 200 - 100; // z

            velocities[i * 3] = 0; // x vel
            velocities[i * 3 + 1] = -(Math.random() * 0.3 + 0.2); // y vel (fall speed)
            velocities[i * 3 + 2] = 0; // z vel
        }
        this.rainGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        this.rainGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

        const rainMaterial = new THREE.PointsMaterial({
            color: 0xaaaaee,
            size: 0.3,
            transparent: true,
            opacity: 0.7,
            fog: true
        });
        this.rainParticles = new THREE.Points(this.rainGeometry, rainMaterial);
        this.rainParticles.visible = false;
        this.scene.add(this.rainParticles);
    }

    createFluffyCloud() {
        const cloudGroup = new THREE.Group();
        const baseMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xffffff, 
            transparent: true, 
            opacity: 0.8, 
            flatShading: true, // Gives a more stylized look
            roughness: 0.9
        });

        const numPuffs = Math.floor(Math.random() * 5) + 5; // 5 to 9 puffs
        for (let i = 0; i < numPuffs; i++) {
            const puffSize = Math.random() * 3 + 2; // Puffs of varying sizes
            const puffGeometry = new THREE.SphereGeometry(puffSize, 8, 6);
            const puff = new THREE.Mesh(puffGeometry, baseMaterial);
            puff.position.set(
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 3,
                (Math.random() - 0.5) * 5
            );
            puff.castShadow = true;
            cloudGroup.add(puff);
        }
        return cloudGroup;
    }

    createAndAddCloud() {
        const cloud = this.createFluffyCloud();
        cloud.position.set(
            Math.random() * 150 - 75, // Spread clouds wider
            Math.random() * 10 + 35,  // Cloud height
            Math.random() * 150 - 75
        );
        cloud.userData.velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 0.01, 
            0, 
            (Math.random() - 0.5) * 0.01
        );
        this.scene.add(cloud);
        this.clouds.push(cloud);
        return cloud;
    }

    setWeatherState(newState) {
        if (this.weatherState === newState || this.isTransitioning) return;

        console.log(`Weather changing from ${this.weatherState} to ${newState}`);
        this.isTransitioning = true;
        this.transitionTimer = 0;
        this.targetWeatherState = newState; // Store what we are transitioning to
    }

    updateWeather(deltaTime) {
        // Animate clouds
        this.clouds.forEach(cloud => {
            cloud.position.add(cloud.userData.velocity);
            // Simple boundary check for clouds to reappear on the other side
            if (cloud.position.x > 80) cloud.position.x = -80;
            if (cloud.position.x < -80) cloud.position.x = 80;
            if (cloud.position.z > 80) cloud.position.z = -80;
            if (cloud.position.z < -80) cloud.position.z = 80;
        });

        // Handle weather transitions
        if (this.isTransitioning) {
            this.transitionTimer += deltaTime;
            const progress = Math.min(this.transitionTimer / this.transitionDuration, 1);

            if (this.targetWeatherState === 'rainy') {
                this.ambientLight.intensity = THREE.MathUtils.lerp(0.6, 0.2, progress);
                this.directionalLight.intensity = THREE.MathUtils.lerp(0.8, 0.1, progress);
                this.sunMesh.material.color.setHex(THREE.MathUtils.lerp(0xffddaa, 0x555555, progress));
                // Increase cloud count
                if (this.clouds.length < this.cloudTargetCount + 10 && Math.random() < progress * 0.1) {
                    const newCloud = this.createAndAddCloud();
                    // Set opacity for all puffs in the cloud group
                    if (newCloud && newCloud.children && newCloud.children.length > 0) {
                        newCloud.children.forEach(puff => {
                            if (puff.material) {
                                puff.material.opacity = progress * 0.5 + 0.3; // Darker clouds
                            }
                        });
                    }
                }
                this.rainParticles.visible = true;
                this.rainParticles.material.opacity = THREE.MathUtils.lerp(0, 0.7, progress);

            } else if (this.targetWeatherState === 'sunny') {
                this.ambientLight.intensity = THREE.MathUtils.lerp(0.2, 0.6, progress);
                this.directionalLight.intensity = THREE.MathUtils.lerp(0.1, 0.8, progress);
                this.sunMesh.material.color.setHex(THREE.MathUtils.lerp(0x555555, 0xffddaa, progress));
                // Reduce cloud count gradually (more complex, for now just make them less opaque)
                this.clouds.forEach(c => {
                    if (c.children.length > 0) { // Assuming fluffy clouds are groups
                        c.children.forEach(puff => {
                            if (puff.material) {
                                puff.material.opacity = THREE.MathUtils.lerp(0.8, 0.3, 1-progress);
                            }
                        });
                    }
                });
                this.rainParticles.material.opacity = THREE.MathUtils.lerp(0.7, 0, progress);
            }

            if (progress >= 1) {
                this.isTransitioning = false;
                this.weatherState = this.targetWeatherState;
                if (this.weatherState === 'sunny') {
                    this.rainParticles.visible = false;
                    // Prune extra clouds if needed
                    while(this.clouds.length > this.cloudTargetCount) {
                        const oldCloud = this.clouds.pop();
                        this.scene.remove(oldCloud);
                    }
                }
                console.log(`Weather is now ${this.weatherState}`);
            }
        }

        // Update rain particles if visible
        if (this.rainParticles.visible) {
            const positions = this.rainGeometry.attributes.position.array;
            const velocities = this.rainGeometry.attributes.velocity.array;
            for (let i = 0; i < positions.length / 3; i++) {
                positions[i * 3 + 1] += velocities[i * 3 + 1]; // Update y position based on velocity
                if (positions[i * 3 + 1] < 0) { // Reset raindrop if it hits the ground
                    positions[i * 3 + 1] = Math.random() * 50 + 50; // Reset to a height
                    positions[i * 3] = Math.random() * 200 - 100; // New x
                    positions[i * 3 + 2] = Math.random() * 200 - 100; // New z
                }
            }
            this.rainGeometry.attributes.position.needsUpdate = true;
        }

        // Simplified random weather change trigger for demo purposes (can be controlled by Scene.js)
        if (!this.isTransitioning && Math.random() < 0.001) { // Reduced frequency
            this.setWeatherState(this.weatherState === 'sunny' ? 'rainy' : 'sunny');
        }
    }
}

export default Weather;