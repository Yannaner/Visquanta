import { config }          from './config.js';
import { scene, camera, renderer, controls } from './scene.js';
import { generatePaths }   from './generator.js';
import { Particles }       from './particles.js';
import { initGUI }         from './gui.js';

let particles = new Particles(generatePaths(config));
particles.addTo(scene);

initGUI(config, () => {
  scene.remove(particles.group);
  particles.dispose();
  particles = new Particles(generatePaths(config));
  particles.addTo(scene);
});

let last = performance.now();
function tick() {
  requestAnimationFrame(tick);
  const now = performance.now();
  particles.update(now - last);   //  ◀── animate spheres / heat planes
  last = now;

  controls.update();
  renderer.render(scene, camera);
}
tick();
