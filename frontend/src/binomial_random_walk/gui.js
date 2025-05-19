import GUI from "lil-gui";

export function initGUI(config, onChange) {
  const gui = new GUI();
  gui.add(config, "SIGMA",       0.05, 1.0, 0.01).name("σ (volatility)").onChange(onChange);
  gui.add(config, "RISK_FREE_R", 0.0,  0.2, 0.005).name("r").onChange(onChange);
  gui.add(config, "STEPS",        10, 100, 1).name("Steps").onChange(onChange);
  gui.add(config, "PATHS",        50, 800, 1).name("Paths").onChange(onChange);
  gui.add(config, "STEP_TIME",    30, 300, 1).name("ms / step");
}
