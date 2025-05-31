// Floating particles background component
export function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10
  }));

  return (
    <div style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden",
      pointerEvents: "none",
      zIndex: 1
    }}>
      {particles.map(particle => (
        <div
          key={particle.id}
          style={{
            position: "absolute",
            left: `${particle.left}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            borderRadius: "50%",
            opacity: 0.6,
            animation: `float ${particle.duration}s ${particle.delay}s infinite ease-in-out alternate`
          }}
        />
      ))}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 0.6; }
            90% { opacity: 0.6; }
            100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
}

// Enhanced gradient button component
export function GradientButton({ children, onClick, variant = "primary", style = {} }) {
  const variants = {
    primary: {
      background: "#3b82f6",
      color: "white",
      boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)"
    },
    secondary: {
      background: "#8b5cf6",
      color: "white",
      boxShadow: "0 4px 15px rgba(139, 92, 246, 0.3)"
    },
    glass: {
      background: "rgba(255, 255, 255, 0.2)",
      color: "white",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      backdropFilter: "blur(10px)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
    }
  };

  return (
    <button
      onClick={onClick}
      style={{
        ...variants[variant],
        border: variant === "glass" ? "1px solid rgba(255, 255, 255, 0.3)" : "none",
        padding: "16px 32px",
        borderRadius: "12px",
        fontSize: "1rem",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
        ...style
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.opacity = "0.9";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.opacity = "1";
      }}
    >
      {children}
    </button>
  );
}

// Glass card component
export function GlassCard({ children, style = {} }) {
  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(20px)",
        borderRadius: "16px",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
        ...style
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 15px 40px rgba(0, 0, 0, 0.15)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.1)";
      }}
    >
      {children}
    </div>
  );
}

// Animated icon component
export function AnimatedIcon({ emoji, size = "3.5rem", style = {} }) {
  return (
    <div
      style={{
        fontSize: size,
        display: "inline-block",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        ...style
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "scale(1.2) rotate(5deg)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "scale(1) rotate(0deg)";
      }}
    >
      {emoji}
    </div>
  );
}

// Feature grid component with react-icons support
export function FeatureGrid({ features }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "24px",
      margin: "32px 0"
    }}>
      {features.map((feature, index) => (
        <div
          key={index}
          style={{
            padding: "24px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            textAlign: "center",
            transition: "all 0.3s ease"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
            e.currentTarget.style.transform = "translateY(-3px)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <div style={{
            fontSize: "2.5rem",
            color: "#60a5fa",
            marginBottom: "12px",
            transition: "all 0.3s ease"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
          >
            {feature.icon || feature.emoji}
          </div>
          <h4 style={{
            color: "white",
            fontSize: "1.1rem",
            fontWeight: "600",
            margin: "12px 0 8px 0"
          }}>
            {feature.title}
          </h4>
          <p style={{
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: "0.9rem",
            margin: "0",
            lineHeight: "1.4"
          }}>
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}

// Stats counter component
export function StatsCounter({ stats }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
      gap: "32px",
      margin: "40px 0"
    }}>
      {stats.map((stat, index) => (
        <div key={index} style={{ textAlign: "center" }}>
          <div style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            color: "#60a5fa",
            marginBottom: "8px"
          }}>
            {stat.value}
          </div>
          <div style={{
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: "0.9rem",
            fontWeight: "500"
          }}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// Animated background component with consistent colors
export function AnimatedBackground() {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: -1,
      background: "linear-gradient(135deg, #1e3a8a 0%, #3730a3 25%, #6366f1 50%, #8b5cf6 75%, #a855f7 100%)",
      backgroundSize: "400% 400%",
      animation: "gradientShift 15s ease infinite"
    }}>
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </div>
  );
}

// Icon wrapper component for react-icons
export function IconWrapper({ children, size = "2.5rem", style = {} }) {
  return (
    <div style={{
      fontSize: size,
      color: "#60a5fa",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.3s ease",
      ...style
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = "scale(1.1)";
      e.currentTarget.style.color = "#3b82f6";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.color = "#60a5fa";
    }}
    >
      {children}
    </div>
  );
}
