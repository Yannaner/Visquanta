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

        // Enhanced timing and pricing
        this.totalSimTime = 20; // Increased to 20 seconds for better demonstration
        this.timeRemaining = this.totalSimTime;
        this.gameState = 'initial_scenario';
        this.userChoice = null;
        this.outcomeMessage = '';
        this.simulationActive = false;
        
        // Options tracking for educational purposes
        this.premiumPaid = 0;
        this.potentialPayout = 0;
        this.currentProfit = 0;

        // Enhanced UI elements
        this.textDisplayArea = null;
        this.timelineElement = null;
        this.callButton = null;
        this.putButton = null;
        this.restartButton = null;
        this.profitDisplay = null;
        this.weatherDisplay = null;
        this.optionsInfoPanel = null;

        this.initScene();
        this.initUI();
        this.createVisualElements();
        this.animate();
    }

    initUI() {
        // Main explanation panel
        this.textDisplayArea = document.createElement('div');
        this.textDisplayArea.style.position = 'absolute';
        this.textDisplayArea.style.top = '20px';
        this.textDisplayArea.style.left = '20px';
        this.textDisplayArea.style.padding = '20px';
        this.textDisplayArea.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
        this.textDisplayArea.style.color = 'white';
        this.textDisplayArea.style.fontFamily = 'Arial, sans-serif';
        this.textDisplayArea.style.fontSize = '14px';
        this.textDisplayArea.style.maxWidth = '500px';
        this.textDisplayArea.style.maxHeight = '70vh';
        this.textDisplayArea.style.overflowY = 'auto';
        this.textDisplayArea.style.border = '2px solid #4CAF50';
        this.textDisplayArea.style.borderRadius = '10px';
        this.textDisplayArea.style.zIndex = '100';
        document.body.appendChild(this.textDisplayArea);

        // Options info panel (top right)
        this.optionsInfoPanel = document.createElement('div');
        this.optionsInfoPanel.style.position = 'absolute';
        this.optionsInfoPanel.style.top = '20px';
        this.optionsInfoPanel.style.right = '20px';
        this.optionsInfoPanel.style.padding = '15px';
        this.optionsInfoPanel.style.backgroundColor = 'rgba(0, 50, 100, 0.9)';
        this.optionsInfoPanel.style.color = 'white';
        this.optionsInfoPanel.style.fontFamily = 'Arial, sans-serif';
        this.optionsInfoPanel.style.fontSize = '12px';
        this.optionsInfoPanel.style.width = '250px';
        this.optionsInfoPanel.style.border = '2px solid #2196F3';
        this.optionsInfoPanel.style.borderRadius = '8px';
        this.optionsInfoPanel.style.zIndex = '100';
        this.optionsInfoPanel.innerHTML = `
            <h3 style="margin: 0 0 10px 0; color: #2196F3;">📊 Options Dashboard</h3>
            <div><strong>Ride Cost:</strong> $20</div>
            <div><strong>Option Premium:</strong> $5</div>
            <div><strong>Weather:</strong> <span id="weather-status">Checking...</span></div>
            <div><strong>Your Investment:</strong> <span id="investment-status">$0</span></div>
            <div><strong>Potential P&L:</strong> <span id="profit-status">$0</span></div>
        `;
        document.body.appendChild(this.optionsInfoPanel);

        // Timeline container
        const timelineContainer = document.createElement('div');
        timelineContainer.style.position = 'absolute';
        timelineContainer.style.top = '160px';
        timelineContainer.style.right = '20px';
        timelineContainer.style.width = '250px';
        timelineContainer.style.height = '25px';
        timelineContainer.style.backgroundColor = 'rgba(0,0,0,0.7)';
        timelineContainer.style.border = '2px solid #FF9800';
        timelineContainer.style.borderRadius = '15px';
        timelineContainer.style.zIndex = '100';
        document.body.appendChild(timelineContainer);

        const timelineLabel = document.createElement('div');
        timelineLabel.style.position = 'absolute';
        timelineLabel.style.top = '-25px';
        timelineLabel.style.left = '0px';
        timelineLabel.style.color = 'white';
        timelineLabel.style.fontFamily = 'Arial, sans-serif';
        timelineLabel.style.fontSize = '12px';
        timelineLabel.innerText = '⏱️ Option Expiry Timer';
        timelineContainer.appendChild(timelineLabel);

        this.timelineElement = document.createElement('div');
        this.timelineElement.style.width = '100%';
        this.timelineElement.style.height = '100%';
        this.timelineElement.style.backgroundColor = '#4CAF50';
        this.timelineElement.style.borderRadius = '12px';
        this.timelineElement.style.transition = 'width 0.1s ease-out';
        timelineContainer.appendChild(this.timelineElement);

        // Enhanced button container
        const buttonContainer = document.createElement('div');
        buttonContainer.style.position = 'absolute';
        buttonContainer.style.bottom = '30px';
        buttonContainer.style.left = '50%';
        buttonContainer.style.transform = 'translateX(-50%)';
        buttonContainer.style.zIndex = '101';
        buttonContainer.style.display = 'flex';
        buttonContainer.style.gap = '15px';
        buttonContainer.style.alignItems = 'center';

        // Call Option Button
        this.callButton = document.createElement('button');
        this.callButton.innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: 18px; font-weight: bold;">📈 CALL OPTION</div>
                <div style="font-size: 12px; margin-top: 5px;">Premium: $5</div>
                <div style="font-size: 11px; color: #ccc;">Profit if sunny</div>
            </div>
        `;
        this.callButton.style.padding = '15px 20px';
        this.callButton.style.fontSize = '14px';
        this.callButton.style.cursor = 'pointer';
        this.callButton.style.backgroundColor = '#4CAF50';
        this.callButton.style.color = 'white';
        this.callButton.style.border = 'none';
        this.callButton.style.borderRadius = '10px';
        this.callButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
        this.callButton.style.transition = 'all 0.3s ease';
        this.callButton.onmouseover = () => {
            this.callButton.style.backgroundColor = '#45a049';
            this.callButton.style.transform = 'translateY(-2px)';
        };
        this.callButton.onmouseout = () => {
            this.callButton.style.backgroundColor = '#4CAF50';
            this.callButton.style.transform = 'translateY(0px)';
        };
        this.callButton.onclick = () => {
            if (this.gameState === 'awaiting_choice') {
                this.userChoice = 'call';
                this.premiumPaid = 5;
                this.gameState = 'player_acting';
                this.outcomeMessage = 'You bought a CALL OPTION for $5. You have the RIGHT to ride if it\'s sunny!';
                this.player.reactToOutcome('exercise');
                this.updateUI();
                this.callButton.disabled = true;
                this.putButton.disabled = true;
            }
        };

        // Put Option Button
        this.putButton = document.createElement('button');
        this.putButton.innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: 18px; font-weight: bold;">📉 PUT OPTION</div>
                <div style="font-size: 12px; margin-top: 5px;">Premium: $5</div>
                <div style="font-size: 11px; color: #ccc;">Protection if rainy</div>
            </div>
        `;
        this.putButton.style.padding = '15px 20px';
        this.putButton.style.fontSize = '14px';
        this.putButton.style.cursor = 'pointer';
        this.putButton.style.backgroundColor = '#f44336';
        this.putButton.style.color = 'white';
        this.putButton.style.border = 'none';
        this.putButton.style.borderRadius = '10px';
        this.putButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
        this.putButton.style.transition = 'all 0.3s ease';
        this.putButton.onmouseover = () => {
            this.putButton.style.backgroundColor = '#da190b';
            this.putButton.style.transform = 'translateY(-2px)';
        };
        this.putButton.onmouseout = () => {
            this.putButton.style.backgroundColor = '#f44336';
            this.putButton.style.transform = 'translateY(0px)';
        };
        this.putButton.onclick = () => {
            if (this.gameState === 'awaiting_choice') {
                this.userChoice = 'put';
                this.premiumPaid = 5;
                this.gameState = 'player_acting';
                this.outcomeMessage = 'You bought a PUT OPTION for $5. This is your rain insurance!';
                this.player.reactToOutcome('payout_pending');
                this.updateUI();
                this.callButton.disabled = true;
                this.putButton.disabled = true;
                this.simulationActive = true;
            }
        };

        // Restart Button
        this.restartButton = document.createElement('button');
        this.restartButton.innerText = '🔄 New Simulation';
        this.restartButton.style.padding = '15px 20px';
        this.restartButton.style.fontSize = '14px';
        this.restartButton.style.cursor = 'pointer';
        this.restartButton.style.backgroundColor = '#FF9800';
        this.restartButton.style.color = 'white';
        this.restartButton.style.border = 'none';
        this.restartButton.style.borderRadius = '10px';
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

    createVisualElements() {
        // Create a visual representation of the strike price
        const strikePriceSign = new THREE.Group();
        
        // Sign post
        const postGeometry = new THREE.CylinderGeometry(0.1, 0.1, 8, 8);
        const postMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
        const post = new THREE.Mesh(postGeometry, postMaterial);
        post.position.y = 4;
        strikePriceSign.add(post);
        
        // Sign board
        const signGeometry = new THREE.BoxGeometry(6, 2, 0.2);
        const signMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
        const sign = new THREE.Mesh(signGeometry, signMaterial);
        sign.position.y = 7;
        strikePriceSign.add(sign);
        
        // Add text to sign (simplified - in real implementation you'd use TextGeometry)
        const textGeometry = new THREE.PlaneGeometry(5.5, 1.5);
        const textMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x000000, 
            transparent: true, 
            opacity: 0.8 
        });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(0, 7, 0.11);
        strikePriceSign.add(textMesh);
        
        strikePriceSign.position.set(10, 0, 30);
        strikePriceSign.castShadow = true;
        this.scene.add(strikePriceSign);

        // Create premium collection booth
        const boothGeometry = new THREE.BoxGeometry(4, 3, 4);
        const boothMaterial = new THREE.MeshStandardMaterial({ color: 0x4169E1 });
        const booth = new THREE.Mesh(boothGeometry, boothMaterial);
        booth.position.set(-10, 1.5, 25);
        booth.castShadow = true;
        this.scene.add(booth);

        // Booth roof
        const roofGeometry = new THREE.ConeGeometry(3, 2, 4);
        const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x8B0000 });
        const roof = new THREE.Mesh(roofGeometry, roofMaterial);
        roof.position.set(-10, 4, 25);
        roof.castShadow = true;
        this.scene.add(roof);

        // Create profit/loss indicator boards
        this.createProfitLossIndicator();
    }

    createProfitLossIndicator() {
        // Call option profit indicator
        const callIndicatorGeometry = new THREE.BoxGeometry(3, 2, 0.2);
        const callIndicatorMaterial = new THREE.MeshStandardMaterial({ color: 0x00FF00 });
        this.callIndicator = new THREE.Mesh(callIndicatorGeometry, callIndicatorMaterial);
        this.callIndicator.position.set(-20, 3, 15);
        this.callIndicator.visible = false;
        this.scene.add(this.callIndicator);

        // Put option profit indicator
        const putIndicatorGeometry = new THREE.BoxGeometry(3, 2, 0.2);
        const putIndicatorMaterial = new THREE.MeshStandardMaterial({ color: 0xFF0000 });
        this.putIndicator = new THREE.Mesh(putIndicatorGeometry, putIndicatorMaterial);
        this.putIndicator.position.set(20, 3, 15);
        this.putIndicator.visible = false;
        this.scene.add(this.putIndicator);
    }

    updateTextDisplay() {
        if (!this.textDisplayArea) return;
        let message = '';
        switch (this.gameState) {
            case 'initial_scenario':
                message = `
                    <h2 style="color: #4CAF50; margin-top: 0;">🎢 Welcome to Options Trading Academy!</h2>
                    
                    <p><strong>The Scenario:</strong> You want to ride the amazing roller coaster, but there's uncertainty!</p>
                    
                    <div style="background: rgba(255,255,255,0.1); padding: 10px; border-radius: 5px; margin: 10px 0;">
                        <strong>🎟️ Direct Purchase:</strong> Pay $20 now for a ride ticket<br>
                        <strong>❌ Risk:</strong> If it rains, ride closes and you lose $20
                    </div>
                    
                    <p><strong>💡 Smart Solution: Options Contracts!</strong></p>
                    
                    <div style="background: rgba(76, 175, 80, 0.2); padding: 10px; border-radius: 5px; margin: 10px 0;">
                        <strong>📈 CALL OPTION ($5 premium)</strong><br>
                        • Gives you the RIGHT (not obligation) to ride if sunny<br>
                        • Max loss: $5 (just the premium)<br>
                        • Profit if sunny: $20 ride value - $5 premium = <span style="color: #4CAF50;">$15 profit</span>
                    </div>
                    
                    <div style="background: rgba(244, 67, 54, 0.2); padding: 10px; border-radius: 5px; margin: 10px 0;">
                        <strong>📉 PUT OPTION ($5 premium)</strong><br>
                        • Insurance against rain (protective put)<br>
                        • Get $20 back if it rains<br>
                        • Profit if rainy: $20 payout - $5 premium = <span style="color: #4CAF50;">$15 profit</span>
                    </div>
                    
                    <p style="color: #FF9800;"><strong>Choose your strategy below!</strong></p>
                `;
                this.gameState = 'awaiting_choice';
                if (this.callButton) this.callButton.disabled = false;
                if (this.putButton) this.putButton.disabled = false;
                if (this.restartButton) this.restartButton.style.display = 'none';
                break;
                
            case 'awaiting_choice':
                // Keep the same message as initial_scenario
                message = this.textDisplayArea.innerHTML;
                break;
                
            case 'player_acting':
            case 'simulating_call':
            case 'simulating_put':
                const timeLeft = Math.ceil(this.timeRemaining);
                const weatherStatus = this.weather.weatherState;
                
                if (this.userChoice === 'call') {
                    message = `
                        <h3 style="color: #4CAF50;">📈 CALL OPTION ACTIVE</h3>
                        <p><strong>Your Position:</strong> Paid $5 premium for the right to ride if sunny</p>
                        <p><strong>Current Weather:</strong> ${weatherStatus.toUpperCase()}</p>
                        <p><strong>Time Remaining:</strong> ${timeLeft} seconds</p>
                        
                        <div style="background: rgba(76, 175, 80, 0.2); padding: 10px; border-radius: 5px;">
                            <strong>Payoff Analysis:</strong><br>
                            • If sunny: Exercise option, ride worth $20, net profit = $15<br>
                            • If rainy: Option expires worthless, loss = $5<br>
                            • If time expires: Option worthless, loss = $5
                        </div>
                        
                        <p style="color: #FF9800;">Waiting for weather conditions...</p>
                    `;
                } else {
                    message = `
                        <h3 style="color: #f44336;">📉 PUT OPTION ACTIVE</h3>
                        <p><strong>Your Position:</strong> Paid $5 premium for rain insurance</p>
                        <p><strong>Current Weather:</strong> ${weatherStatus.toUpperCase()}</p>
                        <p><strong>Time Remaining:</strong> ${timeLeft} seconds</p>
                        
                        <div style="background: rgba(244, 67, 54, 0.2); padding: 10px; border-radius: 5px;">
                            <strong>Payoff Analysis:</strong><br>
                            • If rainy: Put pays out $20, net profit = $15<br>
                            • If sunny: Put expires worthless, loss = $5<br>
                            • If time expires: Put worthless, loss = $5
                        </div>
                        
                        <p style="color: #FF9800;">Monitoring weather for insurance payout...</p>
                    `;
                }
                break;
                
            case 'outcome_displayed':
                message = this.outcomeMessage;
                message += `
                    <br><br>
                    <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 5px; margin-top: 15px;">
                        <h4 style="margin-top: 0; color: #2196F3;">📚 Learning Summary</h4>
                        <p><strong>Options Key Concepts:</strong></p>
                        <ul>
                            <li><strong>Premium:</strong> The price paid for the option contract</li>
                            <li><strong>Exercise:</strong> Using your right under the option</li>
                            <li><strong>Expiration:</strong> Options have limited time value</li>
                            <li><strong>Risk Management:</strong> Limited downside with unlimited upside potential</li>
                        </ul>
                    </div>
                    <br><strong>🔄 Click "New Simulation" to try different strategies!</strong>
                `;
                if (this.callButton) this.callButton.disabled = true;
                if (this.putButton) this.putButton.disabled = true;
                if (this.restartButton) this.restartButton.style.display = 'inline-block';
                break;
                
            default:
                message = '<h2>🎢 Welcome to Options Trading Academy!</h2>';
        }
        this.textDisplayArea.innerHTML = message;
    }

    updateUI() {
        this.updateTextDisplay();
        this.updateTimeline();
        this.updateOptionsInfo();
    }

    updateOptionsInfo() {
        const weatherStatus = document.getElementById('weather-status');
        const investmentStatus = document.getElementById('investment-status');
        const profitStatus = document.getElementById('profit-status');
        
        if (weatherStatus) {
            weatherStatus.textContent = this.weather.weatherState.toUpperCase();
            weatherStatus.style.color = this.weather.weatherState === 'sunny' ? '#4CAF50' : 
                                      this.weather.weatherState === 'rainy' ? '#f44336' : '#FF9800';
        }
        
        if (investmentStatus) {
            investmentStatus.textContent = `$${this.premiumPaid}`;
            investmentStatus.style.color = this.premiumPaid > 0 ? '#f44336' : '#4CAF50';
        }
        
        if (profitStatus) {
            let potentialProfit = 0;
            if (this.userChoice === 'call' && this.weather.weatherState === 'sunny') {
                potentialProfit = 15; // $20 - $5 premium
            } else if (this.userChoice === 'put' && this.weather.weatherState === 'rainy') {
                potentialProfit = 15; // $20 - $5 premium
            } else if (this.userChoice) {
                potentialProfit = -5; // Just the premium loss
            }
            
            profitStatus.textContent = potentialProfit >= 0 ? `+$${potentialProfit}` : `$${potentialProfit}`;
            profitStatus.style.color = potentialProfit >= 0 ? '#4CAF50' : '#f44336';
        }
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
        
        // Update roller coaster animation
        this.rollerCoaster.updateCartPosition(this.clock.getElapsedTime());
        
        // Update UI continuously
        this.updateOptionsInfo();

        if (this.simulationActive && this.gameState !== 'outcome_displayed') {
            this.timeRemaining -= deltaTime;
            this.updateTimeline();

            const weatherState = this.weather.weatherState;

            if (this.timeRemaining > 0) {
                let outcomeDetails = '';
                if (this.userChoice === 'call' && this.gameState === 'simulating_call') {
                    const callResult = this.optionsEngine.evaluateCallOption(weatherState, this.timeRemaining, this.totalSimTime);
                    if (callResult.action === 'exercise' && weatherState === 'sunny') {
                        outcomeDetails = `
                            <h3 style="color: #4CAF50;">✅ CALL OPTION EXERCISED!</h3>
                            <div style="background: rgba(76, 175, 80, 0.3); padding: 15px; border-radius: 8px;">
                                <p><strong>🌞 It's sunny! Perfect riding weather!</strong></p>
                                <p><strong>Option Payoff Analysis:</strong></p>
                                <ul>
                                    <li>Premium paid: -$5</li>
                                    <li>Ride value exercised: +$20</li>
                                    <li><strong>Net Profit: +$15</strong></li>
                                </ul>
                                <p>You successfully used your call option to ride the roller coaster! Your limited risk ($5) allowed you to capture the full upside ($15 profit).</p>
                            </div>
                        `;
                        this.player.reactToOutcome('exercise_success');
                        this.rollerCoaster.playerRides();
                        this.gameState = 'outcome_displayed';
                        this.simulationActive = false;
                        if (this.callIndicator) this.callIndicator.visible = true;
                    } else if (weatherState === 'rainy') {
                        outcomeDetails = `
                            <h3 style="color: #f44336;">❌ CALL OPTION EXPIRED WORTHLESS</h3>
                            <div style="background: rgba(244, 67, 54, 0.3); padding: 15px; border-radius: 8px;">
                                <p><strong>🌧️ It started raining! Ride is closed!</strong></p>
                                <p><strong>Option Payoff Analysis:</strong></p>
                                <ul>
                                    <li>Premium paid: -$5</li>
                                    <li>Exercise value: $0 (can't ride in rain)</li>
                                    <li><strong>Net Loss: -$5</strong></li>
                                </ul>
                                <p>Your call option protected you from bigger losses. Instead of losing $20 on a direct ticket purchase, you only lost the $5 premium!</p>
                            </div>
                        `;
                        this.player.reactToOutcome('expired_rain');
                        this.rollerCoaster.shutDownRide();
                        this.gameState = 'outcome_displayed';
                        this.simulationActive = false;
                    }
                } else if (this.userChoice === 'put' && this.gameState === 'simulating_put') {
                    const putResult = this.optionsEngine.evaluatePutOption(weatherState, this.timeRemaining, this.totalSimTime);
                    if (putResult.action === 'payout' && weatherState === 'rainy') {
                        outcomeDetails = `
                            <h3 style="color: #4CAF50;">✅ PUT OPTION PAID OUT!</h3>
                            <div style="background: rgba(76, 175, 80, 0.3); padding: 15px; border-radius: 8px;">
                                <p><strong>🌧️ It's raining! Your insurance activated!</strong></p>
                                <p><strong>Option Payoff Analysis:</strong></p>
                                <ul>
                                    <li>Premium paid: -$5</li>
                                    <li>Insurance payout: +$20</li>
                                    <li><strong>Net Profit: +$15</strong></li>
                                </ul>
                                <p>Your put option (rain insurance) paid off! You were protected against the adverse weather conditions.</p>
                            </div>
                        `;
                        this.player.reactToOutcome('payout_success');
                        this.rollerCoaster.shutDownRide();
                        this.gameState = 'outcome_displayed';
                        this.simulationActive = false;
                        if (this.putIndicator) this.putIndicator.visible = true;
                    } else if (weatherState === 'sunny') {
                        // Put option in sunny weather - expires worthless but show partial progress
                        this.updateTextDisplay();
                    }
                }
                if (this.gameState === 'outcome_displayed') {
                    this.outcomeMessage = outcomeDetails;
                }
            } else {
                // Time expired
                this.simulationActive = false;
                this.gameState = 'outcome_displayed';
                if (this.userChoice === 'call') {
                    this.outcomeMessage = `
                        <h3 style="color: #FF9800;">⏰ CALL OPTION EXPIRED</h3>
                        <div style="background: rgba(255, 152, 0, 0.3); padding: 15px; border-radius: 8px;">
                            <p><strong>Time ran out before optimal conditions!</strong></p>
                            <p><strong>Option Payoff Analysis:</strong></p>
                            <ul>
                                <li>Premium paid: -$5</li>
                                <li>Exercise value: $0 (expired)</li>
                                <li><strong>Net Loss: -$5</strong></li>
                            </ul>
                            <p>Your call option expired worthless, but you limited your risk to just the premium cost.</p>
                        </div>
                    `;
                    this.player.reactToOutcome('expired_timeout');
                } else if (this.userChoice === 'put') {
                    this.outcomeMessage = `
                        <h3 style="color: #FF9800;">⏰ PUT OPTION EXPIRED</h3>
                        <div style="background: rgba(255, 152, 0, 0.3); padding: 15px; border-radius: 8px;">
                            <p><strong>Time ran out without rain!</strong></p>
                            <p><strong>Option Payoff Analysis:</strong></p>
                            <ul>
                                <li>Premium paid: -$5</li>
                                <li>Insurance payout: $0 (no rain)</li>
                                <li><strong>Net Loss: -$5</strong></li>
                            </ul>
                            <p>No rain occurred, so your put option (insurance) wasn't needed. You lost only the premium.</p>
                        </div>
                    `;
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