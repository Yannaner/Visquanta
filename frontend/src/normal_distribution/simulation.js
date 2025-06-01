// Main simulation variables
let scene, camera, renderer, world;
let pegs = [], balls = [], bins = [];
let ballInterval;
let controls;
let simulationControls = {
    ballReleaseRate: 300,
    maxBalls: 150,
    pegRows: 15,
    pegSpacing: 1.5,
    gravity: -9.82,
    ballSize: 0.4,
    pegSize: 0.2
};

// Initialize the simulation
function initSimulation() {
    setupThreeJS();
    setupPhysicsWorld();
    initGaltonBoard();
    animate();
}

function setupThreeJS() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111122);
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 15, 30);
    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);
}

function setupPhysicsWorld() {
    world = new CANNON.World();
    world.gravity.set(0, simulationControls.gravity, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;
}

function initGaltonBoard() {
    clearScene();
    createPegs();
    createBins();
    setupLights();
    setupFloor();
    setupWalls();
    startBallDropping();
    setupOrbitControls();
}

function clearScene() {
    pegs.forEach(p => {
        world.removeBody(p.body);
        scene.remove(p.mesh);
    });
    balls.forEach(b => {
        world.removeBody(b.body);
        scene.remove(b.mesh);
    });
    bins.forEach(bin => {
        world.removeBody(bin.body);
        scene.remove(bin.mesh);
    });
    
    pegs = [];
    balls = [];
    bins = [];
    
    if (ballInterval) clearInterval(ballInterval);
}

function createPegs() {
    const pegGeometry = new THREE.SphereGeometry(simulationControls.pegSize, 16, 16);
    const pegMaterial = new THREE.MeshStandardMaterial({ color: 0x8888ff });

    for (let row = 0; row < simulationControls.pegRows; row++) {
        const offset = row % 2 === 0 ? 0 : simulationControls.pegSpacing / 2;
        const pegsInRow = row + 1;
        
        for (let col = 0; col < pegsInRow; col++) {
            const x = (col * simulationControls.pegSpacing) - (pegsInRow * simulationControls.pegSpacing / 2) + offset;
            const y = simulationControls.pegRows - row * simulationControls.pegSpacing;
            
            const pegShape = new CANNON.Sphere(simulationControls.pegSize);
            const pegBody = new CANNON.Body({ mass: 0 });
            pegBody.addShape(pegShape);
            pegBody.position.set(x, y, 0);
            world.addBody(pegBody);
            
            const pegMesh = new THREE.Mesh(pegGeometry, pegMaterial);
            pegMesh.position.set(x, y, 0);
            pegMesh.castShadow = true;
            scene.add(pegMesh);
            
            pegs.push({ body: pegBody, mesh: pegMesh });
        }
    }
}

function createBall() {
    if (balls.length >= simulationControls.maxBalls) return;
    
    const ballGeometry = new THREE.SphereGeometry(simulationControls.ballSize, 32, 32);
    const ballMaterial = new THREE.MeshStandardMaterial({ color: 0xff5555 });

    const ballShape = new CANNON.Sphere(simulationControls.ballSize);
    const ballBody = new CANNON.Body({ 
        mass: 1,
        shape: ballShape,
        position: new CANNON.Vec3(
            (Math.random() - 0.5) * 2,
            simulationControls.pegRows + 5,
            (Math.random() - 0.5) * 2
        ),
        linearDamping: 0.3,
        angularDamping: 0.3
    });
    
    ballBody.angularVelocity.set(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5
    );
    
    world.addBody(ballBody);
    
    const ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
    ballMesh.castShadow = true;
    scene.add(ballMesh);
    
    balls.push({ body: ballBody, mesh: ballMesh });
    
    if (balls.length > simulationControls.maxBalls) {
        const oldBall = balls.shift();
        world.removeBody(oldBall.body);
        scene.remove(oldBall.mesh);
    }
}

function createBins() {
    const binGeometry = new THREE.BoxGeometry(simulationControls.pegSpacing, 1, 2);
    const binMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x333333, 
        transparent: true, 
        opacity: 0.7 
    });

    for (let i = 0; i < simulationControls.pegRows + 2; i++) {
        const x = (i * simulationControls.pegSpacing) - ((simulationControls.pegRows + 2) * simulationControls.pegSpacing / 2) + simulationControls.pegSpacing/2;
        const y = -2;
        
        const binShape = new CANNON.Box(new CANNON.Vec3(simulationControls.pegSpacing/2, 0.5, 1));
        const binBody = new CANNON.Body({ mass: 0 });
        binBody.addShape(binShape);
        binBody.position.set(x, y, 0);
        world.addBody(binBody);
        
        const binMesh = new THREE.Mesh(binGeometry, binMaterial);
        binMesh.position.set(x, y, 0);
        binMesh.receiveShadow = true;
        scene.add(binMesh);
        
        bins.push({ body: binBody, mesh: binMesh });
    }
}

function setupLights() {
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
}

function setupFloor() {
    const floorGeometry = new THREE.PlaneGeometry(50, 50);
    const floorMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x333333, 
        side: THREE.DoubleSide,
        roughness: 0.8
    });
    const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -3;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    const floorShape = new CANNON.Plane();
    const floorBody = new CANNON.Body({ mass: 0 });
    floorBody.addShape(floorShape);
    floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    world.addBody(floorBody);
}

function setupWalls() {
    const wallShape = new CANNON.Box(new CANNON.Vec3(30, 30, 0.5));
    const leftWallBody = new CANNON.Body({ mass: 0 });
    leftWallBody.addShape(wallShape);
    leftWallBody.position.set(0, 0, -5);
    world.addBody(leftWallBody);

    const rightWallBody = new CANNON.Body({ mass: 0 });
    rightWallBody.addShape(wallShape);
    rightWallBody.position.set(0, 0, 5);
    world.addBody(rightWallBody);
}

function setupOrbitControls() {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI;
    controls.minPolarAngle = 0;
    controls.maxDistance = 50;
    controls.minDistance = 10;
}

function startBallDropping() {
    ballInterval = setInterval(createBall, simulationControls.ballReleaseRate);
}

function addBalls(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(createBall, i * 100);
    }
}

function clearAllBalls() {
    balls.forEach(b => {
        world.removeBody(b.body);
        scene.remove(b.mesh);
    });
    balls = [];
}

function animate() {
    requestAnimationFrame(animate);
    
    const timeStep = 1/60;
    world.step(timeStep);
    
    balls.forEach(ball => {
        ball.mesh.position.copy(ball.body.position);
        ball.mesh.quaternion.copy(ball.body.quaternion);
    });
    
    controls.update();
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initSimulation);