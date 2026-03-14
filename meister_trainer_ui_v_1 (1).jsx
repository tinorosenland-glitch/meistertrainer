const { useEffect, useMemo, useState } = React;

const EXAMS = [
  { id: "hf1", label: "HF1", title: "Auftragsabwicklung", date: "07.07." },
  { id: "hf2", label: "HF2", title: "Elektro- und Sicherheitstechnik", date: "08.07." },
  { id: "hf3", label: "HF3", title: "Betriebsführung / Organisation", date: "09.07." },
];

const YEAR_LISTS = {
  hf1: ["2011 Sommer", "2012 Frühjahr", "2012 Sommer", "2013 Frühjahr", "2013 Sommer", "2014 Frühjahr", "2014 Sommer", "2015 Frühjahr", "2015 Sommer", "2016 Frühjahr", "2016 Sommer", "2017", "2018"],
  hf2: ["2011 Sommer", "2012 Frühjahr", "2012 Sommer", "2013 Frühjahr", "2014 Frühjahr", "2014 Sommer", "2015 Frühjahr", "2015 Sommer", "2016 Frühjahr", "2016 Sommer", "2017 Frühjahr", "2017 Sommer"],
  hf3: ["2011 Sommer", "2012 Frühjahr", "2012 Sommer", "2013 Frühjahr", "2013 Sommer", "2014 Frühjahr", "2014 Sommer", "2015 Frühjahr", "2015 Sommer", "2016 Frühjahr", "2016 Sommer", "2017 Frühjahr", "2017 Sommer", "2018"],
};

const HF1_2011_TASKS = [
  { name: "Aufgabe 1", topic: "Vorbereitung", pageStart: 7, pageEnd: 7 },
  { name: "Aufgabe 2", topic: "Mitarbeiter-Kapazität", pageStart: 7, pageEnd: 8 },
  { name: "Aufgabe 3", topic: "Abschlagszahlung", pageStart: 9, pageEnd: 9 },
  { name: "Aufgabe 4", topic: "Nachkalkulation", pageStart: 10, pageEnd: 10 },
  { name: "Aufgabe 5", topic: "Schlussabwicklung", pageStart: 10, pageEnd: 10 },
];

const HF2_2011_TASKS = [
  { name: "Aufgabe 1", topic: "Schutzmaßnahmen", pageStart: 2, pageEnd: 3 },
  { name: "Aufgabe 2", topic: "Installationstechnik", pageStart: 4, pageEnd: 4 },
  { name: "Aufgabe 3", topic: "Photovoltaik", pageStart: 5, pageEnd: 5 },
  { name: "Aufgabe 4", topic: "Kindergarten Provisorium", pageStart: 6, pageEnd: 8 },
  { name: "Aufgabe 5", topic: "Transformatoren", pageStart: 9, pageEnd: 9 },
  { name: "Aufgabe 6", topic: "Elektrischer Unfall", pageStart: 10, pageEnd: 11 },
  { name: "Aufgabe 7", topic: "Antennentechnik", pageStart: 12, pageEnd: 14 },
  { name: "Aufgabe 8", topic: "Sicherheitstechnik", pageStart: 15, pageEnd: 16 },
];

const HF3_2011_TASKS = [
  { name: "Aufgabe 1", topic: "UG haftungsbeschränkt", pageStart: 2, pageEnd: 2 },
  { name: "Aufgabe 2", topic: "Unternehmensleitbild", pageStart: 3, pageEnd: 3 },
  { name: "Aufgabe 3", topic: "Angebotskalkulation", pageStart: 4, pageEnd: 4 },
  { name: "Aufgabe 4", topic: "Logistik planen", pageStart: 5, pageEnd: 5 },
  { name: "Aufgabe 5", topic: "Abnahme und Beweislast", pageStart: 6, pageEnd: 6 },
  { name: "Aufgabe 6", topic: "Begleichung von Steuerschuld", pageStart: 7, pageEnd: 7 },
  { name: "Aufgabe 7", topic: "Forderungen / Außenstände", pageStart: 8, pageEnd: 8 },
  { name: "Aufgabe 8", topic: "Arbeitssicherheit", pageStart: 9, pageEnd: 9 },
];

