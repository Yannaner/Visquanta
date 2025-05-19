const sims = [
  {
    emoji: "🎢",
    title: "Options Ride",
    desc: "Options as Amusement Park",
    url: "/src/options/Scene.html"
  },
  {
    emoji: "🌳",
    title: "Binomial Random Walk",
    desc: "Lattice Visualization",
    url: "/src/binomial_random_walk/index.html"
  },
  {
    emoji: "🔥",
    title: "Black-Scholes Surface",
    desc: "Heat Diffusion",
    url: "/src/blackscholes/blackscholes.html"
  }
];

function SimulationCard({ sim, i }) {
  return (
    <div
      className="sim-card"
      tabIndex={0}
      onClick={() => window.location.href = sim.url}
      style={{
        background: "linear-gradient(120deg, #1a2747 60%, #223a5e 100%)",
        borderRadius: "18px",
        padding: "32px 24px",
        margin: "0 0 18px 0",
        cursor: "pointer",
        boxShadow: "0 2px 16px 0 #0a1836cc",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: 220,
        maxWidth: 320,
        outline: "none",
        border: "1.5px solid #223a5e",
        color: "#eaf6ff"
      }}
    >
      <span style={{ fontSize: "2.2em", marginBottom: 8 }}>{sim.emoji}</span>
      <span style={{ fontWeight: 700, fontSize: "1.25em", marginBottom: 4 }}>{sim.title}</span>
      <span style={{ fontWeight: 400, fontSize: "1em", color: "#8fd6ff" }}>{sim.desc}</span>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div style={{
      minHeight: "100vh",
      width: "100vw",
      background: "linear-gradient(135deg, #0a1836 0%, #1a2747 100%)",
      display: "flex",
      flexDirection: "column"
    }}>
      <header style={{
        width: "100%",
        background: "rgba(10,24,54,0.98)",
        boxShadow: "0 2px 24px 0 #0a1836cc",
        padding: "0",
        margin: "0"
      }}>
        <div style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "38px 32px 18px 32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start"
        }}>
          <span style={{
            fontSize: "2.8rem",
            fontWeight: 800,
            letterSpacing: 2,
            color: "#38e6c5",
            marginBottom: 4
          }}>Visquanta</span>
          <span style={{
            fontSize: "1.22rem",
            color: "#8fd6ff",
            marginBottom: 0
          }}>Interactive Financial Visualizations for Learning &amp; Exploration</span>
        </div>
      </header>
      <main style={{
        flex: 1,
        width: "100%",
        maxWidth: 1100,
        margin: "0 auto",
        padding: "32px 24px 24px 24px",
        display: "flex",
        flexWrap: "wrap",
        gap: "40px",
        justifyContent: "space-between"
      }}>
        <section style={{
          flex: "1 1 320px",
          minWidth: 280,
          background: "rgba(20,32,64,0.92)",
          borderRadius: 18,
          padding: "32px 24px",
          marginBottom: 0,
          boxShadow: "0 4px 24px 0 #0a183644"
        }}>
          <h2 style={{ color: "#4f8cff", marginTop: 0, marginBottom: "0.7em", fontSize: "1.5rem" }}>Welcome</h2>
          <p style={{ color: "#eaf6ff", fontSize: "1.08rem" }}>
            <b>Visquanta</b> is a playful, interactive platform for exploring the mathematics and intuition behind financial derivatives.<br />
            Dive into simulations that bring concepts like options, binomial trees, and Black-Scholes to life—no finance degree required!
          </p>
        </section>
        <section style={{
          flex: "1 1 320px",
          minWidth: 280,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 24,
          marginTop: 0
        }}>
          {sims.map((sim, i) => <SimulationCard sim={sim} i={i} key={sim.title} />)}
        </section>
        <section style={{
          flex: "1 1 320px",
          minWidth: 280,
          background: "rgba(20,32,64,0.92)",
          borderRadius: 18,
          padding: "32px 24px",
          marginBottom: 0,
          boxShadow: "0 4px 24px 0 #0a183644"
        }}>
          <h2 style={{ color: "#4f8cff", marginTop: 0, marginBottom: "0.7em", fontSize: "1.5rem" }}>About</h2>
          <p style={{ color: "#eaf6ff", fontSize: "1.08rem" }}>
            This project was created as a summer 2025 initiative to make quantitative finance more accessible and visually engaging.<br />
            Each simulation is crafted to help you <b>see</b> how risk, randomness, and pricing interact in real time.
          </p>
          <p style={{ color: "#8fd6ff", fontSize: "1.05rem" }}>
            <b>Options Ride</b> turns options into a theme park adventure.<br />
            <b>Binomial Random Walk</b> lets you watch probability trees grow.<br />
            <b>Black-Scholes Surface</b> visualizes option pricing as heat diffusion.
          </p>
        </section>
      </main>
      <footer style={{
        width: "100%",
        textAlign: "center",
        marginTop: 48,
        padding: "18px 0 10px 0",
        fontSize: "1em",
        color: "#8fd6ff",
        background: "rgba(10,24,54,0.92)",
        borderTop: "1px solid #223a5e"
      }}>
        &copy; 2025 Visquanta &mdash; Summer Project &mdash; <a href="https://github.com/Yannaner/Visquanta" style={{ color: "#38e6c5", textDecoration: "none" }}>GitHub</a>
      </footer>
    </div>
  );
}