import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, BookOpen, Timer, BarChart3, CheckCircle2, AlertTriangle, ChevronRight, Target, FileText, CalendarRange, FolderOpen } from "lucide-react";

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
    examDuration: "03:00:00",
    exams: YEAR_LISTS.hf1.map((year) => ({
      year,
      fileName: buildFileName("Teil-2_AA_Prüfung", year),
      pdfPath: `/pdfs/hf1/${buildFileName("Teil-2_AA_Prüfung", year)}`,
      tasks: year === "2011 Sommer" ? HF1_2011_TASKS : buildGenericTasks(5),
    })),
  },
  hf2: {
    label: "HF2",
    title: "Elektro- und Sicherheitstechnik",
    examDuration: "03:00:00",
    exams: YEAR_LISTS.hf2.map((year) => ({
      year,
      fileName: buildFileName("Teil-2_ES_Prüfung", year),
      pdfPath: `/pdfs/hf2/${buildFileName("Teil-2_ES_Prüfung", year)}`,
      tasks: year === "2011 Sommer" ? HF2_2011_TASKS : buildGenericTasks(8),
    })),
  },
  hf3: {
    label: "HF3",
    title: "Betriebsführung / Organisation",
    examDuration: "03:00:00",
    exams: YEAR_LISTS.hf3.map((year) => ({
      year,
      fileName: buildFileName("Teil-2_BB_Prüfung", year),
      pdfPath: `/pdfs/hf3/${buildFileName("Teil-2_BB_Prüfung", year)}`,
      tasks: year === "2011 Sommer" ? HF3_2011_TASKS : buildGenericTasks(8),
    })),
  },
};

const initialPlan = [
  { day: "Montag", task: "HF1 – 2011 Sommer – Aufgabe 2", duration: "60 min", done: false },
  { day: "Dienstag", task: "HF2 – Schutzmaßnahmen", duration: "90 min", done: false },
  { day: "Mittwoch", task: "HF1 – Nachkalkulation", duration: "60 min", done: true },
  { day: "Samstag", task: "Simulation HF2", duration: "240 min", done: false },
];

function SectionTitle({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-2xl bg-muted p-2">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
    </div>
  );
}

function formatPageRange(task) {
  if (!task) return "Wird ergänzt";
  return task.pageStart === task.pageEnd ? `Seite ${task.pageStart}` : `Seite ${task.pageStart}–${task.pageEnd}`;
}

function PdfFrame({ src, title, height = "h-[760px]" }) {
  if (!src) {
    return (
      <div className="flex h-[320px] items-center justify-center rounded-[18px] border bg-background text-center text-sm text-muted-foreground">
        PDF-Datei noch nicht hochgeladen.
      </div>
    );
  }

  return <iframe src={src} title={title} className={`w-full rounded-xl bg-background ${height}`} />;
}

