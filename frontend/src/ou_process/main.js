import * as THREE from 'three';
import * as CANNON from 'cannon';
import { createScene } from './scene.js';

const {
  scene, camera, renderer, world,
  pivot, restLength,
  bobBody, bobMesh, springLine,
  eqRing, sigmaRing
} = createScene();

// — Simulation params & defaults —
let theta = 5.0;
let sigma = 0.5;
const damping = 0.1;

// — UI sliders —
const thetaSlider = document.getElementById('theta');
const sigmaSlider = document.getElementById('sigma');
thetaSlider.value = theta;
sigmaSlider.value = sigma;
thetaSlider.oninput = e => { theta = parseFloat(e.target.value); };
sigmaSlider.oninput = e => {
  sigma = parseFloat(e.target.value);
  sigmaRing.geometry.dispose();
  sigmaRing.geometry = new THREE.RingGeometry(
    restLength - sigma,
    restLength + sigma,
    64
  );
};

// — Explanation box (top-right), moved up —
const convBox = document.createElement('div');
Object.assign(convBox.style, {
  position: 'absolute',
  top: '5px',           /* moved up */
  right: '10px',
  width: '300px',
  padding: '12px',
  background: 'rgba(255,255,255,0.95)',
  borderRadius: '8px',
  fontFamily: 'sans-serif',
  fontSize: '13px',
  lineHeight: '1.4',
  color: '#222'
});
convBox.innerHTML = `
  <h3 style="margin:0 0 8px">🔗 Finance ↔ Physics</h3>
  <p>This spring–pendulum simulates a <strong>mean-reverting</strong> asset:</p>
  <ul style="padding-left:1em; margin:4px 0">
    <li><strong>Equilibrium circle</strong> (green): fair-value price μ = restLength.</li>
    <li><strong>Pendulum swing</strong>: momentum &amp; overshoot when pulled back too fast (θ).</li>
    <li><strong>Volatility band</strong> (yellow): ±σ expected price fluctuation.</li>
    <li><strong>Damping</strong> (transaction costs): smooths extremes.</li>
    <li><strong>Noise jolts</strong> (σ): market shocks &amp; news.</li>
  </ul>
  <p><em>Key takeaways:</em><br>
    • Higher θ → tighter, faster reversion; less overshoot.<br>
    • Higher σ → more excursions beyond volatility band.<br>
    • Balance θ vs. σ to keep “price” stable yet responsive.
  </p>
`;
document.body.appendChild(convBox);

// — Effects box (below controls), moved up —
const effBox = document.createElement('div');
Object.assign(effBox.style, {
  position: 'absolute',
  top: '80px',          /* moved up */
  left: '10px',
  width: '220px',
  padding: '10px',
  background: 'rgba(255,255,255,0.9)',
  borderRadius: '6px',
  fontFamily: 'sans-serif',
  fontSize: '13px',
  lineHeight: '1.4'
});
effBox.innerHTML = `
  <strong>Slider Effects:</strong><br>
  θ (stiffness):<br>
  &nbsp;• ↑ θ → strong pull, small swings, quick recovery.<br>
  &nbsp;• ↓ θ → loose pull, wide swings, slow recovery.<br>
  σ (noise):<br>
  &nbsp;• ↑ σ → frequent, large jolts (high volatility).<br>
  &nbsp;• ↓ σ → smooth, predictable motion.
`;
document.body.appendChild(effBox);

// — Animation loop —
function animate() {
  requestAnimationFrame(animate);

  const pos = bobBody.position;
  const diff = pos.vsub(pivot);
  const dist = diff.length();
  const dir = diff.scale(1 / dist);

  const springF = dir.scale(-theta * (dist - restLength));
  const dampF   = bobBody.velocity.scale(-damping);
  const noiseF  = new CANNON.Vec3(
    (Math.random()*2 -1)*sigma,
    (Math.random()*2 -1)*sigma,
    0
  );

  bobBody.applyForce(springF.vadd(dampF).vadd(noiseF), bobBody.position);
  world.step(1/60);

  bobMesh.position.copy(pos);
  springLine.geometry.setFromPoints([
    new THREE.Vector3(pivot.x,pivot.y,pivot.z),
    new THREE.Vector3(pos.x,pos.y,pos.z)
  ]);

  renderer.render(scene, camera);
}

animate();
