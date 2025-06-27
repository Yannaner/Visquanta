# Ornstein-Uhlenbeck Process: Mean Reversion Spring-Pendulum Model

## 🎯 Overview
This interactive 3D physics simulation models mean-reverting financial assets using a spring-pendulum system. The Ornstein-Uhlenbeck (OU) process is visualized through realistic physics, demonstrating how assets tend to return to their fair value over time.

## 🔬 Physics Model

### Spring-Pendulum Dynamics
The system combines two physical phenomena:
1. **Spring Force**: Restoring force proportional to displacement
2. **Pendulum Motion**: Angular oscillations with gravity
3. **Damping**: Energy dissipation (transaction costs)
4. **Random Forcing**: Market noise and shocks

### Equations of Motion
**Classical Harmonic Oscillator with Damping:**
```
m(d²x/dt²) + c(dx/dt) + kx = F(t)
```

**Normalized OU Process:**
```
dx = -θ(x - μ)dt + σdW
```

Where:
- `θ` = Mean reversion speed (spring constant/mass)
- `μ` = Long-term mean (equilibrium position)
- `σ` = Volatility (noise amplitude)
- `dW` = Wiener process (random forcing)

### Physics Parameters
```javascript
Force Equations:
F_spring = -k(r - r₀)        // Hooke's law
F_damping = -c·v             // Viscous damping
F_random = σ·ξ(t)            // White noise forcing
F_total = F_spring + F_damping + F_random
```

## 💰 Financial Model

### Mean Reversion Process
Many financial assets exhibit mean-reverting behavior:
- **Interest Rates**: Tend toward long-term equilibrium
- **Currency Exchange Rates**: Purchasing power parity
- **Commodity Prices**: Supply-demand equilibrium
- **Volatility**: VIX tends to revert to historical mean
- **Pairs Trading**: Spread between correlated assets

### OU Process Properties
**Stochastic Differential Equation:**
```
dX(t) = θ(μ - X(t))dt + σdW(t)
```

**Analytical Solution:**
```
X(t) = μ + (X₀ - μ)e^(-θt) + σ∫₀ᵗ e^(-θ(t-s))dW(s)
```

**Statistical Properties:**
```
Mean: E[X(t)] = μ + (X₀ - μ)e^(-θt)
Variance: Var[X(t)] = (σ²/2θ)(1 - e^(-2θt))
Long-term Variance: σ²/(2θ)
Half-life: ln(2)/θ
```

## 🌊 Wave Mechanics Analogy

### Damped Harmonic Oscillator
The spring-pendulum exhibits three regimes:

**1. Underdamped (θ < ω₀):**
```
x(t) = Ae^(-θt/2m)cos(ωt + φ)
ω = √(k/m - (θ/2m)²)
```
- Oscillates with decreasing amplitude
- Financial: Volatile mean reversion

**2. Critically Damped (θ = 2√(km)):**
```
x(t) = (A + Bt)e^(-θt/2m)
```
- Fastest return to equilibrium without oscillation
- Financial: Optimal mean reversion speed

**3. Overdamped (θ > 2√(km)):**
```
x(t) = Ae^(-r₁t) + Be^(-r₂t)
```
- Slow approach to equilibrium
- Financial: Sluggish price adjustment

## 🎮 Interactive Visualization

### 3D Spring-Pendulum System
- **Green Circle**: Equilibrium position (fair value μ)
- **Yellow Ring**: ±σ volatility band
- **Red Sphere**: Current asset price position
- **Spring Line**: Visual connection to equilibrium
- **Pendulum Motion**: Combined radial and angular movement

### Control Parameters
```javascript
θ (Theta) - Mean Reversion Speed:
• High θ: Strong pull toward equilibrium
• Low θ: Weak restoring force, slow reversion

σ (Sigma) - Volatility:
• High σ: Large random shocks, wide price swings
• Low σ: Small perturbations, stable motion
```

### Physics Implementation
```javascript
// Spring force calculation
const springForce = dir.scale(-theta * (dist - restLength));

// Damping force
const dampingForce = velocity.scale(-damping);

// Random noise force
const noiseForce = new CANNON.Vec3(
    (Math.random() - 0.5) * sigma,
    (Math.random() - 0.5) * sigma,
    (Math.random() - 0.5) * sigma
);

// Total force
const totalForce = springForce.vadd(dampingForce).vadd(noiseForce);
```

