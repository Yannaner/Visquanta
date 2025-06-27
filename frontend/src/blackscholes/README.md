# Black-Scholes Heat Equation Visualization

## 🎯 Overview
This 3D visualization transforms the Black-Scholes partial differential equation from quantitative finance into an intuitive heat diffusion simulation, demonstrating how option prices evolve over time and stock price space.

## 🔬 Physics Model

### Heat Equation Analogy
The Black-Scholes equation is mathematically identical to the heat equation in physics:

**Black-Scholes PDE:**
```
∂V/∂t + ½σ²S²(∂²V/∂S²) + rS(∂V/∂S) - rV = 0
```

**Heat Equation:**
```
∂u/∂t = α(∂²u/∂x²)
```

Where:
- `V(S,t)` = Option value (temperature distribution)
- `S` = Stock price (spatial dimension)
- `t` = Time (time dimension)
- `σ` = Volatility (thermal diffusivity)
- `r` = Risk-free rate (convection term)

### Physical Interpretation

1. **Temperature Field**: Option values across different stock prices
2. **Heat Source**: Intrinsic value at expiration
3. **Thermal Conductivity**: Market volatility (σ²/2)
4. **Heat Flow**: How option value changes propagate
5. **Boundary Conditions**: Option payoff at expiration

## 💰 Financial Model

### Option Pricing Formula
**European Call Option:**
```
C = S₀N(d₁) - Ke^(-rt)N(d₂)

where:
d₁ = [ln(S₀/K) + (r + σ²/2)t] / (σ√t)
d₂ = d₁ - σ√t
```

**Put-Call Parity:**
```
C - P = S₀ - Ke^(-rt)
```

### The Greeks (Sensitivities)
- **Delta (Δ)**: ∂V/∂S (slope of the surface)
- **Gamma (Γ)**: ∂²V/∂S² (curvature)
- **Theta (Θ)**: ∂V/∂t (time decay)
- **Vega (ν)**: ∂V/∂σ (volatility sensitivity)
- **Rho (ρ)**: ∂V/∂r (interest rate sensitivity)

## 🌡️ Heat Diffusion Physics

### Fourier's Law of Heat Conduction
```
q = -k∇T
```
Where:
- `q` = Heat flux (option price changes)
- `k` = Thermal conductivity (volatility)
- `∇T` = Temperature gradient (price sensitivity)

### Diffusion Process
1. **Initial Condition**: Option payoff at expiration
2. **Boundary Conditions**: Deep in/out-of-the-money behavior
3. **Time Evolution**: Heat spreads backward in time
4. **Equilibrium**: Fair value at current time

## 🎮 Visualization Features

### 3D Surface Representation
- **X-axis**: Stock price (S)
- **Y-axis**: Time to expiration (T-t)
- **Z-axis**: Option value (V)
- **Color mapping**: Value gradient (hot = high value, cold = low value)

### Interactive Controls
- **Orbit Controls**: Rotate and zoom the 3D surface
- **Parameter Adjustment**: Modify σ, r, K, T in real-time
- **Option Type**: Toggle between call and put options
- **Greeks Visualization**: Show sensitivity surfaces

## 🔧 Technical Implementation

### Numerical Methods
```javascript
// Finite Difference Method for Black-Scholes PDE
function calculateOptionSurface(S_min, S_max, T_max, steps) {
    const dS = (S_max - S_min) / steps;
    const dt = T_max / steps;
    
    // Initialize boundary conditions
    for (let i = 0; i <= steps; i++) {
        const S = S_min + i * dS;
        surface[i][0] = Math.max(S - K, 0); // Call payoff at expiration
    }
    
    // Solve backward in time using implicit finite difference
    for (let j = 1; j <= steps; j++) {
        // Tri-diagonal matrix solution (Thomas algorithm)
        solveTridiagonal(surface, j, dS, dt, r, sigma);
    }
}
```

### Heat Equation Solver
```javascript
// Explicit finite difference scheme
function heatDiffusionStep(u, alpha, dx, dt) {
    const r = alpha * dt / (dx * dx);
    const u_new = [...u];
    
    for (let i = 1; i < u.length - 1; i++) {
        u_new[i] = u[i] + r * (u[i+1] - 2*u[i] + u[i-1]);
    }
    return u_new;
}
```

## 📊 Key Insights

### Physics ↔ Finance Analogies
1. **Heat Flow**: Value flows from high to low (arbitrage)
2. **Thermal Equilibrium**: No-arbitrage pricing
3. **Diffusion Rate**: Market volatility drives price spreading
4. **Boundary Effects**: Strike price and expiration constraints
5. **Time Reversal**: Option pricing works backward from expiration

### Educational Value
- **PDE Understanding**: Visual representation of complex mathematics
- **Risk Management**: Greeks as physical sensitivities
- **Market Dynamics**: How volatility affects option pricing
- **Numerical Methods**: Finite difference techniques in finance

## 🚀 Usage Instructions

1. Open `index.html` in a modern web browser
2. Use mouse to rotate and zoom the 3D surface
3. Observe how the option value surface changes with parameters
4. Notice the heat-like diffusion pattern as time progresses
5. Experiment with different volatilities and interest rates

## 📚 Mathematical Foundations

### Stochastic Differential Equation
The underlying stock price follows geometric Brownian motion:
```
dS = μSdt + σSdW
```

### Risk-Neutral Valuation
Under risk-neutral measure:
```
V(S,t) = e^(-r(T-t))E[V(S_T,T)|S_t = S]
```

### Green's Function Solution
The Black-Scholes equation has an analytical solution using the heat kernel:
```
G(x,t) = (1/√(4πt))e^(-x²/4t)
```

This visualization makes the abstract mathematical concepts tangible and intuitive through the familiar physics of heat diffusion.
