import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import Weather from './weather';
import OptionsEngine from './OptionsEngine';
import RollerCoaster from './RollerCoaster';
import Player from './Player';

class Scene {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.clock = new THREE.Clock();

        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.weather = new Weather(this.scene);
        this.optionsEngine = new OptionsEngine();
        this.rollerCoaster = new RollerCoaster(this.scene);
        this.player = new Player(this.scene, this.rollerCoaster);

        this.totalSimTime = 60; //The time of waiting
        this.timeRemaining = this.totalSimTime;
        this.gameState = 'initial_scenario';
        this.userChoice = null;
        this.outcomeMessage = '';
        this.simulationActive = false;

        this.textDisplayArea = null;
        this.timelineElement = null;
        this.callButton = null;
        this.putButton = null;
        this.restartButton = null;

        this.initScene();
        this.initUI();
        this.animate();
    }

    initUI() {
        this.textDisplayArea = document.createElement('div');
        this.textDisplayArea.style.position = 'absolute';
        this.textDisplayArea.style.top = '20px';
        this.textDisplayArea.style.left = '20px';
        this.textDisplayArea.style.padding = '15px';
        this.textDisplayArea.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
        this.textDisplayArea.style.color = 'white';
        this.textDisplayArea.style.fontFamily = 'Arial, sans-serif';
        this.textDisplayArea.style.fontSize = '16px';
        this.textDisplayArea.style.maxWidth = '450px';
        this.textDisplayArea.style.maxHeight = '80vh';
        this.textDisplayArea.style.overflowY = 'auto';
        this.textDisplayArea.style.border = '1px solid white';
        this.textDisplayArea.style.borderRadius = '8px';
        this.textDisplayArea.style.zIndex = '100';
        document.body.appendChild(this.textDisplayArea);

        const timelineContainer = document.createElement('div');
        timelineContainer.style.position = 'absolute';
        timelineContainer.style.top = '20px';
        timelineContainer.style.right = '20px';
        timelineContainer.style.width = '200px';
        timelineContainer.style.height = '20px';
        timelineContainer.style.backgroundColor = 'rgba(0,0,0,0.5)';
        timelineContainer.style.border = '1px solid #ccc';
        timelineContainer.style.borderRadius = '5px';
        timelineContainer.style.zIndex = '100';
        document.body.appendChild(timelineContainer);

        this.timelineElement = document.createElement('div');
        this.timelineElement.style.width = '100%';
        this.timelineElement.style.height = '100%';
        this.timelineElement.style.backgroundColor = '#4CAF50';
        this.timelineElement.style.borderRadius = '4px';
        timelineContainer.appendChild(this.timelineElement);

        const buttonContainer = document.createElement('div');
        buttonContainer.style.position = 'absolute';
        buttonContainer.style.bottom = '20px';
        buttonContainer.style.left = '50%';
        buttonContainer.style.transform = 'translateX(-50%)';
        buttonContainer.style.zIndex = '101';

        this.callButton = document.createElement('button');
        this.callButton.innerText = 'Buy Call Option ($5)';
        this.callButton.style.marginRight = '10px';
        this.callButton.style.padding = '10px 15px';
        this.callButton.style.fontSize = '16px';
        this.callButton.style.cursor = 'pointer';
        this.callButton.onclick = () => {
            if (this.gameState === 'awaiting_choice') {
                this.userChoice = 'call';
                this.gameState = 'player_acting';
                this.outcomeMessage = 'You chose the Call Option. Player is heading to the ride...';
                this.player.reactToOutcome('exercise');
                this.updateTextDisplay();
                this.callButton.disabled = true;
                this.putButton.disabled = true;
            }
        };

        this.putButton = document.createElement('button');
        this.putButton.innerText = 'Buy Put Option ($5)';
        this.putButton.style.padding = '10px 15px';
        this.putButton.style.fontSize = '16px';
        this.putButton.style.cursor = 'pointer';
        this.putButton.onclick = () => {
            if (this.gameState === 'awaiting_choice') {
                this.userChoice = 'put';
                this.gameState = 'player_acting';
                this.outcomeMessage = 'You chose the Put Option. Assessing the situation...';
                this.player.reactToOutcome('payout_pending');
                this.updateTextDisplay();
                this.callButton.disabled = true;
                this.putButton.disabled = true;
                this.simulationActive = true;
            }
        };

        this.restartButton = document.createElement('button');
        this.restartButton.innerText = 'Restart Simulation';
        this.restartButton.style.padding = '10px 15px';
        this.restartButton.style.fontSize = '16px';
        this.restartButton.style.cursor = 'pointer';
        this.restartButton.style.marginLeft = '20px';
        this.restartButton.style.display = 'none';
        this.restartButton.onclick = () => {
            window.location.reload();
        };

        buttonContainer.appendChild(this.callButton);
        buttonContainer.appendChild(this.putButton);
        buttonContainer.appendChild(this.restartButton);
        document.body.appendChild(buttonContainer);

        this.updateTextDisplay();
    }

    updateTextDisplay() {
        if (!this.textDisplayArea) return;
        let message = '';
        switch (this.gameState) {
            case 'initial_scenario':
                message = `Imagine you're at an amusement park. There's a massive roller coaster. A ticket for the ride costs $20 now. But the weather is weird—if it rains, the ride shuts down and you lose your money.<br><br>
                So the park offers you two choices:<br><br>
                <strong>Call Option:</strong> Pay $5 now for the right to ride anytime in the next hour if the sun comes out. If it rains, you just lose the $5.<br><br>
                <strong>Put Option:</strong> Pay $5 for a rain insurance—if it rains and the ride shuts, you get $20 back. If it doesn't rain, you lose just the $5 fee.<br><br>
                Please choose an option below.`;
                this.gameState = 'awaiting_choice';
                if (this.callButton) this.callButton.disabled = false;
                if (this.putButton) this.putButton.disabled = false;
                if (this.restartButton) this.restartButton.style.display = 'none';
                break;
            case 'awaiting_choice':
                message = `Imagine you're at an amusement park. There's a massive roller coaster. A ticket for the ride costs $20 now. But the weather is weird—if it rains, the ride shuts down and you lose your money.<br><br>
                So the park offers you two choices:<br><br>
                <strong>Call Option:</strong> Pay $5 now for the right to ride anytime in the next hour if the sun comes out. If it rains, you just lose the $5.<br><br>
                <strong>Put Option:</strong> Pay $5 for a rain insurance—if it rains and the ride shuts, you get $20 back. If it doesn't rain, you lose just the $5 fee.<br><br>
                Please choose an option below.`;
                if (this.callButton) this.callButton.disabled = false;
                if (this.putButton) this.putButton.disabled = false;
                break;
            case 'player_acting':
            case 'simulating_call':
            case 'simulating_put':
                message = this.outcomeMessage;
                message += `<br><br>Time Remaining: ${Math.ceil(this.timeRemaining)}s`;
                break;
            case 'outcome_displayed':
                message = this.outcomeMessage;
                message += "<br><br>Simulation ended. Click Restart to try again.";
                if (this.callButton) this.callButton.disabled = true;
                if (this.putButton) this.putButton.disabled = true;
                if (this.restartButton) this.restartButton.style.display = 'inline-block';
                break;
            default:
                message = 'Welcome to the Options Ride!';
        }
        this.textDisplayArea.innerHTML = message;
    }

    updateTimeline() {
        if (this.timelineElement) {
            const progress = Math.max(0, this.timeRemaining / this.totalSimTime);
            this.timelineElement.style.width = (progress * 100) + '%';
            if (progress < 0.3) {
                this.timelineElement.style.backgroundColor = '#f44336';
            } else if (progress < 0.6) {
                this.timelineElement.style.backgroundColor = '#ffeb3b';
            } else {
                this.timelineElement.style.backgroundColor = '#4CAF50';
            }
        }
    }

    initScene() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.camera.position.set(0, 15, 60);
        this.camera.lookAt(0, 5, 0);

        const groundGeometry = new THREE.PlaneGeometry(200, 200);
        const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x3c7a3c, roughness: 0.9, metalness: 0.1 });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        this.scene.add(ground);

        const skyGeometry = new THREE.SphereGeometry(500, 32, 32);
        const skyMaterial = new THREE.MeshBasicMaterial({ color: 0x87ceeb, side: THREE.BackSide });
        const sky = new THREE.Mesh(skyGeometry, skyMaterial);
        this.scene.add(sky);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(100, 150, 100);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 500;
        directionalLight.shadow.camera.left = -150;
        directionalLight.shadow.camera.right = 150;
        directionalLight.shadow.camera.top = 150;
        directionalLight.shadow.camera.bottom = -150;
        this.scene.add(directionalLight);
        this.scene.add(directionalLight.target);
    }

    playerAtGate() {
        if (this.userChoice === 'call') {
            this.outcomeMessage = 'Player at the gate! Weather simulation starting...';
            this.gameState = 'simulating_call';
            this.simulationActive = true;
            this.updateTextDisplay();
        }
    }

    animate() {
        const deltaTime = this.clock.getDelta();
        requestAnimationFrame(() => this.animate());

        this.player.update(deltaTime);
        this.weather.updateWeather(deltaTime);

        if (this.simulationActive && this.gameState !== 'outcome_displayed') {
            this.timeRemaining -= deltaTime;
            this.updateTimeline();
            this.updateTextDisplay();

            const weatherState = this.weather.weatherState;

            if (this.timeRemaining > 0) {
                let outcomeDetails = '';
                if (this.userChoice === 'call' && this.gameState === 'simulating_call') {
                    const callOutcome = this.optionsEngine.evaluateCallOption(weatherState, this.timeRemaining);
                    if (callOutcome === 'exercise' && weatherState === 'sunny') {
                        outcomeDetails = 'The sun is shining! Your Call Option allows you to ride! You paid $5, ride value $20.';
                        this.player.reactToOutcome('exercise_success');
                        this.rollerCoaster.playerRides();
                        this.gameState = 'outcome_displayed';
                        this.simulationActive = false;
                    } else if (weatherState === 'rainy') {
                        outcomeDetails = 'Oh no, it started raining! Your Call Option is worthless. You lost $5.';
                        this.player.reactToOutcome('expired_rain');
                        this.rollerCoaster.shutDownRide();
                        this.gameState = 'outcome_displayed';
                        this.simulationActive = false;
                    }
                } else if (this.userChoice === 'put' && this.gameState === 'simulating_put') {
                    const putOutcome = this.optionsEngine.evaluatePutOption(weatherState, this.timeRemaining);
                    if (putOutcome === 'payout' && weatherState === 'rainy') {
                        outcomeDetails = 'It rained! Your Put Option (rain insurance) paid off. You get $20 back (net $15 profit).';
                        this.player.reactToOutcome('payout_success');
                        this.rollerCoaster.shutDownRide();
                        this.gameState = 'outcome_displayed';
                        this.simulationActive = false;
                    }
                }
                if (this.gameState === 'outcome_displayed') {
                    this.outcomeMessage = outcomeDetails;
                }
            } else {
                this.simulationActive = false;
                this.gameState = 'outcome_displayed';
                if (this.userChoice === 'call') {
                    this.outcomeMessage = 'Time ran out! The sun didn\'t come out (or it rained). Your Call Option expired worthless. You lost $5.';
                    this.player.reactToOutcome('expired_timeout');
                } else if (this.userChoice === 'put') {
                    this.outcomeMessage = 'Time ran out! It didn\'t rain. Your Put Option (rain insurance) expired. You lost $5.';
                    this.player.reactToOutcome('expired_timeout');
                }
                this.rollerCoaster.shutDownRide();
            }
            this.updateTextDisplay();
        }
        this.renderer.render(this.scene, this.camera);
    }
}

window.playerReachedGateCallback = () => {
    if (window.currentSceneInstance) {
        window.currentSceneInstance.playerAtGate();
    }
};

window.currentSceneInstance = new Scene();