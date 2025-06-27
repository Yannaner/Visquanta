# Binomial Random Walk: Stock Price Lattice Model

## 🎯 Overview
This 3D visualization demonstrates the binomial model for stock price evolution, showing how discrete random walks converge to continuous stochastic processes. The model serves as both a physics simulation of particle diffusion and a fundamental tool in quantitative finance.

## 🔬 Physics Model

### Random Walk Mechanics
Each particle follows a discrete random walk in 3D space:
- **X-axis**: Cumulative log-returns (price direction)
- **Y-axis**: Time steps (downward progression)
- **Z-axis**: Path separation (for visualization)

### Brownian Motion Approximation
As time steps approach zero, the binomial model converges to geometric Brownian motion:

**Discrete Steps:**
```
S_{n+1} = S_n × u  (with probability p)
S_{n+1} = S_n × d  (with probability 1-p)
```

**Continuous Limit:**
```
dS = μSdt + σSdW
```

### Diffusion Physics
The model exhibits classic diffusion properties:
- **Mean Displacement**: Proportional to time
- **Variance**: Proportional to time (Einstein relation)
- **Probability Distribution**: Approaches Gaussian

## 💰 Financial Model

### Binomial Tree Parameters
```javascript
u = e^(σ√Δt)           // Up factor
d = 1/u = e^(-σ√Δt)    // Down factor
p* = (e^(rΔt) - d)/(u - d)  // Risk-neutral probability
```

### Risk-Neutral Valuation
Under the risk-neutral measure:
- **Expected Return**: Risk-free rate (r)
- **Volatility**: Historical volatility (σ)
- **Probability**: Risk-neutral probability (p*)

### Stock Price Evolution
```
S_n = S_0 × u^k × d^(n-k)
```
Where:
- `S_0` = Initial stock price
- `n` = Number of time steps
- `k` = Number of up moves
- `σ` = Volatility parameter
- `Δt` = Time step size

## 🎲 Stochastic Processes

### Log-Normal Distribution
Stock prices follow a log-normal distribution:
```
ln(S_T/S_0) ~ N((r - σ²/2)T, σ²T)
```

### Martingale Property
Under risk-neutral measure:
```
E[S_{t+Δt}|S_t] = S_t × e^(rΔt)
```

### Itô's Lemma Application
For any function f(S,t):
```
df = (∂f/∂t + ½σ²S²∂²f/∂S² + rS∂f/∂S)dt + σS∂f/∂S dW
```

## 🌐 3D Visualization Features

### Path Rendering
- **Individual Trajectories**: Each path shows one possible price evolution
- **Color Coding**: Paths colored by final price level
- **Real-time Generation**: Paths appear dynamically as simulation runs
- **Statistical Overlay**: Distribution statistics displayed

### Interactive Controls
- **Path Count**: Adjust number of simultaneous paths
- **Time Steps**: Modify granularity of the model
- **Volatility**: Change σ to see impact on path spread
- **Risk-free Rate**: Adjust drift term

## 🔧 Technical Implementation

### Path Generation Algorithm
```javascript
export function generatePaths(cfg = config) {
    const { STEPS, DELTA_T, SIGMA, RISK_FREE_R, PATHS } = cfg;
    const dx = calcDeltaX(SIGMA, DELTA_T);
    const pStar = riskNeutralProb(RISK_FREE_R, SIGMA, DELTA_T);
    
    const u = Math.exp(dx);
    const d = 1 / u;
    
    for (let p = 0; p < PATHS; p++) {
        let price = 1.0; // Start at S₀ = 1
        const path = [];
        
        for (let n = 1; n <= STEPS; n++) {
            const step = randomSign(pStar);
            price *= step === 1 ? u : d;
            path.push({ price, step });
        }
        paths.push(path);
    }
    return paths;
}
```

### Risk-Neutral Probability Calculation
```javascript
export const riskNeutralProb = (r, σ, Δt) => {
    const u = Math.exp(σ * Math.sqrt(Δt));
    const d = 1 / u;
    return (Math.exp(r * Δt) - d) / (u - d);
};
```

### Volatility Scaling
```javascript
export const calcDeltaX = (σ, Δt) => σ * Math.sqrt(Δt);
```

## 📊 Statistical Properties

### Central Limit Theorem
As the number of steps increases:
```
Σ(X_i) → N(nμ, nσ²)
```

### Convergence Rate
The binomial model converges to Black-Scholes at rate:
```
Error = O(√Δt)
```

### Moment Matching
The binomial model preserves the first two moments:
```
E[ln(S_T/S_0)] = (r - σ²/2)T
Var[ln(S_T/S_0)] = σ²T
```

## 🎮 Interactive Features

### Real-time Parameter Adjustment
- **Volatility Slider**: Instantly see how σ affects path spread
- **Steps Control**: Modify time granularity
- **Path Density**: Adjust number of visible paths
- **Speed Control**: Change animation speed

### Statistical Analysis
- **Distribution Histogram**: Real-time distribution of final prices
- **Moment Calculations**: Mean, variance, skewness, kurtosis
- **Convergence Metrics**: How well the model approximates continuous case

## 🔬 Physics Interpretation

### Particle Diffusion
Each stock price path represents a particle undergoing:
- **Brownian Motion**: Random collisions with market participants
- **Drift**: Systematic force (expected return)
- **Volatility**: Thermal energy (market noise)

### Statistical Mechanics
- **Ensemble Average**: Multiple paths show probability distribution
- **Ergodicity**: Time average equals ensemble average
- **Fluctuation-Dissipation**: Volatility relates to market efficiency

## 📚 Educational Applications

### Quantitative Finance
- **Option Pricing**: Foundation for binomial option models
- **Risk Management**: Understanding price distribution
- **Monte Carlo Methods**: Basis for more complex simulations

### Physics Connections
- **Random Walks**: Fundamental to statistical mechanics
- **Diffusion Processes**: Heat, particle, and information spreading
- **Stochastic Dynamics**: Non-equilibrium statistical physics

## 🚀 Usage Instructions

1. Open `index.html` in a modern web browser
2. Watch as multiple price paths evolve simultaneously
3. Use controls to adjust parameters and observe changes
4. Notice how paths spread over time (volatility effect)
5. Observe the emergence of log-normal distribution

## 🔍 Key Insights

1. **Discrete to Continuous**: Shows how finite models approximate continuous processes
2. **Randomness and Predictability**: Individual paths unpredictable, ensemble behavior predictable
3. **Parameter Sensitivity**: Visual demonstration of Greeks
4. **Convergence**: How increasing time steps improves model accuracy
5. **Risk-Neutral World**: Intuitive understanding of risk-neutral valuation

This simulation bridges the gap between theoretical mathematics and intuitive physics, making complex financial models accessible through visual exploration.
