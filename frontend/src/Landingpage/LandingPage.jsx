const sims = [
  {
    emoji: "🎢",
    title: "Options Ride",
    desc: "Experience options trading through an interactive amusement park simulation",
    url: "/src/options/Scene.html",
    category: "Finance"
  },
  {
    emoji: "🌳",
    title: "Binomial Random Walk",
    desc: "Visualize probability trees and stochastic processes in real-time",
    url: "/src/binomial_random_walk/index.html",
    category: "Mathematical"
  },
  {
    emoji: "🔥",
    title: "Black-Scholes Surface",
    desc: "Explore option pricing through heat diffusion visualization",
    url: "/src/blackscholes/blackscholes.html",
    category: "Finance"
  },
  {
    emoji:"🌟",
    title: "Ornstein-Uhlenbeck process",
    desc: "Mean reversion simulation with spring damping", 
    url:"/src/ou_process/index.html",
    category:"Finance"
  }
];

function SimulationCard({ sim, index }) {
  //Place to create different color gradient for the cards
  const gradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  ];

  return (
    <div
      style={{
        background: "white",
        borderRadius: "20px",
        padding: "0",
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.08)",
        border: "1px solid #e5e7eb",
        transition: "all 0.4s ease",
        overflow: "hidden",
        position: "relative"
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.15)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.08)";
      }}
    >
      <div style={{
        background: gradients[index % gradients.length],
        height: "140px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
      }}>
        <span style={{ fontSize: "3.5rem" }}>{sim.emoji}</span>
        <div style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          background: "rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(10px)",
          padding: "6px 12px",
          borderRadius: "20px",
          fontSize: "0.75rem",
          color: "white",
          fontWeight: "600",
          border: "1px solid rgba(255, 255, 255, 0.2)"
        }}>
          {sim.category}
        </div>
      </div>
      
      <div style={{ padding: "24px" }}>
        <div style={{ marginBottom: "16px" }}>
          <h3 style={{
            fontSize: "1.3rem",
            fontWeight: "700",
            color: "#1f2937",
            margin: "0 0 8px 0"
          }}>
            {sim.title}
          </h3>
          <span style={{
            background: "#f1f5f9",
            color: "#475569",
            padding: "4px 10px",
            borderRadius: "12px",
            fontSize: "0.75rem",
            fontWeight: "500"
          }}>
            {sim.category}
          </span>
        </div>
        
        <p style={{
          color: "#6b7280",
          fontSize: "0.9rem",
          lineHeight: "1.5",
          margin: "0 0 24px 0"
        }}>
          {sim.desc}
        </p>
        
        <button 
          onClick={() => window.location.href = sim.url}
          style={{
            background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
            color: "white",
            border: "none",
            padding: "14px 24px",
            borderRadius: "12px",
            fontSize: "0.9rem",
            fontWeight: "600",
            cursor: "pointer",
            width: "100%",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(59, 130, 246, 0.4)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <span>Explore Project</span>
          <span style={{ marginLeft: "8px", fontSize: "1rem" }}>→</span>
        </button>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      {/* Enhanced Navigation */}
      <nav style={{
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(229, 231, 235, 0.8)",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "70px"
        }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{
              width: "36px",
              height: "36px",
              background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "12px"
            }}>
              <span style={{ color: "white", fontSize: "1.2rem", fontWeight: "700" }}>V</span>
            </div>
            <div>
              <h1 style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#1f2937",
                margin: "0"
              }}>
                Visquanta
              </h1>
              <span style={{
                fontSize: "0.8rem",
                color: "#6b7280"
              }}>
                Financial Visualizations
              </span>
            </div>
          </div>
          
          <a 
            href="https://github.com/Yannaner/Visquanta"
            style={{
              background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
              color: "white",
              padding: "10px 20px",
              borderRadius: "10px",
              fontSize: "0.85rem",
              fontWeight: "600",
              textDecoration: "none",
              transition: "all 0.3s ease",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(31, 41, 55, 0.3)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <span>View on GitHub</span>
            <span style={{ marginLeft: "6px" }}>↗</span>
          </a>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section style={{
        padding: "80px 24px",
        textAlign: "center",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        <div style={{
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          borderRadius: "24px",
          padding: "60px 40px",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
        }}>
          <h1 style={{
            fontSize: "3.2rem",
            fontWeight: "800",
            color: "#1f2937",
            margin: "0 0 20px 0",
            lineHeight: "1.1"
          }}>
            Interactive Financial
            <br />
            <span style={{ 
              background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              Visualizations
            </span>
          </h1>
          <p style={{
            fontSize: "1.2rem",
            color: "#6b7280",
            maxWidth: "650px",
            margin: "0 auto 40px auto",
            lineHeight: "1.6"
          }}>
            A personal project exploring quantitative finance through interactive visualizations. 
            Built to make complex financial mathematics more intuitive and accessible.
          </p>
          
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <button style={{
              background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
              color: "white",
              border: "none",
              padding: "16px 32px",
              borderRadius: "14px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 12px 25px rgba(59, 130, 246, 0.4)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
            >
              Start Exploring
            </button>
            <button style={{
              background: "rgba(255, 255, 255, 0.8)",
              color: "#374151",
              border: "1px solid #d1d5db",
              padding: "16px 32px",
              borderRadius: "14px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "white";
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 12px 25px rgba(0, 0, 0, 0.1)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.8)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section style={{
        padding: "60px 24px",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        <div style={{
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 15px 30px rgba(0, 0, 0, 0.08)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center"
        }}>
          <h2 style={{
            fontSize: "2rem",
            fontWeight: "700",
            color: "#1f2937",
            margin: "0 0 20px 0"
          }}>
            About This Project
          </h2>
          <p style={{
            color: "#4b5563",
            fontSize: "1.05rem",
            lineHeight: "1.7",
            margin: "0 0 30px 0"
          }}>
            Visquanta transforms complex financial concepts into interactive visual experiences. 
            Each simulation demonstrates different aspects of quantitative finance, from options pricing 
            to stochastic processes, making mathematical theory tangible and explorable.
          </p>
          <div style={{
            background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
            padding: "24px",
            borderRadius: "16px",
            marginTop: "24px"
          }}>
            <h3 style={{
              color: "#3b82f6",
              fontSize: "1.2rem",
              fontWeight: "700",
              margin: "0 0 16px 0"
            }}>
              What You'll Discover
            </h3>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "16px",
              textAlign: "left"
            }}>
              <div style={{ padding: "8px 0" }}>
                <span style={{ fontSize: "1.2rem", marginRight: "8px" }}>🎢</span>
                <strong style={{ color: "#1f2937" }}>Options Ride</strong>
                <span style={{ color: "#6b7280", fontSize: "0.9rem", display: "block", marginLeft: "28px" }}>
                  Gamified options trading experience
                </span>
              </div>
              <div style={{ padding: "8px 0" }}>
                <span style={{ fontSize: "1.2rem", marginRight: "8px" }}>🌳</span>
                <strong style={{ color: "#1f2937" }}>Binomial Trees</strong>
                <span style={{ color: "#6b7280", fontSize: "0.9rem", display: "block", marginLeft: "28px" }}>
                  Dynamic probability visualization
                </span>
              </div>
              <div style={{ padding: "8px 0" }}>
                <span style={{ fontSize: "1.2rem", marginRight: "8px" }}>🔥</span>
                <strong style={{ color: "#1f2937" }}>Black-Scholes</strong>
                <span style={{ color: "#6b7280", fontSize: "0.9rem", display: "block", marginLeft: "28px" }}>
                  Heat diffusion modeling
                </span>
              </div>
              <div style={{ padding: "8px 0" }}>
                <span style={{ fontSize: "1.2rem", marginRight: "8px" }}>🌟</span>
                <strong style={{ color: "#1f2937" }}>Ornstein-Uhlenbeck</strong>
                <span style={{ color: "#6b7280", fontSize: "0.9rem", display: "block", marginLeft: "28px" }}>
                  Mean reversion with spring damping
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Demonstrations Grid */}
      <section style={{
        padding: "60px 24px 100px",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h2 style={{
            fontSize: "2.2rem",
            fontWeight: "700",
            color: "#1f2937",
            margin: "0 0 16px 0"
          }}>
            Interactive Demonstrations
          </h2>
          <p style={{
            fontSize: "1.05rem",
            color: "#6b7280",
            maxWidth: "550px",
            margin: "0 auto"
          }}>
            Click on any project below to explore financial mathematics in action
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "32px"
        }}>
          {sims.map((sim, index) => (
            <SimulationCard key={sim.title} sim={sim} index={index} />
          ))}
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer style={{
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",
        borderTop: "1px solid rgba(229, 231, 235, 0.8)",
        padding: "40px 24px",
        textAlign: "center"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{
            color: "#6b7280",
            fontSize: "0.9rem",
            margin: "0 0 20px 0"
          }}>
            Built as a personal exploration of financial mathematics and visualization
          </p>
          <a href="https://github.com/Yannaner/Visquanta" style={{
            background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
            color: "white",
            textDecoration: "none",
            fontSize: "0.9rem",
            fontWeight: "600",
            padding: "12px 24px",
            borderRadius: "10px",
            transition: "all 0.3s ease",
            display: "inline-block"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(59, 130, 246, 0.3)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
          >
            View GitHub Repository
          </a>
          <p style={{
            color: "#9ca3af",
            fontSize: "0.8rem",
            margin: "20px 0 0 0"
          }}>
            © 2025 Visquanta - Personal Project
          </p>
        </div>
      </footer>
    </div>
  );
}