function buildGenericTasks(count) {
  return Array.from({ length: count }, (_, index) => ({
    name: `Aufgabe ${index + 1}`,
    topic: `Aufgabenbereich ${index + 1}`,
    pageStart: 1,
    pageEnd: 1,
  }));
}

function buildFileName(prefix, year) {
  return `${prefix}_${year.replace(/ /g, "-")}.pdf`;
}

const examLibrary = {
  hf1: {
    label: "HF1",
    title: "Auftragsabwicklung",
    exams: YEAR_LISTS.hf1.map((year) => ({
      year,
      fileName: buildFileName("Teil-2_AA_Prüfung", year),
      pdfPath: `./pdfs/hf1/${buildFileName("Teil-2_AA_Prüfung", year)}`,
      tasks: year === "2011 Sommer" ? HF1_2011_TASKS : buildGenericTasks(5),
    })),
  },
  hf2: {
    label: "HF2",
    title: "Elektro- und Sicherheitstechnik",
    exams: YEAR_LISTS.hf2.map((year) => ({
      year,
      fileName: buildFileName("Teil-2_ES_Prüfung", year),
      pdfPath: `./pdfs/hf2/${buildFileName("Teil-2_ES_Prüfung", year)}`,
      tasks: year === "2011 Sommer" ? HF2_2011_TASKS : buildGenericTasks(8),
    })),
  },
  hf3: {
    label: "HF3",
    title: "Betriebsführung / Organisation",
    exams: YEAR_LISTS.hf3.map((year) => ({
      year,
      fileName: buildFileName("Teil-2_BB_Prüfung", year),
      pdfPath: `./pdfs/hf3/${buildFileName("Teil-2_BB_Prüfung", year)}`,
      tasks: year === "2011 Sommer" ? HF3_2011_TASKS : buildGenericTasks(8),
    })),
  },
};

const initialPlan = [
  { day: "Montag", task: "HF1 – 2011 Sommer – Aufgabe 2", duration: "60 min" },
  { day: "Dienstag", task: "HF2 – Schutzmaßnahmen", duration: "90 min" },
  { day: "Mittwoch", task: "HF1 – Nachkalkulation", duration: "60 min" },
  { day: "Samstag", task: "Simulation HF2", duration: "240 min" },
];

