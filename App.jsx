import { useState } from "react";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const navigation = [
    { id: "dashboard", icon: "⌂", label: "Dashboard" },
    { id: "symptoms", icon: "🩺", label: "Symptom AI" },
    { id: "skin", icon: "🧴", label: "Skin AI" },
    { id: "medicine", icon: "💊", label: "Medicine" },
    { id: "history", icon: "◷", label: "History" },
  ];

  const renderPage = () => {
    switch (activePage) {
      case "symptoms":
        return <SymptomPage />;
      case "skin":
        return <SkinPage />;
      case "medicine":
        return <MedicinePage />;
      case "history":
        return <HistoryPage />;
      default:
        return <Dashboard setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">✦</div>
          <div>
            <h2>
              Health<span>AI</span>
            </h2>
            <p>Patient Assistant</p>
          </div>
        </div>

        <div className="nav-title">MAIN MENU</div>

        <nav>
          {navigation.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${
                activePage === item.id ? "active" : ""
              }`}
              onClick={() => setActivePage(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon">?</div>
            <div>
              <strong>Need help?</strong>
              <p>Explore the health assistant</p>
            </div>
          </div>

          <div className="sidebar-user">
            <div className="avatar">A</div>
            <div>
              <strong>Patient</strong>
              <span>Health profile</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="mobile-brand">
            <div className="brand-icon">✦</div>
            <strong>
              Health<span>AI</span>
            </strong>
          </div>

          <div className="topbar-right">
            <button className="notification-btn">
              ♧
              <span></span>
            </button>

            <div className="profile-mini">
              <div className="avatar small">A</div>
              <div>
                <strong>Patient</strong>
                <span>My Account</span>
              </div>
            </div>
          </div>
        </header>

        <div className="page-container">{renderPage()}</div>

        <footer className="disclaimer">
          <span>⚠</span>
          <p>
            HealthAI provides information and reminder support only.
            It is not a medical diagnosis system. Always consult a
            qualified healthcare professional for medical decisions.
          </p>
        </footer>
      </main>
    </div>
  );
}

function Dashboard({ setActivePage }) {
  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <div className="eyebrow">
            <span></span>
            AI-POWERED HEALTH ASSISTANT
          </div>

          <h1>
            Understand your health.
            <br />
            <span>Take action earlier.</span>
          </h1>

          <p>
            A smart health support platform for symptom-based
            disease prediction, skin analysis and medicine reminders.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => setActivePage("symptoms")}
            >
              Start Health Assessment
              <span>→</span>
            </button>

            <button
              className="secondary-btn"
              onClick={() => setActivePage("medicine")}
            >
              Set Medicine Reminder
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="orb orb-one"></div>
          <div className="orb orb-two"></div>

          <div className="health-core">
            <div className="core-ring">
              <span>✦</span>
            </div>
            <strong>AI</strong>
            <small>Health Assistant</small>
          </div>

          <div className="floating-card card-one">
            <span>🩺</span>
            <div>
              <strong>Symptom AI</strong>
              <small>Early identification</small>
            </div>
          </div>

          <div className="floating-card card-two">
            <span>🧴</span>
            <div>
              <strong>Skin Analysis</strong>
              <small>Image based analysis</small>
            </div>
          </div>

          <div className="floating-card card-three">
            <span>💊</span>
            <div>
              <strong>Medicine</strong>
              <small>Smart reminders</small>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="section-label">HEALTH TOOLS</span>
            <h2>Your health assistant</h2>
          </div>
          <p>Choose a tool to get started.</p>
        </div>

        <div className="module-grid">
          <ModuleCard
            icon="🩺"
            title="Symptom Disease AI"
            description="Describe your symptoms naturally and get a preliminary list of possible diseases."
            tag="AI PREDICTION"
            onClick={() => setActivePage("symptoms")}
          />

          <ModuleCard
            icon="🧴"
            title="Skin Disease AI"
            description="Upload a skin image and let the trained image model analyze the visible condition."
            tag="IMAGE ANALYSIS"
            onClick={() => setActivePage("skin")}
          />

          <ModuleCard
            icon="💊"
            title="Smart Medicine"
            description="Create prescription-based schedules and receive medicine reminders at the right time."
            tag="REMINDER"
            onClick={() => setActivePage("medicine")}
          />
        </div>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">✦</div>
          <div>
            <strong>3</strong>
            <span>Health modules</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">✓</div>
          <div>
            <strong>AI</strong>
            <span>Assisted analysis</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">◷</div>
          <div>
            <strong>24/7</strong>
            <span>Reminder support</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">!</div>
          <div>
            <strong>Safe</strong>
            <span>Support-focused design</span>
          </div>
        </div>
      </section>
    </div>
  );
}

function ModuleCard({
  icon,
  title,
  description,
  tag,
  onClick,
}) {
  return (
    <button className="module-card" onClick={onClick}>
      <div className="module-top">
        <div className="module-icon">{icon}</div>
        <span className="module-tag">{tag}</span>
      </div>

      <h3>{title}</h3>
      <p>{description}</p>

      <div className="module-link">
        Open module
        <span>→</span>
      </div>
    </button>
  );
}

function SymptomPage() {
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const analyzeSymptoms = async () => {
    setError("");
    setResult(null);

    if (!symptoms.trim()) {
      setError(
        "Please describe at least one symptom before analyzing."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/symptom/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            symptoms: symptoms.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.message ||
            "Unable to analyze the symptoms."
        );
        return;
      }

      setResult(data);
    } catch (error) {
      console.error("Backend connection error:", error);

      setError(
        "Cannot connect to the HealthAI backend. " +
          "Please make sure the Python backend is running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  };

  const clearAnalysis = () => {
    setSymptoms("");
    setResult(null);
    setError("");
  };

  return (
    <div className="module-page">
      <PageHeader
        eyebrow="SYMPTOM ANALYSIS"
        title="Symptom Disease AI"
        description="Describe what you are experiencing in your own words."
        icon="🩺"
      />

      <div className="analysis-layout">
        <div className="analysis-card large">
          <label>Describe your symptoms</label>

          <textarea
            value={symptoms}
            onChange={(event) =>
              setSymptoms(event.target.value)
            }
            placeholder="Example: I have fever, headache and feel very tired..."
          ></textarea>

          <div className="input-hint">
            <span>✦</span>
            The AI will semantically match your description
            with the available symptom dataset.
          </div>

          {error && (
            <div className="medical-note">
              <span>⚠</span>
              <div>
                <strong>Analysis message</strong>
                <p>{error}</p>
              </div>
            </div>
          )}

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "18px",
              flexWrap: "wrap",
            }}
          >
            <button
              className="primary-btn full"
              onClick={analyzeSymptoms}
              disabled={loading}
              style={{
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "wait" : "pointer",
              }}
            >
              {loading
                ? "Analyzing Symptoms..."
                : "Analyze Symptoms →"}
            </button>

            {(result || symptoms) && !loading && (
              <button
                className="secondary-btn"
                onClick={clearAnalysis}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="info-card">
          <div className="info-icon">✦</div>

          <h3>How it works</h3>

          <div className="step">
            <span>01</span>
            <p>Describe your symptoms naturally.</p>
          </div>

          <div className="step">
            <span>02</span>
            <p>
              AI matches the description with the
              symptom dataset.
            </p>
          </div>

          <div className="step">
            <span>03</span>
            <p>
              Possible diseases are displayed with
              simple explanations.
            </p>
          </div>
        </div>
      </div>

      {result?.matched_symptoms?.length > 0 && (
        <div className="analysis-card result-card">
          <div className="card-heading">
            <span>✓</span>
            <div>
              <h3>Matched symptoms</h3>
              <p>
                Symptoms recognized from your description.
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "18px",
            }}
          >
            {result.matched_symptoms.map(
              (symptom, index) => (
                <span
                  key={`${symptom}-${index}`}
                  style={{
                    padding: "9px 14px",
                    borderRadius: "20px",
                    background: "#eef6ff",
                    color: "#1769aa",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {symptom}
                </span>
              )
            )}
          </div>
        </div>
      )}

      {result?.possible_diseases?.length > 0 && (
        <section style={{ marginTop: "24px" }}>
          <div className="section-heading">
            <div>
              <span className="section-label">
                AI RESULT
              </span>
              <h2>Possible conditions</h2>
            </div>

            <p>
              Preliminary information based on the
              reported symptoms.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "18px",
              marginTop: "18px",
            }}
          >
            {result.possible_diseases.map(
              (item, index) => (
                <div
                  key={`${item.disease}-${index}`}
                  className="analysis-card"
                  style={{ position: "relative" }}
                >
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: "700",
                      color: "#6b7c93",
                      marginBottom: "10px",
                    }}
                  >
                    POSSIBLE CONDITION {index + 1}
                  </div>

                  <h3
                    style={{
                      marginBottom: "6px",
                      fontSize: "20px",
                    }}
                  >
                    {item.disease}
                  </h3>

                  <p
                    style={{
                      marginBottom: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {item.medical_name}
                  </p>

                  <p>{item.explanation}</p>
                </div>
              )
            )}
          </div>
        </section>
      )}

      <div className="medical-note">
        <span>⚠</span>
        <div>
          <strong>Important</strong>
          <p>
            This tool provides preliminary information
            for early identification. It is not a medical
            diagnosis. Please consult a qualified healthcare
            professional for medical decisions.
          </p>
        </div>
      </div>
    </div>
  );
}

function SkinPage() {
  return (
    <div className="module-page">
      <PageHeader
        eyebrow="IMAGE ANALYSIS"
        title="Skin Disease AI"
        description="Upload a skin image for AI-assisted classification."
        icon="🧴"
      />

      <div className="skin-layout">
        <div className="upload-card">
          <div className="upload-icon">↑</div>

          <h3>Upload skin image</h3>

          <p>
            Drag and drop an image here or choose a file
            from your device.
          </p>

          <button className="secondary-btn">
            Choose Image
          </button>

          <small>Supported: JPG, JPEG, PNG</small>
        </div>

        <div className="classes-card">
          <h3>Supported conditions</h3>

          <div className="condition-list">
            <div>
              <span>01</span>
              <strong>Acne</strong>
            </div>

            <div>
              <span>02</span>
              <strong>Hairloss</strong>
            </div>

            <div>
              <span>03</span>
              <strong>Nail Fungus</strong>
            </div>

            <div>
              <span>04</span>
              <strong>Normal</strong>
            </div>

            <div>
              <span>05</span>
              <strong>Skin Allergy</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="medical-note">
        <span>⚠</span>
        <div>
          <strong>Important</strong>
          <p>
            Image classification is for informational
            support only. It does not replace professional
            medical evaluation.
          </p>
        </div>
      </div>
    </div>
  );
}

function MedicinePage() {
  return (
    <div className="module-page">
      <PageHeader
        eyebrow="MEDICATION SUPPORT"
        title="Smart Medicine Reminder"
        description="Create reminders based on your doctor's prescription."
        icon="💊"
      />

      <div className="medicine-grid">
        <div className="analysis-card">
          <div className="card-heading">
            <span>01</span>
            <div>
              <h3>Patient details</h3>
              <p>Basic patient information</p>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Patient name</label>
              <input placeholder="Enter name" />
            </div>

            <div className="form-group">
              <label>Age</label>
              <input placeholder="Age" />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select>
                <option>Select gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Contact</label>
              <input placeholder="Contact number" />
            </div>
          </div>
        </div>

        <div className="analysis-card">
          <div className="card-heading">
            <span>02</span>
            <div>
              <h3>Medicine details</h3>
              <p>Enter the prescribed medicine</p>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Medicine name</label>
              <input placeholder="Medicine name" />
            </div>

            <div className="form-group">
              <label>Dose</label>
              <input placeholder="As prescribed" />
            </div>

            <div className="form-group full-field">
              <label>Why prescribed?</label>
              <input placeholder="Optional" />
            </div>
          </div>
        </div>

        <div className="analysis-card schedule-card">
          <div className="card-heading">
            <span>03</span>
            <div>
              <h3>Medicine schedule</h3>
              <p>Choose your prescribed times</p>
            </div>
          </div>

          <div className="schedule-options">
            <button>
              ☀️
              <strong>Morning</strong>
              <small>08:00 AM</small>
            </button>

            <button>
              🌤️
              <strong>Afternoon</strong>
              <small>01:00 PM</small>
            </button>

            <button>
              🌙
              <strong>Night</strong>
              <small>08:00 PM</small>
            </button>
          </div>

          <button className="primary-btn full">
            Save Prescription →
          </button>
        </div>
      </div>
    </div>
  );
}

function HistoryPage() {
  return (
    <div className="module-page">
      <PageHeader
        eyebrow="ACTIVITY"
        title="Reminder History"
        description="View your previous medicine reminder activity."
        icon="◷"
      />

      <div className="empty-history">
        <div className="empty-icon">◷</div>

        <h3>No reminder history yet</h3>

        <p>
          Your medicine reminder activity will appear here
          after you start using the reminder system.
        </p>
      </div>
    </div>
  );
}

function PageHeader({
  eyebrow,
  title,
  description,
  icon,
}) {
  return (
    <div className="page-header">
      <div className="page-header-icon">{icon}</div>

      <div>
        <span>{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default App;