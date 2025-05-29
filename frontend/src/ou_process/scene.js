// scene.js
import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import * as CANNON from 'https://cdn.skypack.dev/cannon-es@0.20.0';

export function createScene() {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
  );
  camera.position.z = 10;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const world = new CANNON.World();
  world.gravity.set(0, 0, 0);

  const material = new CANNON.Material();
  const ballShape = new CANNON.Sphere(1);
  const ballBody = new CANNON.Body({
    mass: 1,
    shape: ballShape,
    material
  });
  ballBody.position.set(0, 0, 0);
  world.addBody(ballBody);

  const ballMesh = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0x0077ff })
  );
  scene.add(ballMesh);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 5).normalize();
  scene.add(light);

  return {
    scene,
    camera,
    renderer,
    world,
    ballBody,
    ballMesh
  };
}
