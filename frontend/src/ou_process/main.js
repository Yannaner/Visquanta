// main.js
import { createScene } from './scene.js';
import * as CANNON from 'cannon';
const {
  scene,
  camera,
  renderer,
  world,
  ballBody,
  ballMesh
} = createScene();

// Constants
let theta = parseFloat(document.getElementById("theta").value);
let sigma = parseFloat(document.getElementById("sigma").value);
const damping = 0.5;
const mu = 0.0;

document.getElementById("theta").oninput = (e) => {
  theta = parseFloat(e.target.value);
};

document.getElementById("sigma").oninput = (e) => {
  sigma = parseFloat(e.target.value);
};

function animate() {
  requestAnimationFrame(animate);

  const x = ballBody.position.x;
  const v = ballBody.velocity.x;
  const noise = sigma * (Math.random() * 2 - 1);
  const force = -theta * (x - mu) - damping * v + noise;

  ballBody.applyForce(new CANNON.Vec3(force, 0, 0), ballBody.position);

  world.step(1 / 60);
  ballMesh.position.copy(ballBody.position);

  renderer.render(scene, camera);
}

animate();