## 📊 Statistical Analysis

### Autocorrelation Function
```
R(τ) = (σ²/2θ)e^(-θ|τ|)
```
- Exponential decay with time lag τ
- Decay rate determined by θ

### Spectral Density
```
S(ω) = σ²/(θ² + ω²)
```
- Lorentzian spectrum
- Low-frequency dominated (red noise)

### Transition Probability
```
p(x,t|x₀,0) = √(θ/πσ²(1-e^(-2θt))) × exp(-(x-μ-(x₀-μ)e^(-θt))²/(σ²(1-e^(-2θt))/θ))
```

## 🔧 Technical Implementation

### Cannon.js Physics Engine
```javascript
// Initialize physics world
world = new CANNON.World();
world.gravity.set(0, -9.82, 0);

// Create bob with mass
bobBody = new CANNON.Body({ mass: 1 });
bobBody.addShape(new CANNON.Sphere(0.5));

// Apply forces each frame
const springForce = calculateSpringForce(position, equilibrium, theta);
const dampingForce = calculateDamping(velocity);
const randomForce = generateNoise(sigma);

bobBody.force.set(
    springForce.x + dampingForce.x + randomForce.x,
    springForce.y + dampingForce.y + randomForce.y,
    springForce.z + dampingForce.z + randomForce.z
);
```

### Three.js Visualization
```javascript
// Visual elements
const equilibriumRing = new THREE.RingGeometry(restLength-0.1, restLength+0.1);
const volatilityBand = new THREE.RingGeometry(restLength-sigma, restLength+sigma);
const springLine = new THREE.BufferGeometry();

// Update positions each frame
bobMesh.position.copy(bobBody.position);
updateSpringLine(pivot, bobBody.position);
```

## 🎯 Key Financial Applications

### Interest Rate Models
- **Vasicek Model**: dr = a(b-r)dt + σdW
- **Cox-Ingersoll-Ross**: dr = a(b-r)dt + σ√r dW
- **Hull-White Model**: Extension with time-varying parameters

### Volatility Models
- **GARCH Effects**: Volatility clustering and mean reversion
- **Stochastic Volatility**: Heston model component
- **VIX Modeling**: Implied volatility mean reversion

### Pairs Trading Strategy
```
Spread = log(P₁/P₂)
If Spread > μ + kσ: Sell P₁, Buy P₂
If Spread < μ - kσ: Buy P₁, Sell P₂
```

## 🔍 Educational Insights

### Physics ↔ Finance Connections
1. **Equilibrium**: Fair value acts like gravitational center
2. **Oscillations**: Market overshooting and corrections
3. **Damping**: Transaction costs reduce momentum
4. **Resonance**: External forcing at natural frequency
5. **Energy**: Potential energy = pricing discrepancy

### Parameter Sensitivity
- **θ vs σ Balance**: Trade-off between stability and responsiveness  
- **Overshoot Behavior**: Too high θ causes artificial oscillations
- **Noise Scaling**: σ must match empirical volatility
- **Time Scales**: Match physical and financial time horizons

## 🚀 Usage Instructions

1. Open `index.html` in a web browser
2. Adjust θ slider to change mean reversion speed
3. Modify σ slider to alter volatility/noise level
4. Observe pendulum motion relative to equilibrium circle
5. Note how different parameters affect stability vs responsiveness

## 📚 Advanced Topics

### Calibration to Market Data
```javascript
// Maximum likelihood estimation
θ_mle = -log(ρ₁)/Δt
μ_mle = mean(data)
σ²_mle = variance(data) × 2θ/(1-exp(-2θΔt))
```

### Multi-Factor Extensions
- **Two-Factor Models**: Interest rate and volatility
- **Jump-Diffusion**: Sudden market shocks
- **Regime Switching**: Different equilibrium states

This simulation provides intuitive understanding of mean reversion through familiar mechanical systems, making abstract stochastic processes tangible and visual.