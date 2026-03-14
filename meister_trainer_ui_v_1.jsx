const { useEffect, useMemo, useState } = React;

const EXAMS = [
  { id: "hf1", label: "HF1", title: "Auftragsabwicklung", date: "07.07." },
  { id: "hf2", label: "HF2", title: "Elektro- und Sicherheitstechnik", date: "08.07." },
  { id: "hf3", label: "HF3", title: "Betriebsführung / Organisation", date: "09.07." }
];

const HF1_2011_TASKS = [
  { name: "Aufgabe 1", topic: "Vorbereitung", pageStart: 7, pageEnd: 7 },
  { name: "Aufgabe 2", topic: "Mitarbeiter-Kapazität", pageStart: 7, pageEnd: 8 },
  { name: "Aufgabe 3", topic: "Abschlagszahlung", pageStart: 9, pageEnd: 9 },
  { name: "Aufgabe 4", topic: "Nachkalkulation", pageStart: 10, pageEnd: 10 },
  { name: "Aufgabe 5", topic: "Schlussabwicklung", pageStart: 10, pageEnd: 10 }
];

const examLibrary = {
  hf1: {
    label: "HF1",
    title: "Auftragsabwicklung",
    exams: [
      {
        year: "2011 Sommer",
        fileName: "Teil-2_AA_Prüfung_2011-Sommer.pdf",
        pdfPath: "./pdfs/hf1/Teil-2_AA_Prüfung_2011-Sommer.pdf",
        tasks: HF1_2011_TASKS
      }
    ]
  },
  hf2: {
    label: "HF2",
    title: "Elektro- und Sicherheitstechnik",
    exams: []
  },
  hf3: {
    label: "HF3",
    title: "Betriebsführung / Organisation",
    exams: []
  }
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f3f4f6",
    color: "#111827"
  },
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "24px",
    display: "grid",
    gridTemplateColumns: "260px 1fr",
    gap: "24px"
  },
  sidebar: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "24px",
    padding: "20px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    height: "fit-content",
    position: "sticky",
    top: "24px"
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "6px"
  },
  sub: {
    color: "#6b7280",
    fontSize: "14px",
    marginBottom: "20px"
  },
  navButton: function(active) {
    return {
      width: "100%",
      textAlign: "left",
      padding: "12px 14px",
      marginBottom: "8px",
      borderRadius: "16px",
      border: active ? "1px solid #111827" : "1px solid #d1d5db",
      background: active ? "#111827" : "#ffffff",
      color: active ? "#ffffff" : "#111827",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600"
    };
  },
  main: {
    display: "flex",
    flexDirection: "column",
    gap: "24px"
  },
  sectionTitle: {
    fontSize: "28px",
    fontWeight: "700",
    margin: 0
  },
  sectionSub: {
    color: "#6b7280",
    marginTop: "8px",
    marginBottom: 0
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "16px"
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "1.2fr 0.8fr",
    gap: "16px"
  },
  card: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "24px",
    padding: "20px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "6px"
  },
  cardSub: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "16px"
  },
  statBig: {
    fontSize: "34px",
    fontWeight: "700"
  },
  smallText: {
    fontSize: "14px",
    color: "#6b7280",
    marginTop: "8px"
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
    fontSize: "14px"
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
    marginBottom: "10px"
  },
  outlineButton: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "16px",
    border: "1px solid #d1d5db",
    background: "#ffffff",
    color: "#111827",
    cursor: "pointer",
    fontWeight: "600"
  },
  fileGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "12px"
  },
  fileCard: {
    border: "1px solid #e5e7eb",
    borderRadius: "18px",
    padding: "14px",
    background: "#ffffff",
    cursor: "pointer"
  },
  hfLabel: {
    fontSize: "12px",
    color: "#6b7280",
    marginBottom: "6px"
  },
  fileTitle: {
    fontSize: "15px",
    fontWeight: "700",
    marginBottom: "6px"
  },
  progressWrap: {
    marginBottom: "18px"
  },
  progressRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
    fontSize: "14px"
  },
  progressBar: {
    height: "10px",
    background: "#e5e7eb",
    borderRadius: "999px",
    overflow: "hidden"
  },
  progressFill: function(value) {
    return {
      height: "100%",
      width: value + "%",
      background: "#111827"
    };
  },
  tag: {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    background: "#eef2ff",
    color: "#3730a3",
    marginRight: "8px"
  },
  actionRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  },
  textarea: {
    width: "100%",
    minHeight: "140px",
    padding: "14px",
    borderRadius: "16px",
    border: "1px solid #d1d5db",
    fontFamily: "Arial, sans-serif",
    fontSize: "14px"
  },
  iframe: {
    width: "100%",
    height: "720px",
    border: "1px solid #e5e7eb",
    borderRadius: "18px",
    background: "#ffffff"
  }
};

