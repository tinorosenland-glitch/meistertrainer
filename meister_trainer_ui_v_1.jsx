const { useState } = React;

function App() {
  const [seite, setSeite] = useState("dashboard");

  const pruefungen = [
    { hf: "HF1", titel: "Auftragsabwicklung", datum: "07.07." },
    { hf: "HF2", titel: "Elektro- und Sicherheitstechnik", datum: "08.07." },
    { hf: "HF3", titel: "Betriebsführung / Organisation", datum: "09.07." },
  ];

  const dateien = [
    { hf: "HF1", jahr: "2011 Sommer", aufgaben: 5 },
    { hf: "HF1", jahr: "2012 Frühjahr", aufgaben: 5 },
    { hf: "HF2", jahr: "2011 Sommer", aufgaben: 8 },
    { hf: "HF3", jahr: "2011 Sommer", aufgaben: 8 },
  ];

  const aufgaben = [
    "HF1 · 2011 Sommer · Aufgabe 1",
    "HF1 · 2011 Sommer · Aufgabe 2",
    "HF2 · 2011 Sommer · Aufgabe 1",
    "HF3 · 2011 Sommer · Aufgabe 2",
  ];

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#f5f5f5",
      color: "#111827",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "24px",
      display: "grid",
      gridTemplateColumns: "260px 1fr",
      gap: "24px",
    },
    sidebar: {
      background: "#ffffff",
      border: "1px solid #e5e7eb",
      borderRadius: "24px",
      padding: "20px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      height: "fit-content",
      position: "sticky",
      top: "24px",
    },
    title: {
      fontSize: "28px",
      fontWeight: "700",
      marginBottom: "6px",
    },
    sub: {
      color: "#6b7280",
      fontSize: "14px",
      marginBottom: "20px",
    },
    navButton: (active) => ({
      width: "100%",
      textAlign: "left",
      padding: "12px 14px",
      marginBottom: "8px",
      borderRadius: "16px",
      border: active ? "1px solid #111827" : "1px solid #e5e7eb",
      background: active ? "#111827" : "#ffffff",
      color: active ? "#ffffff" : "#111827",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
    }),
    main: {
      display: "flex",
      flexDirection: "column",
      gap: "24px",
    },
    sectionTitle: {
      fontSize: "28px",
      fontWeight: "700",
      margin: 0,
    },
    sectionSub: {
      color: "#6b7280",
      marginTop: "8px",
      marginBottom: 0,
    },
    grid3: {
      display: "grid",
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      gap: "16px",
    },
    grid2: {
      display: "grid",
      gridTemplateColumns: "1.2fr 0.8fr",
      gap: "16px",
    },
    card: {
      background: "#ffffff",
      border: "1px solid #e5e7eb",
      borderRadius: "24px",
      padding: "20px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    },
    cardTitle: {
      fontSize: "16px",
      fontWeight: "700",
      marginBottom: "6px",
    },
    cardSub: {
      fontSize: "14px",
      color: "#6b7280",
      marginBottom: "16px",
    },
    statBig: {
      fontSize: "34px",
      fontWeight: "700",
    },
    smallText: {
      fontSize: "14px",
      color: "#6b7280",
      marginTop: "8px",
    },
    itemButton: {
      width: "100%",
      textAlign: "left",
      padding: "14px",
      border: "1px solid #e5e7eb",
      borderRadius: "16px",
      background: "#ffffff",
      cursor: "pointer",
      marginBottom: "10px",
      fontSize: "14px",
    },
    quickButton: {
      width: "100%",
      padding: "12px 14px",
      borderRadius: "16px",
      border: "1px solid #111827",
      background: "#111827",
      color: "#ffffff",
      cursor: "pointer",
      fontWeight: "600",
      marginBottom: "10px",
    },
    outlineButton: {
      width: "100%",
      padding: "12px 14px",
      borderRadius: "16px",
      border: "1px solid #d1d5db",
      background: "#ffffff",
      color: "#111827",
      cursor: "pointer",
      fontWeight: "600",
    },
    fileGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      gap: "12px",
    },
    fileCard: {
      border: "1px solid #e5e7eb",
      borderRadius: "18px",
      padding: "14px",
      background: "#ffffff",
    },
    hfLabel: {
      fontSize: "12px",
      color: "#6b7280",
      marginBottom: "6px",
    },
    fileTitle: {
      fontSize: "15px",
      fontWeight: "700",
      marginBottom: "6px",
    },
    progressWrap: {
      marginBottom: "18px",
    },
    progressRow: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "8px",
      fontSize: "14px",
    },
    progressBar: {
      height: "10px",
      background: "#e5e7eb",
      borderRadius: "999px",
      overflow: "hidden",
    },
    progressFill: (value) => ({
      height: "100%",
      width: `${value}%`,
      background: "#111827",
    }),
  };

  function Dashboard() {
    return (
      <div style={styles.main}>
        <div>
          <h1 style={styles.sectionTitle}>Dashboard</h1>
          <p style={styles.sectionSub}>Heute sehen, was ansteht und wo du stehst.</p>
        </div>

        <div style={styles.grid3}>
          <div style={styles.card}>
            <div style={styles.cardTitle}>Countdown</div>
            <div style={styles.cardSub}>Nächste Prüfung</div>
            <div style={styles.statBig}>HF1 in 115 Tagen</div>
            <div style={styles.smallText}>07.07. · Auftragsabwicklung</div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardTitle}>Heutige Aufgaben</div>
            <div style={styles.cardSub}>Automatisch vorgeschlagen</div>
            <button style={styles.itemButton}>HF1 · 2011 Sommer · Aufgabe 2</button>
            <button style={styles.itemButton}>HF2 · Schutzmaßnahmen wiederholen</button>
          </div>

          <div style={styles.card}>
            <div style={styles.cardTitle}>Schnellstart</div>
            <div style={styles.cardSub}>Direkt loslegen</div>
            <button style={styles.quickButton}>Weiterlernen</button>
            <button style={styles.outlineButton}>Simulation starten</button>
          </div>
        </div>

        <div style={styles.grid2}>
          <div style={styles.card}>
            <div style={styles.cardTitle}>Prüfungsdateien</div>
            <div style={styles.cardSub}>Alle Prüfungen vorbereitet · PDF-ready</div>
            <div style={styles.fileGrid}>
              {dateien.map((d, i) => (
                <div key={i} style={styles.fileCard}>
                  <div style={styles.hfLabel}>{d.hf}</div>
                  <div style={styles.fileTitle}>{d.jahr}</div>
                  <div style={styles.smallText}>{d.aufgaben} Aufgaben</div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardTitle}>Aufgaben-Schnellzugriff</div>
            <div style={styles.cardSub}>Direkt einzelne Aufgaben öffnen</div>
            {aufgaben.map((a, i) => (
              <button key={i} style={styles.itemButton}>{a}</button>
            ))}
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}>HF-Fortschritt</div>
          <div style={styles.cardSub}>Dein aktueller Stand für Teil 2</div>

          <div style={styles.progressWrap}>
            <div style={styles.progressRow}>
              <span>HF1 · Auftragsabwicklung</span>
              <span>62%</span>
            </div>
            <div style={styles.progressBar}>
              <div style={styles.progressFill(62)}></div>
            </div>
          </div>

          <div style={styles.progressWrap}>
            <div style={styles.progressRow}>
              <span>HF2 · Elektro- und Sicherheitstechnik</span>
              <span>38%</span>
            </div>
            <div style={styles.progressBar}>
              <div style={styles.progressFill(38)}></div>
            </div>
          </div>

          <div style={styles.progressWrap}>
            <div style={styles.progressRow}>
              <span>HF3 · Betriebsführung / Organisation</span>
              <span>21%</span>
            </div>
            <div style={styles.progressBar}>
              <div style={styles.progressFill(21)}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <aside style={styles.sidebar}>
          <div style={styles.title}>MeisterTrainer</div>
          <div style={styles.sub}>Teil 2 · PC, iPhone, iPad</div>

          <button style={styles.navButton(seite === "dashboard")} onClick={() => setSeite("dashboard")}>
            Dashboard
          </button>
          <button style={styles.navButton(seite === "lernplan")} onClick={() => setSeite("lernplan")}>
            Lernplan
          </button>
          <button style={styles.navButton(seite === "pruefungen")} onClick={() => setSeite("pruefungen")}>
            Prüfungen
          </button>
          <button style={styles.navButton(seite === "simulation")} onClick={() => setSeite("simulation")}>
            Simulation
          </button>
          <button style={styles.navButton(seite === "fortschritt")} onClick={() => setSeite("fortschritt")}>
            Fortschritt
          </button>
          <button style={styles.navButton(seite === "kalender")} onClick={() => setSeite("kalender")}>
            Kalender
          </button>
        </aside>

        <main>
          {seite === "dashboard" ? (
            <Dashboard />
          ) : (
            <div style={styles.card}>
              <div style={styles.cardTitle}>Diese Seite kommt als Nächstes</div>
              <div style={styles.cardSub}>Erst bringen wir das Dashboard sauber online.</div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
