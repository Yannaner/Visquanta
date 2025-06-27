# Visquanta - Financial Physics Visualization Platform

[![GitHub stars](https://img.shields.io/github/stars/Yannaner/Visquanta?style=for-the-badge)](https://github.com/Yannaner/Visquanta/stargazers)
[![GitHub last commit](https://img.shields.io/github/last-commit/Yannaner/Visquanta?style=for-the-badge)](https://github.com/Yannaner/Visquanta/commits/main)
[![GitHub license](https://img.shields.io/github/license/Yannaner/Visquanta?style=for-the-badge)](https://github.com/Yannaner/Visquanta/blob/main/LICENSE)

## 🌟 Technology Stack

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![MathJS](https://img.shields.io/badge/MathJS-276DC3?style=for-the-badge&logo=math&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

## 📊 Project Overview

Visquanta is an innovative web-based visualization platform that bridges the gap between physics and quantitative finance. Through interactive 3D simulations, complex mathematical models become intuitive physical phenomena, making advanced financial concepts accessible to students, researchers, and practitioners.

## 🧠 Core Philosophy: Physics ↔ Finance

The platform demonstrates how fundamental physics principles map directly to financial mathematics:

| Physics Concept | Financial Application | Mathematical Foundation |
|----------------|----------------------|------------------------|
| **Brownian Motion** | Stock Price Random Walks | Geometric Brownian Motion |
| **Heat Diffusion** | Option Price Evolution | Black-Scholes PDE |
| **Harmonic Oscillator** | Mean Reversion Models | Ornstein-Uhlenbeck Process |
| **Statistical Mechanics** | Portfolio Theory | Central Limit Theorem |
| **Wave Equations** | Volatility Surfaces | Stochastic Volatility |

## 🎯 Interactive Simulations

### 1. 🎲 [Galton Board & Central Limit Theorem](./frontend/src/normal_distribution/)
**Physics Model**: Ball collisions with pegs creating probability distributions  
**Financial Application**: How random market events create normal return distributions  
**Key Equations**:
- Binomial Distribution: `P(k) = C(n,k) × p^k × (1-p)^(n-k)`
- Normal Convergence: `f(x) = (1/σ√(2π)) × e^(-(x-μ)²/2σ²)`
- Central Limit Theorem: `X̄ ~ N(μ, σ²/n)`

**Features**:
- Real-time statistics calculation (mean, std dev, skewness, kurtosis)
- Interactive physics simulation with gravity and collisions
- Visual demonstration of CLT convergence
- Financial interpretation of market returns

### 2. 🌡️ [Black-Scholes Heat Equation](./frontend/src/blackscholes/)
**Physics Model**: Heat diffusion through a medium over time  
**Financial Application**: Option price evolution across stock prices and time  
**Key Equations**:
- Heat Equation: `∂u/∂t = α(∂²u/∂x²)`
- Black-Scholes PDE: `∂V/∂t + ½σ²S²(∂²V/∂S²) + rS(∂V/∂S) - rV = 0`
- Greeks: `Δ = ∂V/∂S`, `Γ = ∂²V/∂S²`, `Θ = ∂V/∂t`, `ν = ∂V/∂σ`

**Features**:
- 3D surface visualization of option values
- Heat diffusion animation (backward in time)
- Mathematical equivalence demonstration
- Intuitive understanding of option pricing

### 3. 🌊 [Binomial Random Walk](./frontend/src/binomial_random_walk/)
**Physics Model**: Particle diffusion through discrete collisions  
**Financial Application**: Stock price evolution through discrete time steps  
**Key Equations**:
- Binomial Parameters: `u = e^(σ√Δt)`, `d = 1/u`, `p* = (e^(rΔt) - d)/(u - d)`
- Continuous Limit: `dS = μSdt + σSdW`
- Convergence Rate: `Error = O(√Δt)`

**Features**:
- Multiple simultaneous price paths
- Convergence analysis to continuous processes
- Visual demonstration of risk-neutral valuation
- Foundation for option pricing models

### 4. 🔗 [Ornstein-Uhlenbeck Mean Reversion](./frontend/src/ou_process/)
**Physics Model**: Spring-pendulum system with damping and random forcing  
**Financial Application**: Mean-reverting assets (interest rates, volatility, pairs)  
**Key Equations**:
- OU Process: `dx = -θ(x - μ)dt + σdW`
- Spring Dynamics: `F = -k(x - x₀) - cv + σξ(t)`
- Solution: `X(t) = μ + (X₀ - μ)e^(-θt) + noise term`

**Features**:
- 3D spring-pendulum visualization
- Three damping regimes (under/critical/over-damped)
- Real-time parameter adjustment
- Mean reversion time calculations

### 5. 🎢 [Options Game: Roller Coaster Weather](./frontend/src/options/)
**Physics Model**: Environmental system with state transitions  
**Financial Application**: Options trading through weather analogies  
**Key Concepts**:
- Call Options: Right to ride (favorable conditions)
- Put Options: Insurance against bad weather
- Time Decay: Weather forecast uncertainty
- Exercise Decisions: Optimal timing strategies

**Features**:
- Interactive decision-making scenarios
- Weather state transition modeling
- Educational game mechanics
- Risk management lessons

## 🔬 Mathematical Foundations

### Stochastic Differential Equations
All models are based on fundamental SDEs:
```
Geometric Brownian Motion: dS = μSdt + σSdW
Ornstein-Uhlenbeck: dx = -θ(x - μ)dt + σdW
Jump-Diffusion: dS = μSdt + σSdW + JdN
```

### Partial Differential Equations
Financial PDEs map to physics equations:
```
Black-Scholes: ∂V/∂t + ½σ²S²∂²V/∂S² + rS∂V/∂S - rV = 0
Heat Equation: ∂u/∂t = α∇²u
Wave Equation: ∂²u/∂t² = c²∇²u
```

### Statistical Mechanics
Market behavior emerges from microscopic interactions:
- **Ensemble Averages**: Portfolio diversification
- **Ergodicity**: Time series vs. cross-sectional analysis
- **Phase Transitions**: Market regime changes
- **Critical Phenomena**: Financial crises

## 🚀 Key Features

### Advanced 3D Visualization
- **Three.js Rendering**: High-performance WebGL graphics
- **Real-time Animation**: Smooth 60fps simulations
- **Interactive Controls**: OrbitControls for exploration
- **Dynamic Lighting**: Realistic material properties
- **Particle Systems**: Complex multi-body interactions

### Physics Engine Integration
- **Cannon.js Physics**: Realistic collision detection
- **Gravitational Systems**: N-body problem solutions
- **Constraint Solving**: Spring-mass-damper systems
- **Fluid Dynamics**: Viscous flow approximations

### Mathematical Analysis Tools
- **Statistical Computing**: Real-time parameter estimation
- **Numerical Methods**: Finite difference PDE solvers
- **Monte Carlo**: Path-dependent option pricing
- **Fourier Analysis**: Spectral density calculations
- **Optimization**: Maximum likelihood estimation

## 🎓 Educational Applications

### Academic Curriculum
- **Undergraduate Finance**: Introduction to quantitative methods
- **Graduate Programs**: Advanced derivatives and risk management
- **Physics Education**: Statistical mechanics and stochastic processes
- **Mathematics**: Applied probability and differential equations

### Professional Development
- **Quantitative Analysts**: Visual debugging of models
- **Risk Managers**: Intuitive understanding of Greeks
- **Traders**: Market dynamics through physics analogies
- **Researchers**: New model development and validation

## 📈 Getting Started

### Quick Start
1. Clone the repository
2. Open any `index.html` file in a modern browser
3. No build process required - pure JavaScript modules
4. Use mouse/touch to interact with 3D scenes

### Browser Requirements
- **WebGL 2.0**: For advanced rendering features
- **ES6 Modules**: Modern JavaScript support
- **Web Workers**: For background processing (optional)

### Development Setup
```bash
# Serve files locally (required for ES6 modules)
python -m http.server 8000
# or
npx serve .
# or
live-server
```

## 🤝 Contributing

We welcome contributions from physicists, mathematicians, and finance professionals!

### Areas for Expansion
- **New Models**: Heston, CIR, Levy processes
- **Advanced Physics**: Quantum finance, field theory applications
- **Machine Learning**: Neural ODEs, physics-informed networks
- **Performance**: WebGPU implementation, SIMD optimization

## 📚 References & Further Reading

### Quantitative Finance
- Hull, J. "Options, Futures, and Other Derivatives"
- Shreve, S. "Stochastic Calculus for Finance"
- Björk, T. "Arbitrage Theory in Continuous Time"

### Mathematical Physics
- Gardiner, C. "Stochastic Methods"
- Risken, H. "The Fokker-Planck Equation"
- Pathria, R. "Statistical Mechanics"

### Computational Methods
- Glasserman, P. "Monte Carlo Methods in Financial Engineering"
- Duffy, D. "Finite Difference Methods in Financial Engineering"
- Kloeden, P. "Numerical Solution of Stochastic Differential Equations"

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

Special thanks to the open-source community for the foundational libraries that make this project possible:
- **Three.js**: Ricardo Cabello and contributors
- **Cannon.js**: Stefan Hedman and contributors
- **Mathematical community**: For decades of theoretical development

---

*"The best way to understand complex systems is to make them simple to see."*  
**Visquanta** - Where Physics Meets Finance
