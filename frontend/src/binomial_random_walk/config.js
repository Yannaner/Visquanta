 export const config = Object.assign(new EventTarget(), {
   STEPS       : 50,
   DELTA_T     : 1 / 252,
   SIGMA       : 0.2,
   RISK_FREE_R : 0.05,
   PATHS       : 400,
  STEP_TIME   : 12000,      // ms per frame in the animation
   COLORS      : { up: 0x2ecc71, down: 0xe74c3c, edge: 0x888888,
                  heat0: 0x000000, heat1: 0xffaa00 }
 });
