import { FaRocket, FaTree, FaFire, FaStar, FaGithub, FaExternalLinkAlt, FaChartLine, FaPlay, FaArrowDown } from 'react-icons/fa';
import { IconWrapper } from './components/elements';
import Particles from './background/particles.jsx';
import ChromaGrid from './components/ChromaGrid.jsx';

const sims = [
  {
    icon: <FaRocket />,
    title: "Options Ride",
    subtitle: "Experience options trading through an interactive amusement park simulation",
    handle: "Finance",
    url: "/src/options/index.html",
    borderColor: "#000000"
  },
  {
    icon: <FaTree />,
    title: "Binomial Random Walk",
    subtitle: "Visualize probability trees and stochastic processes in real-time",
    handle: "Mathematical",
    url: "/src/binomial_random_walk/index.html",
    borderColor: "#000000"
  },
  {
    icon: <FaFire />,
    title: "Black-Scholes Surface",
    subtitle: "Explore option pricing through heat diffusion visualization",
    handle: "Finance",
    url: "/src/blackscholes/index.html",
    borderColor: "#000000"
  },
  {
    icon: <FaStar />,
    title: "Ornstein-Uhlenbeck Process",
    subtitle: "Mean reversion simulation with spring damping", 
    handle: "Finance",
    url: "/src/ou_process/index.html",
    borderColor: "#000000"
  },
  {
    icon: <FaChartLine />,
    title: "Normal Distribution",
    subtitle: "Showing everything falls into normal distribution", 
    handle: "Mathematical",
    url: "/src/normal_distribution/index.html",
    borderColor: "#000000"
  }
];

