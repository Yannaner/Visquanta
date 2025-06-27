# Galton Board & Central Limit Theorem Simulation

## 🎯 Overview
This interactive 3D physics simulation demonstrates how the Central Limit Theorem emerges from random processes, using a Galton Board (bean machine) to model how financial returns naturally form a normal distribution.

## 🔬 Physics Model

### The Galton Board
The Galton Board is a physical device consisting of:
- A funnel at the top where balls are dropped
- Multiple rows of pegs arranged in a triangular pattern
- Collection bins at the bottom

### Physics Equations

**Ball Motion:**
```
Position: x(t) = x₀ + v₀t + ½at²
Velocity: v(t) = v₀ + at
Acceleration: a = g (gravity) + F_collision/m
```

**Collision Physics:**
```
Conservation of Momentum: m₁v₁ + m₂v₂ = m₁v₁' + m₂v₂'
Coefficient of Restitution: e = -(v₁' - v₂')/(v₁ - v₂)
```

**Random Walk Mathematics:**
```
Expected Position: E[X] = np
Variance: Var(X) = np(1-p)
Standard Deviation: σ = √(np(1-p))
```

### Normal Distribution Emergence
As balls bounce through pegs, each collision represents a binary choice (left/right), creating a binomial distribution that converges to a normal distribution:

```
Binomial → Normal Distribution (Central Limit Theorem)
P(X = k) = C(n,k) × p^k × (1-p)^(n-k)
↓ (n → ∞)
f(x) = (1/σ√(2π)) × e^(-(x-μ)²/2σ²)
```

## 💰 Financial Interpretation

### Market Returns Model
- **μ (mu)**: Average return (drift rate) - where most balls cluster
- **σ (sigma)**: Volatility - spread of the distribution
- **Each peg collision**: Random market movement/news event
- **Final ball position**: Cumulative return over time period

### Key Financial Concepts
1. **Central Limit Theorem**: Sum of many independent random events (daily returns) creates normal distribution
2. **Risk-Return Relationship**: Higher volatility (σ) = wider spread = higher risk
3. **Expected Return**: Center of distribution represents expected portfolio performance
4. **Tail Risk**: Extreme positions represent rare but significant market events

## 🎮 Interactive Controls

- **Restart Simulation**: Reset the board and start fresh
- **Add 10 Balls**: Increase sample size to better demonstrate CLT
- **Clear All Balls**: Remove all balls while keeping the board structure

## 🔧 Technical Implementation

### Physics Engine: Cannon.js
- Gravity simulation: -9.82 m/s²
- Collision detection between balls and pegs
- Realistic bounce physics with damping

### 3D Visualization: Three.js
- Real-time rendering of ball trajectories
- Dynamic camera controls (OrbitControls)
- Material properties for realistic appearance

### Key Parameters
```javascript
simulationControls = {
    ballReleaseRate: 300,    // Time between ball drops (ms)
    maxBalls: 150,           // Maximum balls on screen
    pegRows: 15,             // Number of peg rows
    pegSpacing: 1.5,         // Distance between pegs
    gravity: -9.82,          // Gravitational acceleration
    ballSize: 0.4,           // Ball radius
    pegSize: 0.2             // Peg radius
}
```

## 📊 Educational Value

This simulation bridges physics and finance by showing:
1. How randomness at the microscale creates predictable patterns at the macroscale
2. Why financial returns often follow normal distributions
3. The mathematical foundation of risk management
4. How the Central Limit Theorem applies to real-world scenarios

## 🚀 Usage

1. Open `index.html` in a modern web browser
2. Watch as balls drop and create a bell curve distribution
3. Use controls to experiment with different parameters
4. Observe how increasing sample size makes the normal distribution more apparent

## 📚 Mathematical Background

The simulation demonstrates several key mathematical concepts:

- **Probability Theory**: Each peg collision is a Bernoulli trial
- **Statistics**: Sample mean converges to population mean
- **Stochastic Processes**: Random walks in discrete time
- **Limit Theorems**: Binomial distribution approaches normal distribution

This makes it an excellent educational tool for understanding both physics and quantitative finance.
