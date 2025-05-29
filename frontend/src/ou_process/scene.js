// scene.js
import * as THREE from 'three';
import * as CANNON from 'cannon';

export function createScene() {
  // — THREE.js setup —
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 8, 20);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // — CANNON.js physics world —
  const world = new CANNON.World();
  world.gravity.set(0, -9.82, 0);

  // — Pivot point (fixed) —
  const pivot = new CANNON.Vec3(0, 5, 0);

  // — Pendulum length (fair value) —
  const restLength = 5;

  // — Bob (the “price” mass) —
  const bobBody = new CANNON.Body({ mass: 1 });
  bobBody.addShape(new CANNON.Sphere(1));
  // start horizontally at restLength
  bobBody.position.set(pivot.x + restLength, pivot.y, pivot.z);
  world.addBody(bobBody);

  // — Visual Bob —
  const bobMesh = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0x0077ff })
  );
  scene.add(bobMesh);

  // — Pivot marker —
  const pivotMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0xff0000 })
  );
  pivotMesh.position.copy(pivot);
  scene.add(pivotMesh);

  // — Spring/Rod line —
  const springLine = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(), new THREE.Vector3()
    ]),
    new THREE.LineBasicMaterial({ color: 0x888888 })
  );
  scene.add(springLine);

  // — Fair-value ring (green) —
  const eqRing = new THREE.Mesh(
    new THREE.RingGeometry(restLength - 0.05, restLength + 0.05, 64),
    new THREE.MeshBasicMaterial({
      color: 0x00aa00,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3
    })
  );
  eqRing.rotation.x = -Math.PI / 2;
  scene.add(eqRing);

  // — Volatility envelope (yellow), will update dynamically —
  const sigmaRing = new THREE.Mesh(
    new THREE.RingGeometry(restLength - 0.5, restLength + 0.5, 64),
    new THREE.MeshBasicMaterial({
      color: 0xaaaa00,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.2
    })
  );
  sigmaRing.rotation.x = -Math.PI / 2;
  scene.add(sigmaRing);

  // — Light —
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(10, 10, 10).normalize();
  scene.add(light);

  // — Handle resize —
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  return {
    scene, camera, renderer,
    world, pivot, restLength,
    bobBody, bobMesh, springLine,
    eqRing, sigmaRing
  };
}
