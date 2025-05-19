export const calcDeltaX = (σ, Δt) => σ * Math.sqrt(Δt);

export const riskNeutralProb = (r, σ, Δt) => {
  const u = Math.exp(σ * Math.sqrt(Δt));
  const d = 1 / u;
  return (Math.exp(r * Δt) - d) / (u - d);
};

export const randomSign = p => (Math.random() < p ?  1 : -1);

 // simple linear colour blend 0..1  →  THREE.Color
 import * as THREE from "three";
 export function lerpColor(c1, c2, t) {
   const col1 = new THREE.Color(c1), col2 = new THREE.Color(c2);
   return col1.lerp(col2, THREE.MathUtils.clamp(t, 0, 1));
 }