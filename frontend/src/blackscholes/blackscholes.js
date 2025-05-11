import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101010);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 40, 100);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.4));

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const planeGeometry = new THREE.PlaneGeometry(100, 100, 50, 50);
planeGeometry.rotateX(-Math.PI / 2);
const planeMaterial = new THREE.MeshStandardMaterial({
  vertexColors: true,
  side: THREE.DoubleSide,
  flatShading: true
});
const surface = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(surface);

const overlay = document.createElement('div');
overlay.style.position = 'absolute';
overlay.style.top = '10px';
overlay.style.left = '10px';
overlay.style.padding = '10px';
overlay.style.background = 'rgba(0,0,0,0.6)';
overlay.style.color = '#fff';
overlay.style.fontFamily = 'sans-serif';
overlay.style.maxWidth = '400px';
overlay.innerHTML = `
  <h2>Black-Scholes as Physics</h2>
  <p>
    This visualization transforms the Black-Scholes equation from finance into a physics-inspired simulation.<br/>
    In physics, heat spreads across a medium over time. Similarly, option prices spread and evolve over the space of stock prices and time.
  </p>
  <p>
    The Black-Scholes PDE resembles the heat diffusion equation, where the "temperature" is the option value.<br/>
    By converting this quant model into a physics model, we visualize the evolving option price as a surface — like watching heat travel across a plate.
  </p>
  <p><strong>Axes:</strong><br/>X: Stock Price (S)<br/>Y: Option Value (C)<br/>Z: Time to Expiration (T)</p>
  <p><strong>Interpretation:</strong><br/>
    Higher points on the surface represent higher option values. The curvature reflects how sensitive the price is to changes in volatility, time, and strike.<br/>
    You are looking at how the "heat" (value) flows across the space of possible prices — with time steps animated to simulate real temperature diffusion.
  </p>
`;
document.body.appendChild(overlay);

function cnd(x) {
  let sign = x < 0 ? -1 : 1;
  x = Math.abs(x) / Math.sqrt(2);
  const t = 1 / (1 + 0.3275911 * x);
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const erf = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return 0.5 * (1 + sign * erf);
}

function blackScholesPrice(S, K, T, r, sigma, type) {
  const d1 = (Math.log(S / K) + (r + sigma * sigma / 2) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);
  if (type.toLowerCase() === 'call') {
    return S * cnd(d1) - K * Math.exp(-r * T) * cnd(d2);
  } else {
    return K * Math.exp(-r * T) * cnd(-d2) - S * cnd(-d1);
  }
}

function makeTextSprite(message) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = '20px Arial';
  context.fillStyle = 'white';
  context.fillText(message, 2, 20);
  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(10, 5, 1);
  return sprite;
}

const S_min = 100, S_max = 200, T_min = 0.01, T_max = 1;
const K = 150, r = 0.045, sigma = 0.25;
const geom = surface.geometry;
const pos = geom.attributes.position;
const baseY = new Float32Array(pos.count);
const colors = [];
const labelSprites = [];

for (let i = 0; i < pos.count; i++) {
  const x = pos.getX(i);
  const z = pos.getZ(i);
  const S = S_min + (x + 50) / 100 * (S_max - S_min);
  const T = T_max;
  const C = blackScholesPrice(S, K, T, r, sigma, 'call');
  baseY[i] = C;
  pos.setY(i, C * 2);
  const c = C / 30;
  colors.push(c, 0.2 + 0.8 * c, 1 - c);

  if (i % 100 === 0) {
    const label = makeTextSprite(`S=${S.toFixed(0)} T=${T.toFixed(2)}\nC=${C.toFixed(2)}`);
    label.position.set(x, C * 2 + 2, z);
    scene.add(label);
    labelSprites.push(label);
  }
}

geom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
geom.computeVertexNormals();

const clock = new THREE.Clock();
const decaySpeed = 0.1;

function animate() {
  requestAnimationFrame(animate);
  const time = clock.getElapsedTime();

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const S = S_min + (x + 50) / 100 * (S_max - S_min);
    const T = Math.max(T_min, T_max - decaySpeed * time % T_max);
    const C = blackScholesPrice(S, K, T, r, sigma, 'call');
    pos.setY(i, C * 2);
    const c = C / 30;
    colors[i * 3] = c;
    colors[i * 3 + 1] = 0.2 + 0.8 * c;
    colors[i * 3 + 2] = 1 - c;
  }

  for (let j = 0; j < labelSprites.length; j++) {
    const label = labelSprites[j];
    const i = j * 100;
    const y = pos.getY(i);
    label.position.y = y + 2;
  }

  geom.attributes.position.needsUpdate = true;
  geom.attributes.color.needsUpdate = true;
  geom.computeVertexNormals();

  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});