const styles = {
  page: { minHeight: "100vh", background: "#f3f4f6", color: "#111827" },
  container: { maxWidth: "1400px", margin: "0 auto", padding: "24px", display: "grid", gridTemplateColumns: "260px 1fr", gap: "24px" },
  sidebar: { background: "#fff", border: "1px solid #e5e7eb", borderRadius: "24px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", height: "fit-content", position: "sticky", top: "24px" },
  title: { fontSize: "28px", fontWeight: 700, marginBottom: 6 },
  sub: { color: "#6b7280", fontSize: 14, marginBottom: 20 },
  navButton: (active) => ({ width: "100%", textAlign: "left", padding: "12px 14px", marginBottom: 8, borderRadius: "16px", border: active ? "1px solid #111827" : "1px solid #d1d5db", background: active ? "#111827" : "#fff", color: active ? "#fff" : "#111827", cursor: "pointer", fontSize: 14, fontWeight: 600 }),
  main: { display: "flex", flexDirection: "column", gap: "24px" },
  sectionTitle: { fontSize: "28px", fontWeight: 700, margin: 0 },
  sectionSub: { color: "#6b7280", marginTop: 8, marginBottom: 0 },
  grid3: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "16px" },
  grid2: { display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "16px" },
  card: { background: "#fff", border: "1px solid #e5e7eb", borderRadius: "24px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" },
  cardTitle: { fontSize: 18, fontWeight: 700, marginBottom: 6 },
  cardSub: { fontSize: 14, color: "#6b7280", marginBottom: 16 },
  statBig: { fontSize: 34, fontWeight: 700 },
  smallText: { fontSize: 14, color: "#6b7280", marginTop: 8 },
  itemButton: { width: "100%", textAlign: "left", padding: "14px", border: "1px solid #e5e7eb", borderRadius: "16px", background: "#fff", cursor: "pointer", marginBottom: 10, fontSize: 14 },
  quickButton: { width: "100%", padding: "12px 14px", borderRadius: "16px", border: "1px solid #111827", background: "#111827", color: "#fff", cursor: "pointer", fontWeight: 600, marginBottom: 10 },
  outlineButton: { width: "100%", padding: "12px 14px", borderRadius: "16px", border: "1px solid #d1d5db", background: "#fff", color: "#111827", cursor: "pointer", fontWeight: 600 },
  fileGrid: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "12px" },
  fileCard: { border: "1px solid #e5e7eb", borderRadius: "18px", padding: "14px", background: "#fff", cursor: "pointer" },
  hfLabel: { fontSize: 12, color: "#6b7280", marginBottom: 6 },
  fileTitle: { fontSize: 15, fontWeight: 700, marginBottom: 6 },
  progressWrap: { marginBottom: 18 },
  progressRow: { display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14 },
  progressBar: { height: 10, background: "#e5e7eb", borderRadius: 999, overflow: "hidden" },
  progressFill: (value) => ({ height: "100%", width: `${value}%`, background: "#111827" }),
  tag: { display: "inline-block", padding: "6px 10px", borderRadius: "999px", fontSize: 12, background: "#eef2ff", color: "#3730a3", marginRight: 8 },
  actionRow: { display: "flex", gap: 10, flexWrap: "wrap" },
  textarea: { width: "100%", minHeight: "140px", padding: 14, borderRadius: 16, border: "1px solid #d1d5db", fontFamily: "Arial, sans-serif", fontSize: 14 },
  iframe: { width: "100%", height: "720px", border: "1px solid #e5e7eb", borderRadius: "18px", background: "#fff" },
  examLayout: { display: "grid", gridTemplateColumns: "320px 1fr", gap: "16px" },
  listWrap: { maxHeight: "520px", overflow: "auto" },
  filterButton: (active) => ({ padding: "10px 12px", borderRadius: "14px", border: active ? "1px solid #111827" : "1px solid #d1d5db", background: active ? "#111827" : "#fff", color: active ? "#fff" : "#111827", cursor: "pointer", fontWeight: 600, marginRight: 8, marginBottom: 8 }),
  infoBox: { border: "1px solid #e5e7eb", borderRadius: "18px", padding: 14, background: "#fff" },
};

function formatPageRange(task) {
  if (!task) return "Wird ergänzt";
  return task.pageStart === task.pageEnd ? `Seite ${task.pageStart}` : `Seite ${task.pageStart}–${task.pageEnd}`;
}

function taskKey(hfId, examYear, taskName) {
  return `${hfId}__${examYear}__${taskName}`;
}