export default function MeisterTrainerUIV2() {
  const [page, setPage] = useState("dashboard");
  const [selectedHF, setSelectedHF] = useState("hf1");
  const [selectedExamYear, setSelectedExamYear] = useState(examLibrary.hf1.exams[0].year);
  const [selectedTask, setSelectedTask] = useState(examLibrary.hf1.exams[0].tasks[0].name);
  const [notes, setNotes] = useState("");
  const [weeklyPlan, setWeeklyPlan] = useState(initialPlan);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [simulationHF, setSimulationHF] = useState("hf1");
  const [simulationTime] = useState("03:00:00");

  const sidebar = [
    { id: "dashboard", label: "Dashboard", icon: Target },
    { id: "lernplan", label: "Lernplan", icon: CalendarRange },
    { id: "pruefungen", label: "Prüfungen", icon: BookOpen },
    { id: "simulation", label: "Simulation", icon: Timer },
    { id: "fortschritt", label: "Fortschritt", icon: BarChart3 },
    { id: "kalender", label: "Kalender", icon: CalendarDays },
  ];

  const progress = useMemo(() => ({ hf1: 62, hf2: 38, hf3: 21 }), []);

  const dashboardFiles = useMemo(
    () => [
      ...examLibrary.hf1.exams.map((exam) => ({ hf: "HF1", file: exam.year, taskCount: exam.tasks.length })),
      ...examLibrary.hf2.exams.map((exam) => ({ hf: "HF2", file: exam.year, taskCount: exam.tasks.length })),
      ...examLibrary.hf3.exams.map((exam) => ({ hf: "HF3", file: exam.year, taskCount: exam.tasks.length })),
    ],
    []
  );

  const dashboardTasks = useMemo(
    () => [
      { hf: "HF1", exam: "2011 Sommer", task: "Aufgabe 1" },
      { hf: "HF1", exam: "2014 Sommer", task: "Aufgabe 4" },
      { hf: "HF2", exam: "2011 Sommer", task: "Aufgabe 1" },
      { hf: "HF2", exam: "2017 Sommer", task: "Aufgabe 7" },
      { hf: "HF3", exam: "2011 Sommer", task: "Aufgabe 2" },
      { hf: "HF3", exam: "2018", task: "Aufgabe 5" },
    ],
    []
  );

  const currentExamHeader = EXAMS.find((exam) => exam.id === selectedHF);
  const currentExamEntry = useMemo(
    () => examLibrary[selectedHF].exams.find((exam) => exam.year === selectedExamYear) || examLibrary[selectedHF].exams[0],
    [selectedHF, selectedExamYear]
  );
  const currentTaskMeta = useMemo(
    () => currentExamEntry.tasks.find((task) => task.name === selectedTask) || currentExamEntry.tasks[0],
    [currentExamEntry, selectedTask]
  );
  const currentPdfUrl = currentExamEntry?.pdfPath
    ? `${currentExamEntry.pdfPath}#page=${currentTaskMeta?.pageStart || 1}&view=FitH`
    : "";

  const simulationExamEntry = examLibrary[simulationHF].exams[0];
  const simulationPdfUrl = simulationExamEntry?.pdfPath ? `${simulationExamEntry.pdfPath}#page=1&view=FitH` : "";

  const togglePlanDone = (index) => {
    setWeeklyPlan((prev) => prev.map((item, i) => (i === index ? { ...item, done: !item.done } : item)));
  };

  const selectExam = (hfId, examYear, taskName) => {
    const examEntry = examLibrary[hfId].exams.find((exam) => exam.year === examYear) || examLibrary[hfId].exams[0];
    setSelectedHF(hfId);
    setSelectedExamYear(examEntry.year);
    setSelectedTask(taskName || examEntry.tasks[0].name);
  };

  const changeHF = (hfId) => {
    const firstExam = examLibrary[hfId].exams[0];
    setSelectedHF(hfId);
    setSelectedExamYear(firstExam.year);
    setSelectedTask(firstExam.tasks[0].name);
  };

  const openTaskFromDashboard = (hfLabel, examYear, taskName) => {
    const hfId = EXAMS.find((exam) => exam.label === hfLabel)?.id || "hf1";
    selectExam(hfId, examYear, taskName);
    setPage("aufgabe");
  };

  const openExamFromDashboard = (hfLabel, examYear) => {
    const hfId = EXAMS.find((exam) => exam.label === hfLabel)?.id || "hf1";
    selectExam(hfId, examYear);
    setPage("pruefungen");
  };

  const DashboardPage = () => (
    <div className="space-y-6">
      <SectionTitle icon={Target} title="Dashboard" subtitle="Heute sehen, was ansteht und wo du stehst." />

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-3xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Countdown</CardTitle>
            <CardDescription>Nächste Prüfung</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">HF1 in 115 Tagen</div>
            <p className="mt-2 text-sm text-muted-foreground">07.07. · Auftragsabwicklung</p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Heutige Aufgaben</CardTitle>
            <CardDescription>Automatisch vorgeschlagen</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <button onClick={() => openTaskFromDashboard("HF1", "2011 Sommer", "Aufgabe 2")} className="w-full rounded-2xl border p-3 text-left transition hover:bg-muted">
              HF1 · 2011 Sommer · Aufgabe 2
            </button>
            <button onClick={() => openTaskFromDashboard("HF2", "2011 Sommer", "Aufgabe 1")} className="w-full rounded-2xl border p-3 text-left transition hover:bg-muted">
              HF2 · Schutzmaßnahmen wiederholen
            </button>
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Schnellstart</CardTitle>
            <CardDescription>Direkt loslegen</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button className="rounded-2xl justify-between" onClick={() => setPage("pruefungen")}>
              Weiterlernen <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="rounded-2xl justify-between" onClick={() => setPage("simulation")}>
              Simulation starten <ChevronRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-3xl shadow-sm">
          <CardHeader>
            <CardTitle>Prüfungsdateien</CardTitle>
            <CardDescription>Alle Prüfungen vorbereitet · PDF-ready</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {dashboardFiles.map((item, index) => (
              <button
                key={`${item.hf}-${item.file}-${index}`}
                onClick={() => openExamFromDashboard(item.hf, item.file)}
                className="rounded-2xl border p-4 text-left transition hover:bg-muted"
              >
                <div className="mb-1 text-sm text-muted-foreground">{item.hf}</div>
                <div className="font-semibold">{item.file}</div>
                <div className="mt-1 text-sm text-muted-foreground">{item.taskCount} Aufgaben</div>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-sm">
          <CardHeader>
            <CardTitle>Aufgaben-Schnellzugriff</CardTitle>
            <CardDescription>Direkt einzelne Aufgaben öffnen</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {dashboardTasks.map((item, index) => (
              <button
                key={`${item.hf}-${item.exam}-${item.task}-${index}`}
                onClick={() => openTaskFromDashboard(item.hf, item.exam, item.task)}
                className="flex w-full items-center justify-between rounded-2xl border p-3 text-left transition hover:bg-muted"
              >
                <div>
                  <div className="font-medium">{item.hf} · {item.task}</div>
                  <div className="text-sm text-muted-foreground">{item.exam}</div>
                </div>
                <ChevronRight className="h-4 w-4" />
              </button>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-3xl shadow-sm">
        <CardHeader>
          <CardTitle>HF-Fortschritt</CardTitle>
          <CardDescription>Dein aktueller Stand für Teil 2</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {EXAMS.map((exam) => (
            <div key={exam.id} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{exam.label} · {exam.title}</span>
                <span>{progress[exam.id]}%</span>
              </div>
              <Progress value={progress[exam.id]} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const LernplanPage = () => (
    <div className="space-y-6">
      <SectionTitle icon={CalendarRange} title="Lernplan" subtitle="Flexibel planbar für Woche und Wochenende." />

      <Card className="rounded-3xl shadow-sm">
        <CardHeader>
          <CardTitle>Diese Woche</CardTitle>
          <CardDescription>Unter der Woche 1–2 h, Wochenende 4–5 h</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {weeklyPlan.map((item, index) => (
            <div key={index} className="flex items-center gap-3 rounded-2xl border p-3">
              <Checkbox checked={item.done} onCheckedChange={() => togglePlanDone(index)} />
              <div className="min-w-24 text-sm font-medium">{item.day}</div>
              <div className="flex-1 text-sm">{item.task}</div>
              <Badge variant="secondary" className="rounded-xl">{item.duration}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="rounded-3xl shadow-sm">
          <CardHeader>
            <CardTitle>Automatik</CardTitle>
            <CardDescription>Später mit Kalendern verknüpft</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• freie Zeitfenster erkennen</p>
            <p>• schwache HF höher gewichten</p>
            <p>• nicht geschaffte Blöcke neu einplanen</p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-sm">
          <CardHeader>
            <CardTitle>Heute empfohlen</CardTitle>
            <CardDescription>Vom Lernsystem priorisiert</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="rounded-2xl bg-muted p-3">HF1 – Aufgabe 2 bearbeiten</div>
            <div className="rounded-2xl bg-muted p-3">HF2 – 20 Minuten Wiederholung</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const PruefungenPage = () => (
    <div className="space-y-6">
      <SectionTitle icon={BookOpen} title="Prüfungen" subtitle="Nach HF, Jahr und Aufgabe navigieren." />

      <Tabs value={selectedHF} onValueChange={changeHF}>
        <TabsList className="grid w-full grid-cols-3 rounded-2xl">
          {EXAMS.map((exam) => (
            <TabsTrigger key={exam.id} value={exam.id} className="rounded-2xl">{exam.label}</TabsTrigger>
          ))}
        </TabsList>

        {EXAMS.map((exam) => (
          <TabsContent key={exam.id} value={exam.id} className="mt-4">
            <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
              <Card className="rounded-3xl shadow-sm">
                <CardHeader>
                  <CardTitle>{exam.title}</CardTitle>
                  <CardDescription>{exam.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[420px] pr-3">
                    <div className="space-y-3">
                      {examLibrary[exam.id].exams.map((examItem) => (
                        <button
                          key={examItem.year}
                          onClick={() => {
                            setSelectedExamYear(examItem.year);
                            setSelectedTask(examItem.tasks[0].name);
                          }}
                          className={`w-full rounded-2xl border p-3 text-left transition ${selectedExamYear === examItem.year ? "border-primary bg-muted" : "hover:bg-muted/60"}`}
                        >
                          <div className="font-medium">{examItem.year}</div>
                          <div className="text-sm text-muted-foreground">{examItem.tasks.length} Aufgaben</div>
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="rounded-3xl shadow-sm">
                <CardHeader>
                  <CardTitle>{selectedExamYear}</CardTitle>
                  <CardDescription>Aufgaben öffnen · direkt PDF-bereit</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {currentExamEntry.tasks.map((task) => (
                      <Button
                        key={task.name}
                        variant={selectedTask === task.name ? "default" : "outline"}
                        className="rounded-2xl"
                        onClick={() => setSelectedTask(task.name)}
                      >
                        {task.name}
                      </Button>
                    ))}
                  </div>

                  <div className="rounded-[28px] border bg-muted/40 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <div className="text-sm text-muted-foreground">Vorschau</div>
                        <div className="text-lg font-semibold">{currentExamHeader?.label} · {selectedExamYear} · {selectedTask}</div>
                        <div className="mt-1 text-sm text-muted-foreground">{currentTaskMeta.topic} · {formatPageRange(currentTaskMeta)}</div>
                      </div>
                      <Badge className="rounded-xl">PDF-Ansicht</Badge>
                    </div>

                    <div className="rounded-[24px] border border-dashed bg-background p-6 text-sm text-muted-foreground">
                      <div className="mb-3 flex items-center gap-2 font-medium text-foreground">
                        <FolderOpen className="h-4 w-4" />
                        Vorbereitung für echte Prüfungsansicht
                      </div>
                      <div>Datei: {currentExamEntry.fileName}</div>
                      <div>Bereich: {currentTaskMeta.topic}</div>
                      <div>Prüfungsseiten: {formatPageRange(currentTaskMeta)}</div>

                      <div className="mt-4 rounded-[18px] border bg-muted/40 p-2">
                        <PdfFrame src={currentPdfUrl} title={`Vorschau ${currentExamHeader?.label} ${selectedExamYear} ${selectedTask}`} height="h-[320px]" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button className="rounded-2xl" onClick={() => setPage("aufgabe")}>Aufgabe öffnen</Button>
                    <Button variant="outline" className="rounded-2xl">Als schwierig markieren</Button>
                    <Button variant="outline" className="rounded-2xl">Für Wiederholung merken</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );

  const AufgabenDetail = () => (
    <div className="space-y-6">
      <SectionTitle icon={FileText} title="Einzelaufgabe" subtitle="Originalansicht mit Notizen und Lernstatus." />

      <Card className="rounded-3xl shadow-sm">
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>{currentExamHeader?.label} · {selectedExamYear} · {selectedTask}</CardTitle>
            <CardDescription>Bearbeitungsstatus: offen · {currentTaskMeta.topic} · {formatPageRange(currentTaskMeta)}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge className="rounded-xl">Originalseite</Badge>
            <Badge variant="secondary" className="rounded-xl">Zoom / Scroll / Vollbild</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-[28px] border bg-muted/40 p-5 text-sm">
            <div className="mb-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border bg-background p-3">
                <div className="text-xs text-muted-foreground">Datei</div>
                <div className="mt-1 font-medium break-words">{currentExamEntry.fileName}</div>
              </div>
              <div className="rounded-2xl border bg-background p-3">
                <div className="text-xs text-muted-foreground">Thema</div>
                <div className="mt-1 font-medium">{currentTaskMeta.topic}</div>
              </div>
              <div className="rounded-2xl border bg-background p-3">
                <div className="text-xs text-muted-foreground">Seiten</div>
                <div className="mt-1 font-medium">{formatPageRange(currentTaskMeta)}</div>
              </div>
            </div>

            <div className="rounded-[24px] border bg-background p-3">
              <PdfFrame src={currentPdfUrl} title={`${currentExamHeader?.label} ${selectedExamYear} ${selectedTask}`} height="h-[760px]" />
            </div>
          </div>

          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Eigene Notizen zur Aufgabe…"
            className="min-h-[140px] rounded-2xl"
          />

          <div className="flex flex-wrap gap-2">
            <Button className="rounded-2xl"><CheckCircle2 className="mr-2 h-4 w-4" /> Erledigt</Button>
            <Button variant="outline" className="rounded-2xl"><AlertTriangle className="mr-2 h-4 w-4" /> Schwierig</Button>
            <Button variant="outline" className="rounded-2xl">Später wiederholen</Button>
            <Button variant="outline" className="rounded-2xl" onClick={() => setPage("pruefungen")}>Zurück zu Prüfungen</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const SimulationPage = () => (
    <div className="space-y-6">
      <SectionTitle icon={Timer} title="Simulation" subtitle="Prüfungsmodus im Originalstil für HF1, HF2 und HF3." />

      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <Card className="rounded-3xl shadow-sm">
          <CardHeader>
            <CardTitle>Simulation starten</CardTitle>
            <CardDescription>HF auswählen und Prüfungssimulation öffnen</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {EXAMS.map((exam) => (
              <button
                key={exam.id}
                onClick={() => setSimulationHF(exam.id)}
                className={`w-full rounded-2xl border p-3 text-left ${simulationHF === exam.id ? "border-primary bg-muted" : "hover:bg-muted/60"}`}
              >
                <div className="font-medium">{exam.label}</div>
                <div className="text-sm text-muted-foreground">{exam.title}</div>
              </button>
            ))}
            <Button className="w-full rounded-2xl" onClick={() => setSimulationRunning(true)}>Simulation starten</Button>
            <Button variant="outline" className="w-full rounded-2xl" onClick={() => setSimulationRunning(false)}>Zurücksetzen</Button>
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <div>
                <CardTitle>{simulationHF.toUpperCase()} Simulation</CardTitle>
                <CardDescription>Originalansicht mit Timer und vorbereiteter PDF-Integration</CardDescription>
              </div>
              <div className="rounded-2xl border px-4 py-2 text-xl font-bold">{simulationTime}</div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {simulationExamEntry.tasks.slice(0, 3).map((task, index) => (
                <Badge key={task.name} variant={index === 0 ? "default" : "secondary"} className="rounded-xl">
                  {task.name}
                </Badge>
              ))}
            </div>

            <div className="rounded-[28px] border bg-muted/40 p-4">
              {simulationRunning ? (
                <PdfFrame src={simulationPdfUrl} title={`${simulationHF.toUpperCase()} Simulation PDF`} height="h-[420px]" />
              ) : (
                <div className="flex h-[420px] items-center justify-center rounded-[20px] border bg-background text-center text-sm text-muted-foreground">
                  Wähle links ein HF und starte die Simulation.
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <Button className="rounded-2xl">Nächste Aufgabe</Button>
              <Button variant="outline" className="rounded-2xl">Selbstbewertung</Button>
              <Button variant="outline" className="rounded-2xl">Fortschritt speichern</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const FortschrittPage = () => (
    <div className="space-y-6">
      <SectionTitle icon={BarChart3} title="Fortschritt" subtitle="Offene, schwierige und bearbeitete Aufgaben im Blick." />

      <div className="grid gap-4 md:grid-cols-3">
        {EXAMS.map((exam) => (
          <Card key={exam.id} className="rounded-3xl shadow-sm">
            <CardHeader>
              <CardTitle>{exam.label}</CardTitle>
              <CardDescription>{exam.title}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Progress value={progress[exam.id]} />
              <div className="text-sm text-muted-foreground">Fortschritt: {progress[exam.id]}%</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="rounded-3xl shadow-sm">
          <CardHeader>
            <CardTitle>Schwierige Aufgaben</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="rounded-2xl border p-3">HF2 · 2011 Sommer · Aufgabe 1</div>
            <div className="rounded-2xl border p-3">HF1 · 2011 Sommer · Aufgabe 4</div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-sm">
          <CardHeader>
            <CardTitle>Nächste Wiederholungen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="rounded-2xl border p-3">Morgen · HF1 Nachkalkulation</div>
            <div className="rounded-2xl border p-3">Freitag · HF2 Schutzmaßnahmen</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const KalenderPage = () => (
    <div className="space-y-6">
      <SectionTitle icon={CalendarDays} title="Kalender" subtitle="Später für Privat- und Schulkalender." />

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="rounded-3xl shadow-sm">
          <CardHeader>
            <CardTitle>Kalender verbinden</CardTitle>
            <CardDescription>Für automatische Lernblöcke</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full rounded-2xl justify-start">Apple Kalender verbinden</Button>
            <Button variant="outline" className="w-full rounded-2xl justify-start">Google Kalender verbinden</Button>
            <Button variant="outline" className="w-full rounded-2xl justify-start">Schulkalender importieren</Button>
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-sm">
          <CardHeader>
            <CardTitle>Geplante Funktion</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• freie Zeitfenster erkennen</p>
            <p>• Lernblöcke automatisch setzen</p>
            <p>• bei Ausfall flexibel umplanen</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <DashboardPage />;
      case "lernplan":
        return <LernplanPage />;
      case "pruefungen":
        return <PruefungenPage />;
      case "simulation":
        return <SimulationPage />;
      case "fortschritt":
        return <FortschrittPage />;
      case "kalender":
        return <KalenderPage />;
      case "aufgabe":
        return <AufgabenDetail />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto grid max-w-7xl gap-6 p-4 md:p-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-[28px] border bg-card p-4 shadow-sm lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
          <div className="mb-6">
            <div className="text-2xl font-bold tracking-tight">MeisterTrainer</div>
            <p className="mt-1 text-sm text-muted-foreground">Teil 2 · PC, iPhone, iPad · PDF-ready</p>
          </div>

          <nav className="space-y-2">
            {sidebar.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setPage(item.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm transition ${page === item.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-6 rounded-[24px] border bg-muted/50 p-4">
            <div className="text-sm font-semibold">Schnellzugriff</div>
            <div className="mt-3 flex flex-col gap-2">
              <Button className="rounded-2xl" onClick={() => { changeHF("hf1"); setPage("pruefungen"); }}>HF1 öffnen</Button>
              <Button variant="outline" className="rounded-2xl" onClick={() => setPage("aufgabe")}>Einzelaufgabe testen</Button>
            </div>
          </div>
        </aside>

        <main className="space-y-6">{renderPage()}</main>
      </div>
    </div>
  );
}
