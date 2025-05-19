/*  particles.js  ──────────────────────────────────────────────────────────
 *  Turns the raw path array into:
 *    • two InstancedMeshes (green “up” spheres, red “down” spheres)
 *    • grey line segments for the binomial tree edges
 *    • semi–transparent “heat planes” that light up as probability mass grows
 *    • a yellow centre-of-mass guideline
 *
 *  Public API
 *  ──────────
 *    const parts = new Particles(pathsArray);
 *    parts.addTo(scene);            // add everything to a Three.js scene
 *    parts.update(dtMS);            // call once per render frame
 *    parts.dispose();               // free GPU memory when regenerating
 */
import * as THREE from 'three';
import { config }      from './config.js';
import { lerpColor }   from './utils.js';

// ────────────────────────────────────────────────────────────────────────────
export class Particles {
  constructor(paths) {
    this.paths  = paths;            // keep for animation steps
    this.timer  = 0;
    this.step   = 0;                // depth currently revealed   (0 = only S₀)
    this.maxStep = config.STEPS;

    // ========== 1 ►►  build InstancedMeshes (spheres) =====================
    const sphereGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const upMat     = new THREE.MeshBasicMaterial({ color: config.COLORS.up });
    const downMat   = new THREE.MeshBasicMaterial({ color: config.COLORS.down });

    const { upCount, downCount } = countDirections(paths);
    this.upMesh   = new THREE.InstancedMesh(sphereGeo, upMat,   upCount);
    this.downMesh = new THREE.InstancedMesh(sphereGeo, downMat, downCount);

    // (initially nothing visible → zero counts)
    this.upMesh.count   = 0;
    this.downMesh.count = 0;

    // ========== 2 ►►  build grey edge lines ================================
    const lineSegs = buildEdgeLines(paths);
    this.lines = new THREE.LineSegments(lineSegs.geom, lineSegs.mat);

    // ========== 3 ►►  heat planes (one per depth level) ====================
    this.heatPlanes = buildHeatPlanes(paths);

    // ========== 4 ►►  centre-of-mass guideline =============================
    this.comLine = buildCOMLine(paths);

    // ========== 5 ►►  group container =====================================
    this.group = new THREE.Group();
    this.group.add(this.upMesh, this.downMesh, this.lines, this.comLine);
    this.heatPlanes.forEach(p => this.group.add(p));
  }

  /* Add everything under one parent so caller can         *
   *   scene.add(parts.group)  OR  parts.addTo(scene)      */
  addTo(scene) { scene.add(this.group); }

  /* Free GPU memory when you regenerate the visualiser */
  dispose() {
    this.upMesh.geometry.dispose();
    this.downMesh.geometry.dispose();
    this.lines.geometry.dispose();
    this.lines.material.dispose();
    this.heatPlanes.forEach(p => {
      p.geometry.dispose();
      p.material.dispose();
    });
  }

  /* Progress the animation every STEP_TIME ms.  Call from your main loop. */
  update(dtMS) {
    if (this.step >= this.maxStep) return;      // finished revealing

    this.timer += dtMS;
    if (this.timer < config.STEP_TIME) return;  // not yet time for next layer
    this.timer = 0;
    this.step += 1;

    // ---------- fill instanced matrices up to current depth ---------------
    const dummy  = new THREE.Object3D();
    let upIdx = 0, downIdx = 0;

    for (const path of this.paths) {
      for (let d = 1; d <= this.step; d++) {    // reveal everything up to step
        const curr = path[d];
        dummy.position.set(curr.x, curr.y, curr.z);
        dummy.updateMatrix();
        if (curr.up) this.upMesh.setMatrixAt(upIdx++, dummy.matrix);
        else         this.downMesh.setMatrixAt(downIdx++, dummy.matrix);
      }
    }
    this.upMesh.count   = upIdx;
    this.downMesh.count = downIdx;
    this.upMesh.instanceMatrix.needsUpdate   = true;
    this.downMesh.instanceMatrix.needsUpdate = true;

    // make the corresponding heat-plane visible
    if (this.heatPlanes[this.step - 1])
      this.heatPlanes[this.step - 1].visible = true;
  }
}

// ╭───────────────────────────────── helpers ───────────────────────────────╮
function countDirections(paths) {
  let up = 0, down = 0;
  paths.forEach(p => {
    for (let i = 1; i < p.length; i++) (p[i].up ? up++ : down++);
  });
  return { upCount: up, downCount: down };
}

function buildEdgeLines(paths) {
  const positions = [];
  paths.forEach(p => {
    for (let i = 1; i < p.length; i++) {
      positions.push(
        p[i - 1].x, p[i - 1].y, p[i - 1].z,
        p[i].x,     p[i].y,     p[i].z
      );
    }
  });
  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const mat  = new THREE.LineBasicMaterial({ color: config.COLORS.edge });
  return { geom, mat };
}

/* ---------- heat planes: probability density slice at each level -------- */
function buildHeatPlanes(paths) {
  const { STEPS, COLORS } = config;
  const planes = [];
  const bins   = 24;           // number of histogram buckets (adjust as you like)

  for (let d = 1; d <= STEPS; d++) {
    const xs  = paths.map(p => p[d].x);
    const min = Math.min(...xs), max = Math.max(...xs);
    const counts = new Array(bins).fill(0);
    xs.forEach(x => {
      const b = Math.floor(((x - min) / (max - min + 1e-9)) * bins);
      counts[Math.min(b, bins - 1)] += 1;
    });

    const geom = new THREE.PlaneGeometry(max - min || 1, 0.9, bins, 1);
    const colors = new Float32Array((bins + 1) * 3 * 2); // two rows of verts
    for (let i = 0; i <= bins; i++) {
      const t = counts[i - 1] ? counts[i - 1] / paths.length : 0;
      const c = lerpColor(COLORS.heat0, COLORS.heat1, t);
      colors.set([c.r, c.g, c.b, c.r, c.g, c.b], i * 6);
    }
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.MeshBasicMaterial({
      vertexColors: true,
      transparent : true,
      opacity     : 0.35,
      side        : THREE.DoubleSide
    });

    const plane = new THREE.Mesh(geom, mat);
    plane.rotation.x = -Math.PI / 2;           // lay it flat (XZ plane)
    plane.position.set((min + max) / 2, -d + 0.45, 0);
    plane.visible = false;                     // will turn on during animation
    planes.push(plane);
  }
  return planes;
}

/* ---------- yellow line showing risk-neutral drift of the whole cloud ---- */
function buildCOMLine(paths) {
  const pts = [];
  for (let d = 0; d <= config.STEPS; d++) {
    const meanX = paths.reduce((sum, p) => sum + p[d].x, 0) / paths.length;
    pts.push(new THREE.Vector3(meanX, -d, 0));
  }
  const geom = new THREE.BufferGeometry().setFromPoints(pts);
  const mat  = new THREE.LineBasicMaterial({ color: 0xffff00 });
  return new THREE.Line(geom, mat);
}
// ╰─────────────────────────────────────────────────────────────────────────╯