function App() {
  const [seite, setSeite] = useState("dashboard");
  const [selectedHF, setSelectedHF] = useState("hf1");
  const [selectedExamYear, setSelectedExamYear] = useState(examLibrary.hf1.exams[0].year);
  const [selectedTask, setSelectedTask] = useState(examLibrary.hf1.exams[0].tasks[0].name);
  const [taskStates, setTaskStates] = useState({});
  const [weeklyPlan, setWeeklyPlan] = useState(initialPlan.map((item, index) => ({ ...item, id: index, done: false })));

  useEffect(() => {
    const saved = localStorage.getItem("meistertrainer-taskstates-v1");
    if (saved) {
      try {
        setTaskStates(JSON.parse(saved));
      } catch (e) {}
    }
    const savedPlan = localStorage.getItem("meistertrainer-plan-v1");
    if (savedPlan) {
      try {
        setWeeklyPlan(JSON.parse(savedPlan));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("meistertrainer-taskstates-v1", JSON.stringify(taskStates));
  }, [taskStates]);

  useEffect(() => {
    localStorage.setItem("meistertrainer-plan-v1", JSON.stringify(weeklyPlan));
  }, [weeklyPlan]);

  const currentExamEntry = useMemo(() => {
    return examLibrary[selectedHF].exams.find((exam) => exam.year === selectedExamYear) || examLibrary[selectedHF].exams[0];
  }, [selectedHF, selectedExamYear]);

  const currentTaskMeta = useMemo(() => {
    return currentExamEntry.tasks.find((task) => task.name === selectedTask) || currentExamEntry.tasks[0];
  }, [currentExamEntry, selectedTask]);

  const currentPdfUrl = currentExamEntry.pdfPath
    ? `${currentExamEntry.pdfPath}#page=${currentTaskMeta.pageStart}&view=FitH`
    : "";

  const currentStateKey = taskKey(selectedHF, selectedExamYear, selectedTask);
  const currentTaskState = taskStates[currentStateKey] || { done: false, difficult: false, notes: "" };

  const progress = useMemo(() => {
    const result = { hf1: 0, hf2: 0, hf3: 0 };
    Object.keys(examLibrary).forEach((hfId) => {
      const allTasks = examLibrary[hfId].exams.flatMap((exam) => exam.tasks.map((task) => taskKey(hfId, exam.year, task.name)));
      const doneCount = allTasks.filter((key) => taskStates[key]?.done).length;
      result[hfId] = allTasks.length ? Math.round((doneCount / allTasks.length) * 100) : 0;
    });
    return result;
  }, [taskStates]);

  const difficultTasks = useMemo(() => {
    const items = [];
    Object.keys(examLibrary).forEach((hfId) => {
      examLibrary[hfId].exams.forEach((exam) => {
        exam.tasks.forEach((task) => {
          const key = taskKey(hfId, exam.year, task.name);
          if (taskStates[key]?.difficult) {
            items.push({ hfId, examYear: exam.year, taskName: task.name, topic: task.topic });
          }
        });
      });
    });
    return items.slice(0, 8);
  }, [taskStates]);

  const dashboardFiles = useMemo(() => {
    return [
      ...examLibrary.hf1.exams.map((exam) => ({ hf: "HF1", year: exam.year, taskCount: exam.tasks.length })),
      ...examLibrary.hf2.exams.map((exam) => ({ hf: "HF2", year: exam.year, taskCount: exam.tasks.length })),
      ...examLibrary.hf3.exams.map((exam) => ({ hf: "HF3", year: exam.year, taskCount: exam.tasks.length })),
    ];
  }, []);

  const quickTasks = useMemo(() => {
    return [
      { hf: "HF1", year: "2011 Sommer", task: "Aufgabe 1" },
      { hf: "HF1", year: "2011 Sommer", task: "Aufgabe 2" },
      { hf: "HF2", year: "2011 Sommer", task: "Aufgabe 1" },
      { hf: "HF3", year: "2011 Sommer", task: "Aufgabe 2" },
    ];
  }, []);

  function openTask(hfLabel, examYear, taskName) {
    const hfId = EXAMS.find((exam) => exam.label === hfLabel)?.id || "hf1";
    setSelectedHF(hfId);
    setSelectedExamYear(examYear);
    setSelectedTask(taskName);
    setSeite("aufgabe");
  }

  function openExam(hfLabel, examYear) {
    const hfId = EXAMS.find((exam) => exam.label === hfLabel)?.id || "hf1";
    const exam = examLibrary[hfId].exams.find((item) => item.year === examYear) || examLibrary[hfId].exams[0];
    setSelectedHF(hfId);
    setSelectedExamYear(exam.year);
    setSelectedTask(exam.tasks[0].name);
    setSeite("pruefungen");
  }

  function setTaskValue(patch) {
    setTaskStates((prev) => ({
      ...prev,
      [currentStateKey]: { ...(prev[currentStateKey] || { done: false, difficult: false, notes: "" }), ...patch },
    }));
  }

  function togglePlanDone(id) {
    setWeeklyPlan((prev) => prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
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
            <button style={styles.itemButton} onClick={() => openTask("HF1", "2011 Sommer", "Aufgabe 2")}>HF1 · 2011 Sommer · Aufgabe 2</button>
            <button style={styles.itemButton} onClick={() => openTask("HF2", "2011 Sommer", "Aufgabe 1")}>HF2 · 2011 Sommer · Aufgabe 1</button>
          </div>

          <div style={styles.card}>
            <div style={styles.cardTitle}>Schnellstart</div>
            <div style={styles.cardSub}>Direkt loslegen</div>
            <button style={styles.quickButton} onClick={() => setSeite("pruefungen")}>Weiterlernen</button>
            <button style={styles.outlineButton} onClick={() => setSeite("simulation")}>Simulation starten</button>
          </div>
        </div>

        <div style={styles.grid2}>
          <div style={styles.card}>
            <div style={styles.cardTitle}>Prüfungsdateien</div>
            <div style={styles.cardSub}>Alle Prüfungen anklickbar · PDFs können nach und nach hochgeladen werden</div>
            <div style={styles.fileGrid}>
              {dashboardFiles.map((file, index) => (
                <div key={`${file.hf}-${file.year}-${index}`} style={styles.fileCard} onClick={() => openExam(file.hf, file.year)}>
                  <div style={styles.hfLabel}>{file.hf}</div>
                  <div style={styles.fileTitle}>{file.year}</div>
                  <div style={styles.smallText}>{file.taskCount} Aufgaben</div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardTitle}>Aufgaben-Schnellzugriff</div>
            <div style={styles.cardSub}>Direkt einzelne Aufgaben öffnen</div>
            {quickTasks.map((item, index) => (
              <button key={index} style={styles.itemButton} onClick={() => openTask(item.hf, item.year, item.task)}>
                {item.hf} · {item.year} · {item.task}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}>HF-Fortschritt</div>
          <div style={styles.cardSub}>Wird automatisch aus erledigten Aufgaben berechnet</div>
          {EXAMS.map((exam) => (
            <div key={exam.id} style={styles.progressWrap}>
              <div style={styles.progressRow}>
                <span>{exam.label} · {exam.title}</span>
                <span>{progress[exam.id]}%</span>
              </div>
              <div style={styles.progressBar}><div style={styles.progressFill(progress[exam.id])}></div></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function Pruefungen() {
    return (
      <div style={styles.main}>
        <div>
          <h1 style={styles.sectionTitle}>Prüfungen</h1>
          <p style={styles.sectionSub}>Prüfung auswählen, Aufgabe anklicken, PDF öffnen.</p>
        </div>

        <div style={styles.card}>
          {EXAMS.map((exam) => (
            <button key={exam.id} style={styles.filterButton(selectedHF === exam.id)} onClick={() => {
              setSelectedHF(exam.id);
              setSelectedExamYear(examLibrary[exam.id].exams[0].year);
              setSelectedTask(examLibrary[exam.id].exams[0].tasks[0].name);
            }}>
              {exam.label}
            </button>
          ))}
        </div>

        <div style={styles.examLayout}>
          <div style={styles.card}>
            <div style={styles.cardTitle}>{examLibrary[selectedHF].title}</div>
            <div style={styles.cardSub}>Jahrgang auswählen</div>
            <div style={styles.listWrap}>
              {examLibrary[selectedHF].exams.map((exam) => (
                <button
                  key={exam.year}
                  style={{ ...styles.itemButton, background: selectedExamYear === exam.year ? "#eef2ff" : "#fff", borderColor: selectedExamYear === exam.year ? "#111827" : "#e5e7eb" }}
                  onClick={() => {
                    setSelectedExamYear(exam.year);
                    setSelectedTask(exam.tasks[0].name);
                  }}
                >
                  {exam.year} · {exam.tasks.length} Aufgaben
                </button>
              ))}
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardTitle}>{selectedExamYear}</div>
            <div style={styles.cardSub}>Aufgabe wählen und öffnen</div>
            <div style={{ marginBottom: 16 }}>
              {currentExamEntry.tasks.map((task) => (
                <button key={task.name} style={styles.filterButton(selectedTask === task.name)} onClick={() => setSelectedTask(task.name)}>
                  {task.name}
                </button>
              ))}
            </div>

            <div style={styles.infoBox}>
              <div style={{ ...styles.fileTitle, marginBottom: 8 }}>{selectedTask}</div>
              <div style={styles.smallText}>Thema: {currentTaskMeta.topic}</div>
              <div style={styles.smallText}>Datei: {currentExamEntry.fileName}</div>
              <div style={styles.smallText}>Seiten: {formatPageRange(currentTaskMeta)}</div>
            </div>

            <div style={{ marginTop: 16, ...styles.actionRow }}>
              <button style={styles.quickButton} onClick={() => setSeite("aufgabe")}>Aufgabe öffnen</button>
              <button style={styles.outlineButton} onClick={() => setTaskValue({ difficult: !currentTaskState.difficult })}>
                {currentTaskState.difficult ? "Nicht mehr schwierig" : "Als schwierig markieren"}
              </button>
            </div>
          </div>
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
          <div style={styles.cardTitle}>{EXAMS.find((x) => x.id === selectedHF)?.label} · {selectedExamYear} · {selectedTask}</div>
          <div style={styles.cardSub}>{currentTaskMeta.topic} · {formatPageRange(currentTaskMeta)}</div>

          <div style={{ marginBottom: 16 }}>
            <span style={styles.tag}>{currentExamEntry.fileName}</span>
            {currentTaskState.done ? <span style={styles.tag}>Erledigt</span> : null}
            {currentTaskState.difficult ? <span style={{ ...styles.tag, background: "#fef2f2", color: "#991b1b" }}>Schwierig</span> : null}
          </div>

          <div style={{ marginBottom: 16 }}>
            <iframe
              src={currentPdfUrl}
              title={`${selectedHF}-${selectedExamYear}-${selectedTask}`}
              style={styles.iframe}
            />
          </div>

          <div style={{ marginBottom: 12, fontWeight: 700 }}>Meine Notizen</div>
          <textarea
            style={styles.textarea}
            value={currentTaskState.notes}
            onChange={(e) => setTaskValue({ notes: e.target.value })}
            placeholder="Hier kannst du deine Lösung, Merkpunkte oder Fehler notieren."
          />

          <div style={{ ...styles.actionRow, marginTop: 16 }}>
            <button style={styles.quickButton} onClick={() => setTaskValue({ done: !currentTaskState.done })}>
              {currentTaskState.done ? "Als offen markieren" : "Als erledigt markieren"}
            </button>
            <button style={styles.outlineButton} onClick={() => setTaskValue({ difficult: !currentTaskState.difficult })}>
              {currentTaskState.difficult ? "Nicht mehr schwierig" : "Als schwierig markieren"}
            </button>
            <button style={styles.outlineButton} onClick={() => setSeite("pruefungen")}>Zurück zu Prüfungen</button>
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
          <p style={styles.sectionSub}>Flexibel abhaken, Fortschritt bleibt gespeichert.</p>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}>Diese Woche</div>
          <div style={styles.cardSub}>Unter der Woche 1–2 h · Wochenende 4–5 h</div>
          {weeklyPlan.map((item) => (
            <div key={item.id} style={{ ...styles.itemButton, display: "flex", alignItems: "center", gap: 12 }}>
              <input type="checkbox" checked={item.done} onChange={() => togglePlanDone(item.id)} />
              <div style={{ flex: 1 }}>{item.day} · {item.task}</div>
              <div style={{ color: "#6b7280" }}>{item.duration}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function Simulation() {
    const simExam = examLibrary[selectedHF].exams[0];
    return (
      <div style={styles.main}>
        <div>
          <h1 style={styles.sectionTitle}>Simulation</h1>
          <p style={styles.sectionSub}>Komplette Prüfung im Original-PDF öffnen.</p>
        </div>

        <div style={styles.card}>
          {EXAMS.map((exam) => (
            <button key={exam.id} style={styles.filterButton(selectedHF === exam.id)} onClick={() => setSelectedHF(exam.id)}>
              {exam.label}
            </button>
          ))}
          <div style={{ marginTop: 16, marginBottom: 16, fontWeight: 700 }}>{simExam.fileName}</div>
          <iframe src={`${simExam.pdfPath}#page=1&view=FitH`} title="simulation" style={{ ...styles.iframe, height: "560px" }} />
        </div>
      </div>
    );
  }

  function Fortschritt() {
    return (
      <div style={styles.main}>
        <div>
          <h1 style={styles.sectionTitle}>Fortschritt</h1>
          <p style={styles.sectionSub}>Erledigte und schwierige Aufgaben im Blick.</p>
        </div>

        <div style={styles.grid3}>
          {EXAMS.map((exam) => (
            <div key={exam.id} style={styles.card}>
              <div style={styles.cardTitle}>{exam.label}</div>
              <div style={styles.cardSub}>{exam.title}</div>
              <div style={styles.statBig}>{progress[exam.id]}%</div>
            </div>
          ))}
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}>Schwierige Aufgaben</div>
          <div style={styles.cardSub}>Wird aus deinen Markierungen aufgebaut</div>
          {difficultTasks.length === 0 ? (
            <div style={styles.smallText}>Noch keine schwierigen Aufgaben markiert.</div>
          ) : (
            difficultTasks.map((item, index) => (
              <button key={index} style={styles.itemButton} onClick={() => {
                setSelectedHF(item.hfId);
                setSelectedExamYear(item.examYear);
                setSelectedTask(item.taskName);
                setSeite("aufgabe");
              }}>
                {EXAMS.find((x) => x.id === item.hfId)?.label} · {item.examYear} · {item.taskName} · {item.topic}
              </button>
            ))
          )}
        </div>
      </div>
    );
  }

  function Kalender() {
    return (
      <div style={styles.main}>
        <div>
          <h1 style={styles.sectionTitle}>Kalender</h1>
          <p style={styles.sectionSub}>Kommt als Nächstes nach Prüfungen und PDF-Workflow.</p>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}>Geplante Funktion</div>
          <div style={styles.cardSub}>Privatkalender, Schulkalender und automatische Lernblöcke.</div>
          <div style={styles.smallText}>Erst bauen wir die Prüfungen, das Bearbeiten und den Lernfortschritt sauber fertig.</div>
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

          <button style={styles.navButton(seite === "dashboard")} onClick={() => setSeite("dashboard")}>Dashboard</button>
          <button style={styles.navButton(seite === "lernplan")} onClick={() => setSeite("lernplan")}>Lernplan</button>
          <button style={styles.navButton(seite === "pruefungen")} onClick={() => setSeite("pruefungen")}>Prüfungen</button>
          <button style={styles.navButton(seite === "simulation")} onClick={() => setSeite("simulation")}>Simulation</button>
          <button style={styles.navButton(seite === "fortschritt")} onClick={() => setSeite("fortschritt")}>Fortschritt</button>
          <button style={styles.navButton(seite === "kalender")} onClick={() => setSeite("kalender")}>Kalender</button>
        </aside>

        <main>
          {seite === "dashboard" && <Dashboard />}
          {seite === "pruefungen" && <Pruefungen />}
          {seite === "aufgabe" && <Aufgabe />}
          {seite === "lernplan" && <Lernplan />}
          {seite === "simulation" && <Simulation />}
          {seite === "fortschritt" && <Fortschritt />}
          {seite === "kalender" && <Kalender />}
        </main>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