function formatPageRange(task) {
  if (!task) return "Wird ergänzt";
  if (task.pageStart === task.pageEnd) return "Seite " + task.pageStart;
  return "Seite " + task.pageStart + "–" + task.pageEnd;
}

function taskKey(hfId, examYear, taskName) {
  return hfId + "__" + examYear + "__" + taskName;
}

function App() {
  const [seite, setSeite] = useState("dashboard");
  const [selectedHF, setSelectedHF] = useState("hf1");
  const [selectedExamYear, setSelectedExamYear] = useState("2011 Sommer");
  const [selectedTask, setSelectedTask] = useState("Aufgabe 1");
  const [taskStates, setTaskStates] = useState({});

  useEffect(function() {
    const saved = localStorage.getItem("meistertrainer-taskstates-v1");
    if (saved) {
      try {
        setTaskStates(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  useEffect(function() {
    localStorage.setItem("meistertrainer-taskstates-v1", JSON.stringify(taskStates));
  }, [taskStates]);

  const currentExamEntry = examLibrary[selectedHF].exams[0];
  const currentTaskMeta = currentExamEntry.tasks.find(function(task) {
    return task.name === selectedTask;
  }) || currentExamEntry.tasks[0];

  const currentPdfUrl = currentExamEntry.pdfPath + "#page=" + currentTaskMeta.pageStart + "&view=FitH";
  const currentStateKey = taskKey(selectedHF, selectedExamYear, selectedTask);
  const currentTaskState = taskStates[currentStateKey] || { done: false, difficult: false, notes: "" };

  const progress = useMemo(function() {
    const allTasks = currentExamEntry.tasks.map(function(task) {
      return taskKey("hf1", "2011 Sommer", task.name);
    });
    const doneCount = allTasks.filter(function(key) {
      return taskStates[key] && taskStates[key].done;
    }).length;
    const hf1Progress = allTasks.length ? Math.round(doneCount / allTasks.length * 100) : 0;
    return { hf1: hf1Progress, hf2: 0, hf3: 0 };
  }, [taskStates, currentExamEntry.tasks]);

  function openTask(taskName) {
    setSelectedHF("hf1");
    setSelectedExamYear("2011 Sommer");
    setSelectedTask(taskName);
    setSeite("aufgabe");
  }

  function setTaskValue(patch) {
    setTaskStates(function(prev) {
      const next = Object.assign({}, prev);
      next[currentStateKey] = Object.assign(
        { done: false, difficult: false, notes: "" },
        prev[currentStateKey] || {},
        patch
      );
      return next;
    });
  }

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
            <div style={styles.statBig}>HF1 am 07.07.</div>
            <div style={styles.smallText}>HF2 am 08.07. · HF3 am 09.07.</div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardTitle}>Heutige Aufgaben</div>
            <div style={styles.cardSub}>Automatisch vorgeschlagen</div>
            <button style={styles.itemButton} onClick={function() { openTask("Aufgabe 2"); }}>
              HF1 · 2011 Sommer · Aufgabe 2
            </button>
            <button style={styles.itemButton} onClick={function() { openTask("Aufgabe 1"); }}>
              HF1 · 2011 Sommer · Aufgabe 1
            </button>
          </div>

          <div style={styles.card}>
            <div style={styles.cardTitle}>Schnellstart</div>
            <div style={styles.cardSub}>Direkt loslegen</div>
            <button style={styles.quickButton} onClick={function() { setSeite("pruefungen"); }}>
              Weiterlernen
            </button>
            <button style={styles.outlineButton} onClick={function() { setSeite("simulation"); }}>
              Simulation starten
            </button>
          </div>
        </div>

        <div style={styles.grid2}>
          <div style={styles.card}>
            <div style={styles.cardTitle}>Prüfungsdateien</div>
            <div style={styles.cardSub}>Erste Prüfung anklickbar</div>
            <div style={styles.fileGrid}>
              <div style={styles.fileCard} onClick={function() { setSeite("pruefungen"); }}>
                <div style={styles.hfLabel}>HF1</div>
                <div style={styles.fileTitle}>2011 Sommer</div>
                <div style={styles.smallText}>5 Aufgaben</div>
              </div>
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardTitle}>Aufgaben-Schnellzugriff</div>
            <div style={styles.cardSub}>Direkt einzelne Aufgaben öffnen</div>
            {currentExamEntry.tasks.map(function(task) {
              return (
                <button key={task.name} style={styles.itemButton} onClick={function() { openTask(task.name); }}>
                  HF1 · 2011 Sommer · {task.name}
                </button>
              );
            })}
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}>HF-Fortschritt</div>
          <div style={styles.cardSub}>Wird automatisch aus erledigten Aufgaben berechnet</div>

          <div style={styles.progressWrap}>
            <div style={styles.progressRow}>
              <span>HF1 · Auftragsabwicklung</span>
              <span>{progress.hf1}%</span>
            </div>
            <div style={styles.progressBar}>
              <div style={styles.progressFill(progress.hf1)}></div>
            </div>
          </div>

          <div style={styles.progressWrap}>
            <div style={styles.progressRow}>
              <span>HF2 · Elektro- und Sicherheitstechnik</span>
              <span>0%</span>
            </div>
            <div style={styles.progressBar}>
              <div style={styles.progressFill(0)}></div>
            </div>
          </div>

          <div style={styles.progressWrap}>
            <div style={styles.progressRow}>
              <span>HF3 · Betriebsführung / Organisation</span>
              <span>0%</span>
            </div>
            <div style={styles.progressBar}>
              <div style={styles.progressFill(0)}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function Pruefungen() {
    return (
      <div style={styles.main}>
        <div>
          <h1 style={styles.sectionTitle}>Prüfungen</h1>
          <p style={styles.sectionSub}>Aufgabe anklicken und PDF öffnen.</p>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}>HF1 · 2011 Sommer</div>
          <div style={styles.cardSub}>{currentExamEntry.fileName}</div>

          {currentExamEntry.tasks.map(function(task) {
            return (
              <button
                key={task.name}
                style={styles.itemButton}
                onClick={function() {
                  setSelectedTask(task.name);
                  setSeite("aufgabe");
                }}
              >
                {task.name} · {task.topic} · {formatPageRange(task)}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  function Aufgabe() {
    return (
      <div style={styles.main}>
        <div>
          <h1 style={styles.sectionTitle}>Einzelaufgabe</h1>
          <p style={styles.sectionSub}>Original-PDF, Notizen und Lernstatus.</p>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}>HF1 · 2011 Sommer · {selectedTask}</div>
          <div style={styles.cardSub}>{currentTaskMeta.topic} · {formatPageRange(currentTaskMeta)}</div>

          <div style={{ marginBottom: "16px" }}>
            <span style={styles.tag}>{currentExamEntry.fileName}</span>
            {currentTaskState.done ? <span style={styles.tag}>Erledigt</span> : null}
            {currentTaskState.difficult ? (
              <span style={{ ...styles.tag, background: "#fef2f2", color: "#991b1b" }}>Schwierig</span>
            ) : null}
          </div>

          <div style={{ marginBottom: "16px" }}>
            <iframe
              src={currentPdfUrl}
              title={"pdf-" + selectedTask}
              style={styles.iframe}
            />
          </div>

          <div style={{ marginBottom: "12px", fontWeight: "700" }}>Meine Notizen</div>
          <textarea
            style={styles.textarea}
            value={currentTaskState.notes}
            onChange={function(e) {
              setTaskValue({ notes: e.target.value });
            }}
            placeholder="Hier kannst du deine Lösung, Merkpunkte oder Fehler notieren."
          />

          <div style={{ ...styles.actionRow, marginTop: "16px" }}>
            <button
              style={styles.quickButton}
              onClick={function() {
                setTaskValue({ done: !currentTaskState.done });
              }}
            >
              {currentTaskState.done ? "Als offen markieren" : "Als erledigt markieren"}
            </button>

            <button
              style={styles.outlineButton}
              onClick={function() {
                setTaskValue({ difficult: !currentTaskState.difficult });
              }}
            >
              {currentTaskState.difficult ? "Nicht mehr schwierig" : "Als schwierig markieren"}
            </button>

            <button style={styles.outlineButton} onClick={function() { setSeite("pruefungen"); }}>
              Zurück zu Prüfungen
            </button>
          </div>
        </div>
      </div>
    );
  }

  function Lernplan() {
    return (
      <div style={styles.main}>
        <div>
          <h1 style={styles.sectionTitle}>Lernplan</h1>
          <p style={styles.sectionSub}>Kommt als Nächstes nach dem PDF-Check.</p>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Nächster Ausbauschritt</div>
          <div style={styles.cardSub}>Erst prüfen wir jetzt, dass Prüfungen und PDF sauber laufen.</div>
        </div>
      </div>
    );
  }

  function Simulation() {
    return (
      <div style={styles.main}>
        <div>
          <h1 style={styles.sectionTitle}>Simulation</h1>
          <p style={styles.sectionSub}>Erste Basis nach dem PDF-Check.</p>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Simulation folgt</div>
          <div style={styles.cardSub}>Zuerst bringen wir Prüfungen, Bearbeitung und Fortschritt stabil online.</div>
        </div>
      </div>
    );
  }

  function Fortschritt() {
    return (
      <div style={styles.main}>
        <div>
          <h1 style={styles.sectionTitle}>Fortschritt</h1>
          <p style={styles.sectionSub}>Aus erledigten Aufgaben berechnet.</p>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}>HF1 Fortschritt</div>
          <div style={styles.cardSub}>{progress.hf1}% abgeschlossen</div>
          <div style={styles.progressBar}>
            <div style={styles.progressFill(progress.hf1)}></div>
          </div>
        </div>
      </div>
    );
  }

  function Kalender() {
    return (
      <div style={styles.main}>
        <div>
          <h1 style={styles.sectionTitle}>Kalender</h1>
          <p style={styles.sectionSub}>Kommt später mit Privat- und Schulkalender.</p>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Geplant</div>
          <div style={styles.cardSub}>Nach Prüfungen und PDF-Einbindung.</div>
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

          <button style={styles.navButton(seite === "dashboard")} onClick={function() { setSeite("dashboard"); }}>Dashboard</button>
          <button style={styles.navButton(seite === "lernplan")} onClick={function() { setSeite("lernplan"); }}>Lernplan</button>
          <button style={styles.navButton(seite === "pruefungen")} onClick={function() { setSeite("pruefungen"); }}>Prüfungen</button>
          <button style={styles.navButton(seite === "simulation")} onClick={function() { setSeite("simulation"); }}>Simulation</button>
          <button style={styles.navButton(seite === "fortschritt")} onClick={function() { setSeite("fortschritt"); }}>Fortschritt</button>
          <button style={styles.navButton(seite === "kalender")} onClick={function() { setSeite("kalender"); }}>Kalender</button>
        </aside>

        <main>
          {seite === "dashboard" ? <Dashboard /> : null}
          {seite === "pruefungen" ? <Pruefungen /> : null}
          {seite === "aufgabe" ? <Aufgabe /> : null}
          {seite === "lernplan" ? <Lernplan /> : null}
          {seite === "simulation" ? <Simulation /> : null}
          {seite === "fortschritt" ? <Fortschritt /> : null}
          {seite === "kalender" ? <Kalender /> : null}
        </main>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
