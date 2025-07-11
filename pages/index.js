import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <div style={{ fontFamily: "Montserrat, Arial, sans-serif", background: "#f4f7fa", minHeight: "100vh" }}>
      <NavBar />
      {/* Hero Section */}
      <section id="hero" style={{
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
        padding: "60px 0 40px 0"
      }}>
        <img
          src="/hero-image.png" // Place your main hero image in /public
          alt="Mindful Journey Preview"
          style={{
            maxWidth: 900,
            width: "100%",
            margin: "24px 0 40px 0",
            borderRadius: "32px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.06)"
          }}
        />
        <a
          href="#features"
          style={{
            background: "#183C57",
            color: "#fff",
            padding: "1rem 2.4rem",
            borderRadius: "16px",
            fontWeight: 600,
            fontSize: "1.15rem",
            boxShadow: "0 2px 8px rgba(24,60,87,0.09)",
            textDecoration: "none",
            marginTop: "8px"
          }}
        >
          Begin Using MindBridge →
        </a>
      </section>

      {/* Features Section */}
      <section id="features" style={{
        minHeight: "80vh",
        background: "#f4f7fa",
        padding: "60px 0 60px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <h2 style={{
          fontSize: "2.3rem",
          fontWeight: 700,
          color: "#183C57",
          marginBottom: "2.5rem"
        }}>Features</h2>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "2rem",
          width: "100%",
          maxWidth: 1000
        }}>
          <FeatureCard
            title="Addiction Tracker"
            desc="Stay motivated and accountable as you track your progress on the path to recovery."
            img="/addiction.png"
            href="/addiction-tracker"
          />
          <FeatureCard
            title="Mood Songs"
            desc="Get personalized song recommendations based on your current mood."
            img="/mood.png"
            href="/mood-songs"
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{
        minHeight: "60vh",
        background: "#d9e6f2",
        padding: "80px 0 60px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "60px",
          maxWidth: 1150,
          width: "100%"
        }}>
          <div style={{ maxWidth: 500 }}>
            <h1 style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              color: "#2e466e",
              marginBottom: "0.3em"
            }}>
              Mental Health <span style={{fontWeight: 400, opacity: 0.7}}>Problems.</span>
            </h1>
            <p style={{
              fontSize: "1.15rem",
              color: "#26384a",
              margin: "18px 0 32px 0"
            }}>
              At MindBridge, we're here to help you navigate the complexities of mental health. Our resources and support are designed to empower you on your journey to well-being, providing understanding and practical solutions for mental health challenges.
            </p>
            <button style={{
              padding: "12px 44px",
              borderRadius: "24px",
              border: "2px solid #b6d6f0",
              background: "transparent",
              color: "#2e466e",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(24,60,87,0.07)"
            }}>
              Learn more.
            </button>
          </div>
          <img
            src="/mental-health-illustration.png"
            alt="Mental Health Illustration"
            style={{
              maxWidth: 410,
              width: "100%",
              borderRadius: "12px"
            }}
          />
        </div>
      </section>

      {/* Feedback Section */}
      <section id="feedback" style={{
        minHeight: "40vh",
        background: "#fff",
        padding: "70px 0 60px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <h2 style={{
          fontSize: "2rem",
          fontWeight: 700,
          color: "#183C57",
          marginBottom: "1.5rem"
        }}>We'd love your feedback!</h2>
        <p style={{
          fontSize: "1.15rem",
          color: "#444",
          maxWidth: 500,
          textAlign: "center"
        }}>
          Help us improve MindBridge. Share your suggestions, bug reports, or just say hello!
        </p>
        <a
          href="mailto:feedback@mindbridge.com"
          style={{
            marginTop: "28px",
            background: "#183C57",
            color: "#fff",
            padding: "0.7rem 2rem",
            borderRadius: "14px",
            fontWeight: 500,
            fontSize: "1rem",
            textDecoration: "none"
          }}
        >
          Send Feedback
        </a>
      </section>
    </div>
  );
}

// Feature card component
function FeatureCard({ title, desc, img, href }) {
  return (
    <a href={href} style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: "#fff",
      borderRadius: "1.2rem",
      boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
      padding: "2rem 2.2rem",
      minWidth: "230px",
      maxWidth: "270px",
      textDecoration: "none",
      color: "#222",
      transition: "box-shadow 0.2s, transform 0.2s",
      border: "1px solid #e5e7eb"
    }}>
      {img && (
        <img src={img} alt={title} style={{ width: 54, height: 54, marginBottom: 18 }} />
      )}
      <h3 style={{
        fontSize: "1.15rem",
        fontWeight: 600,
        color: "#1da47d",
        marginBottom: ".6rem"
      }}>{title}</h3>
      <p style={{
        color: "#555",
        fontSize: "1.01rem",
        marginBottom: 0,
        textAlign: "center"
      }}>{desc}</p>
    </a>
  );
}
