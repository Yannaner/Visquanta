// UI Controls and Interaction
function initUI() {
    createControlPanel();
    setupEventListeners();
}

function createControlPanel() {
    const gui = new dat.GUI({ width: 300 });
    gui.domElement.id = 'gui';
    
    // Simulation parameters
    const simFolder = gui.addFolder('Simulation Parameters');
    simFolder.add(simulationControls, 'ballReleaseRate', 100, 1000).name('Ball Rate (ms)').onChange(updateSimulation);
    simFolder.add(simulationControls, 'maxBalls', 50, 300, 10).name('Max Balls').onChange(updateSimulation);
    simFolder.add(simulationControls, 'gravity', -20, -1).name('Gravity').onChange(updatePhysics);
    simFolder.open();
    
    // Board configuration
    const boardFolder = gui.addFolder('Board Configuration');
    boardFolder.add(simulationControls, 'pegRows', 5, 30, 1).name('Peg Rows').onChange(restartSimulation);
    boardFolder.add(simulationControls, 'pegSpacing', 1, 3, 0.1).name('Peg Spacing').onChange(restartSimulation);
    
    // Ball properties
    const ballFolder = gui.addFolder('Ball Properties');
    ballFolder.add(simulationControls, 'ballSize', 0.2, 0.8, 0.05).name('Ball Size').onChange(restartSimulation);
    ballFolder.add(simulationControls, 'pegSize', 0.1, 0.5, 0.05).name('Peg Size').onChange(restartSimulation);
    
    // Add buttons
    gui.add({
        restart: () => restartSimulation(),
        addBalls: () => addBalls(10),
        clearBalls: () => clearAllBalls()
    }, 'restart').name('Restart Simulation');
}

function setupEventListeners() {
    document.getElementById('restart-btn').addEventListener('click', () => {
        restartSimulation();
    });
    
    document.getElementById('add-balls-btn').addEventListener('click', () => {
        addBalls(10);
    });
    
    document.getElementById('clear-btn').addEventListener('click', () => {
        clearAllBalls();
    });
}

function restartSimulation() {
    initGaltonBoard();
}

function updateSimulation() {
    clearInterval(ballInterval);
    startBallDropping();
}

function updatePhysics() {
    world.gravity.set(0, simulationControls.gravity, 0);
}

// Initialize UI when DOM is loaded
document.addEventListener('DOMContentLoaded', initUI);