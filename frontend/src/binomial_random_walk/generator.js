import { config } from "./config.js";
import { riskNeutralProb, randomSign, calcDeltaX } from "./utils.js";

 export function generatePaths(cfg = config) {
   const { STEPS, DELTA_T, SIGMA, RISK_FREE_R, PATHS } = cfg;
   const dx    = calcDeltaX(SIGMA, DELTA_T);
   const pStar = riskNeutralProb(RISK_FREE_R, SIGMA, DELTA_T);
   const paths = [];

   const u = Math.exp(dx);          // because dx = ln(u)
   const d = 1 / u;
 
   for (let p = 0; p < PATHS; p  ) {
     let x = 0, y = 0, z = (p / PATHS - 0.5) * 2;
     let price = 1.0;               // start at S₀ = 1
     const path = [{ x, y, z, price, up:null }];
     for (let n = 1; n <= STEPS; n  ) {
       const step = randomSign(pStar);
       x  = step * dx;
       y -= 1;
       price *= step === 1 ? u : d;
       path.push({ x, y, z, price, up: step === 1 });
     }
     paths.push(path);
   }
   return paths;
 }