function SimulationCard({ sim, index }) {
  const gradients = [
    "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
    "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
    "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
  ];

  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        borderRadius: "24px",
        padding: "0",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        overflow: "hidden",
        position: "relative",
        backdropFilter: "blur(10px)"
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-12px) scale(1.03)";
        e.currentTarget.style.boxShadow = "0 25px 50px rgba(0, 0, 0, 0.3)";
        e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.2)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.2)";
        e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.1)";
      }}
    >
      <div style={{
        background: gradients[index % gradients.length],
        height: "160px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Decorative circles */}
        <div style={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          width: "100px",
          height: "100px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "50%",
          filter: "blur(20px)"
        }} />
        <div style={{
          position: "absolute",
          bottom: "-30px",
          left: "-30px",
          width: "60px",
          height: "60px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "50%",
          filter: "blur(15px)"
        }} />

        <IconWrapper size="4rem" style={{ 
          color: "white", 
          position: "relative", 
          zIndex: 2,
          filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))"
        }}>
          {sim.icon}
        </IconWrapper>
        
        <div style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          padding: "8px 16px",
          borderRadius: "20px",
          fontSize: "0.8rem",
          color: "white",
          fontWeight: "700",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)"
        }}>
          {sim.category}
        </div>
      </div>
      
      <div style={{ padding: "32px 28px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{
            fontSize: "1.4rem",
            fontWeight: "800",
            color: "white",
            margin: "0 0 12px 0",
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)"
          }}>
            {sim.title}
          </h3>
        </div>
        
        <p style={{
          color: "rgba(255, 255, 255, 0.8)",
          fontSize: "0.95rem",
          lineHeight: "1.6",
          margin: "0 0 28px 0"
        }}>
          {sim.desc}
        </p>
        
        <button 
          onClick={() => window.location.href = sim.url}
          style={{
            background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
            color: "white",
            border: "none",
            padding: "16px 28px",
            borderRadius: "16px",
            fontSize: "0.95rem",
            fontWeight: "700",
            cursor: "pointer",
            width: "100%",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 8px 20px rgba(59, 130, 246, 0.3)"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)";
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow = "0 12px 30px rgba(59, 130, 246, 0.5)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(59, 130, 246, 0.3)";
          }}
        >
          <span>Explore Project</span>
          <FaExternalLinkAlt style={{ marginLeft: "10px", fontSize: "0.9rem" }} />
        </button>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2a2a2a 100%)",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      overflow: "hidden"
    }}>
      {/* Hero Section with Particles Background */}
      <section style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        overflow: "hidden"
      }}>
        {/* Particles Background */}
        <div style={{ 
          position: "absolute", 
          top: 0, 
          left: 0, 
          width: "100%", 
          height: "100%",
          zIndex: 1
        }}>
          <Particles
            particleColors={['#ffffff', '#cccccc', '#888888']}
            particleCount={200}
            moveParticlesOnHover={true}
          />
        </div>

        {/* Hero Content */}
        <div style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1000px",
          padding: "0 24px"
        }}>
          {/* Logo/Brand */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "32px"
          }}>
            <div style={{
              width: "64px",
              height: "64px",
              background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "16px",
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
            }}>
              <FaChartLine style={{ color: "white", fontSize: "2rem" }} />
            </div>
            <div>
              <h1 style={{
                fontSize: "2.5rem",
                fontWeight: "800",
                color: "white",
                margin: "0",
                textShadow: "0 4px 20px rgba(0, 0, 0, 0.3)"
              }}>
                Visquanta
              </h1>
              <span style={{
                fontSize: "1rem",
                color: "rgba(255, 255, 255, 0.7)",
                fontWeight: "500"
              }}>
                Financial Visualizations
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 style={{
            fontSize: "4rem",
            fontWeight: "900",
            color: "white",
            margin: "0 0 24px 0",
            lineHeight: "1.1",
            textShadow: "0 4px 30px rgba(0, 0, 0, 0.4)"
          }}>
            Interactive Financial
            <br />
            <span style={{ 
              background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              Mathematics
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: "1.4rem",
            color: "rgba(255, 255, 255, 0.8)",
            maxWidth: "700px",
            margin: "0 auto 48px auto",
            lineHeight: "1.6",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)"
          }}>
            Explore quantitative finance through immersive visualizations. 
            Transform complex mathematical concepts into intuitive, interactive experiences.
          </p>

          {/* CTA Buttons */}
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            gap: "20px", 
            flexWrap: "wrap",
            marginBottom: "60px"
          }}>
            <button 
              onClick={scrollToProjects}
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)",
                color: "#000000",
                border: "2px solid #000000",
                padding: "18px 36px",
                borderRadius: "16px",
                fontSize: "1.1rem",
                fontWeight: "700",
                cursor: "pointer",
                transition: "all 0.4s ease",
                display: "flex",
                alignItems: "center",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
                backdropFilter: "blur(10px)"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-4px) scale(1.05)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.4)";
                e.currentTarget.style.background = "linear-gradient(135deg, #f8f8f8 0%, #e0e0e0 100%)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.3)";
                e.currentTarget.style.background = "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)";
              }}
            >
              <FaPlay style={{ marginRight: "10px" }} />
              Start Exploring
            </button>

            <a 
              href="https://github.com/Yannaner/Visquanta"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                color: "white",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                padding: "16px 32px",
                borderRadius: "16px",
                fontSize: "1.1rem",
                fontWeight: "600",
                textDecoration: "none",
                transition: "all 0.4s ease",
                display: "flex",
                alignItems: "center",
                backdropFilter: "blur(10px)"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
                e.currentTarget.style.transform = "translateY(-4px) scale(1.05)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.5)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
              }}
            >
              <FaGithub style={{ marginRight: "10px" }} />
              View Source
              <FaExternalLinkAlt style={{ marginLeft: "8px", fontSize: "0.9rem" }} />
            </a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        id="projects"
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
          padding: "100px 24px",
          position: "relative",
          zIndex: 3
        }}
      >
        {/* Particles Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1
        }}>
          <Particles 
            particleCount={100}
            particleColors={['#ffffff', '#cccccc', '#888888']}
            moveParticlesOnHover={false}
          />
        </div>

        <div style={{ 
          maxWidth: "1200px", 
          margin: "0 auto", 
          position: "relative", 
          zIndex: 2 
        }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{
              fontSize: "2.8rem",
              fontWeight: "800",
              color: "white",
              margin: "0 0 20px 0",
              textShadow: "0 4px 20px rgba(0, 0, 0, 0.3)"
            }}>
              Interactive Demonstrations
            </h2>
            <p style={{
              fontSize: "1.2rem",
              color: "rgba(255, 255, 255, 0.7)",
              maxWidth: "600px",
              margin: "0 auto"
            }}>
              Explore financial mathematics through immersive, interactive experiences
            </p>
          </div>

          <div style={{ position: 'relative' }}>
            <ChromaGrid 
              items={sims}
              columns={3}
              gap={32}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
        padding: "60px 24px 40px",
        textAlign: "center",
        position: "relative",
        zIndex: 3
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "32px"
          }}>
            <div style={{
              width: "48px",
              height: "48px",
              background: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "12px",
              border: "2px solid #000000"
            }}>
              <FaChartLine style={{ color: "#000000", fontSize: "1.5rem" }} />
            </div>
            <div>
              <h3 style={{
                fontSize: "1.8rem",
                fontWeight: "700",
                color: "white",
                margin: "0"
              }}>
                Visquanta
              </h3>
              <span style={{
                fontSize: "0.9rem",
                color: "rgba(255, 255, 255, 0.6)"
              }}>
                Financial Visualizations
              </span>
            </div>
          </div>

          <p style={{
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: "1rem",
            maxWidth: "500px",
            margin: "0 auto 32px auto"
          }}>
            A personal exploration of quantitative finance through interactive visualizations. 
            Making mathematical theory tangible and accessible.
          </p>

          <a 
            href="https://github.com/Yannaner/Visquanta" 
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
              color: "white",
              textDecoration: "none",
              fontSize: "1rem",
              fontWeight: "600",
              padding: "14px 28px",
              borderRadius: "12px",
              transition: "all 0.3s ease",
              display: "inline-flex",
              alignItems: "center",
              boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 15px 40px rgba(59, 130, 246, 0.4)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(59, 130, 246, 0.3)";
            }}
          >
            <FaGithub style={{ marginRight: "10px" }} />
            View GitHub Repository
            <FaExternalLinkAlt style={{ marginLeft: "8px", fontSize: "0.9rem" }} />
          </a>

          <div style={{
            marginTop: "40px",
            paddingTop: "32px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)"
          }}>
            <p style={{
              color: "rgba(255, 255, 255, 0.5)",
              fontSize: "0.9rem",
              margin: "0"
            }}>
              © 2025 Visquanta - Built with passion for financial mathematics
            </p>
          </div>
        </div>
      </footer>

      {/* Add bounce animation styles */}
      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0) translateX(-50%);
          }
          40% {
            transform: translateY(-10px) translateX(-50%);
          }
          60% {
            transform: translateY(-5px) translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}