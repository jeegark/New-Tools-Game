const STORAGE_KEY = "grey-zone-grid-state-v4";

const BASE_METRICS = {
  stability: 62,
  trust: 55,
  fiscal: 54,
  clarity: 38,
};

const METRIC_META = {
  stability: {
    label: "System Stability",
    shortLabel: "Stability",
    copy: {
      high: "The system still has room to absorb shocks without visible disorder.",
      mid: "Power and gas are still moving, but every new hit hurts more.",
      low: "Operating margin is dangerously thin.",
    },
  },
  trust: {
    label: "Public Trust",
    shortLabel: "Trust",
    copy: {
      high: "The country still believes your asks are fair, credible, and worth following.",
      mid: "Support is conditional. One bad call could flip the mood fast.",
      low: "People are reading resilience asks as panic or failure.",
    },
  },
  fiscal: {
    label: "Fiscal Headroom",
    shortLabel: "Fiscal",
    copy: {
      high: "The Treasury still has options left.",
      mid: "Emergency support is stacking up and policy space is narrowing.",
      low: "Every extra hour of calm now costs serious money.",
    },
  },
  clarity: {
    label: "Attribution Clarity",
    shortLabel: "Clarity",
    copy: {
      high: "You have a usable picture of the threat and where it might spread next.",
      mid: "You know enough to act, but not enough to relax.",
      low: "Ambiguity is now one of the crisis itself.",
    },
  },
};

const TOOLS = [
  {
    id: "society",
    title: "Whole-of-Society Resilience",
    tag: "Tool 1",
    description:
      "Train the public, institutions, and crisis channels to treat energy shocks as a shared national effort rather than a sudden demand for sacrifice.",
    setupEffects: { trust: 8, clarity: 2 },
    effectSummary: ["+ Trust", "+ Clarity"],
  },
  {
    id: "reserves",
    title: "Strategic Reserves Reset",
    tag: "Tool 2",
    description:
      "Build stronger buffers with gas storage, long-duration power storage, and spare hardware for fast restoration.",
    setupEffects: { stability: 10, fiscal: 2 },
    effectSummary: ["+ Stability", "+ Fiscal"],
  },
  {
    id: "flex",
    title: "Flexibility at Scale",
    tag: "Tool 3",
    description:
      "Bring homes and businesses into the response through demand shifting, smart charging, and flexible industrial loads.",
    setupEffects: { fiscal: 8, stability: 3 },
    effectSummary: ["+ Fiscal", "+ Stability"],
  },
  {
    id: "renewables",
    title: "Renewables Security Channel",
    tag: "Tool 4",
    description:
      "Pull renewable operators into tighter cyber, escalation, and emergency-response channels before the first attack lands.",
    setupEffects: { clarity: 10, stability: 2 },
    effectSummary: ["+ Clarity", "+ Stability"],
  },
  {
    id: "thresholds",
    title: "Lower Reporting Thresholds",
    tag: "Tool 5",
    description:
      "Treat smaller distributed assets as part of the national picture by lowering the bar for incident reporting and telemetry sharing.",
    setupEffects: { clarity: 8, trust: 1 },
    effectSummary: ["+ Clarity", "+ Trust"],
  },
  {
    id: "northsea",
    title: "North Sea Coalition",
    tag: "Tool 6",
    description:
      "Deepen regional protection and shared awareness around pipelines, cables, offshore power links, and undersea interference.",
    setupEffects: { stability: 6, clarity: 6 },
    effectSummary: ["+ Stability", "+ Clarity"],
  },
];

const EVENTS = [
  {
    id: "pipeline-1",
    phasePage: "scenario-one",
    title: "Explosions at the Sleipner link",
    lead:
      "A brutal cold snap has pushed winter demand across the Northern Hemisphere. Russian gas is gone from the market, LNG desks are already tight, and then a blast tears into a North Sea transport line. The UK instantly loses 18% of winter gas supply.",
    signals: ["18% gas supply lost", "Cold snap", "LNG market stressed"],
    prompt:
      "The first six hours decide the shape of the panic. How do you move?",
    intelNote:
      "National control reports a pressure collapse across the line. Financial desks are already repricing the morning.",
    choices: [
      {
        id: "pipeline-buffer",
        title: "Release buffers and coordinate allies immediately",
        description:
          "Treat it as a whole-system shock: pull on storage, alert regional partners, and prepare public flexibility messaging at once.",
        tags: ["coordination", "supply"],
        effects: { stability: 5, fiscal: -3, trust: 1, clarity: 2 },
        bonuses: [
          {
            tool: "reserves",
            effects: { stability: 4, fiscal: 1 },
            note: "Your reserve layer buys precious time before the market fully bites.",
          },
          {
            tool: "northsea",
            effects: { stability: 2, clarity: 3 },
            note: "Regional coordination gives you a faster and cleaner operating picture.",
          },
        ],
        result:
          "The shock still lands, but you keep it from turning into blind chaos. The system now has a fighting chance to breathe.",
      },
      {
        id: "pipeline-buy",
        title: "Buy replacement LNG and shield bills",
        description:
          "Pay whatever the market demands, pull in supply, and try to keep the public experience close to normal.",
        tags: ["supply", "cost"],
        effects: { stability: 8, fiscal: -14, trust: 4, clarity: 0 },
        result:
          "Tankers answer the bid and ministers get a little air. The bill, however, lands on your desk immediately.",
      },
      {
        id: "pipeline-hold",
        title: "Wait for firmer attribution before moving hard",
        description:
          "Keep the public line tight until you know whether this was sabotage, technical failure, or a false signal dressed as one.",
        tags: ["attribution"],
        effects: { stability: -8, fiscal: 2, trust: -4, clarity: 8 },
        bonuses: [
          {
            tool: "thresholds",
            effects: { clarity: 2 },
            note: "Better reporting makes the delay less blind than it would otherwise be.",
          },
        ],
        result:
          "You avoid saying the wrong thing too early, but hesitation feeds both market stress and public anxiety.",
      },
    ],
  },
  {
    id: "pipeline-2",
    phasePage: "scenario-one",
    title: "The public line",
    lead:
      "The line is still down. Prices are biting. Newsrooms want a number, ministers want a message, and the country can feel the strain even before anyone says a word.",
    signals: ["Price spike", "Media pressure", "Grey-zone ambiguity"],
    prompt:
      "What signal do you send to the country?",
    intelNote:
      "Cabinet wants a line for the morning bulletins. Markets are looking for either confidence or signs of panic.",
    choices: [
      {
        id: "pipeline-public-flex",
        title: "Ask openly for flexibility and explain the strain",
        description:
          "Tell the country what is happening, ask homes and firms to shift demand, and frame cooperation as part of the response.",
        tags: ["demand", "public", "coordination"],
        effects: { stability: 4, fiscal: 6, trust: -1, clarity: 2 },
        bonuses: [
          {
            tool: "society",
            effects: { trust: 6 },
            note: "Because people were prepared early, the ask feels disciplined rather than desperate.",
          },
          {
            tool: "flex",
            effects: { stability: 3, fiscal: 2 },
            note: "Flexible loads turn public cooperation into real relief on the system.",
          },
        ],
        result:
          "The country sees the strain, but it also sees a plan. If trust holds, demand starts moving before the market alone can do the job.",
      },
      {
        id: "pipeline-silent-support",
        title: "Shield broadly and avoid asking for behaviour change",
        description:
          "Spend hard, soften the immediate pain, and keep the public experience looking as close to normal as possible.",
        tags: ["supply", "cost"],
        effects: { stability: 2, fiscal: -12, trust: 3, clarity: -2 },
        result:
          "You buy quiet for now. The grid stays calmer, but the Treasury takes the hit and the country learns very little about living through strain.",
      },
      {
        id: "pipeline-accuse",
        title: "Publicly accuse Russia before the picture is complete",
        description:
          "Go hard and early, betting that visible resolve will deter more probing even before the forensic picture is clean.",
        tags: ["attribution", "coordination"],
        effects: { stability: -2, fiscal: -1, trust: 0, clarity: -8 },
        bonuses: [
          {
            tool: "northsea",
            effects: { clarity: 3, trust: 2 },
            note: "Shared monitoring data gives the accusation more footing than it would otherwise have.",
          },
        ],
        result:
          "Resolve stiffens the posture, but if the evidence lags behind the rhetoric, you may have traded confidence for noise.",
      },
    ],
  },
  {
    id: "wind-1",
    phasePage: "scenario-two",
    title: "A wind farm goes dark",
    lead:
      "A major offshore wind farm loses contact with all 174 turbines. Operators shut the site to protect hardware, cutting 1.2 GW from the system. Initial signs point to a poisoned software update from the turbine manufacturer.",
    signals: ["174 turbines offline", "1.2 GW lost", "Software compromise suspected"],
    prompt:
      "This is not yet a system-wide emergency. Do you keep it contained or act as if contagion is already possible?",
    intelNote:
      "The operator can keep the shutdown orderly. What nobody knows yet is whether the same path exists elsewhere in the fleet.",
    choices: [
      {
        id: "wind-isolate-share",
        title: "Isolate the software path and force telemetry sharing",
        description:
          "Freeze the update path, take the generation hit, and demand fast log sharing across operators and suppliers.",
        tags: ["cyber", "coordination"],
        effects: { stability: -2, fiscal: 0, trust: 1, clarity: 8 },
        bonuses: [
          {
            tool: "renewables",
            effects: { stability: 2, clarity: 4 },
            note: "Your renewable security channels mean the response starts joined-up instead of improvised.",
          },
          {
            tool: "thresholds",
            effects: { clarity: 3 },
            note: "Smaller sites begin surfacing copycat signals quickly instead of staying invisible.",
          },
        ],
        result:
          "You give up megawatts to buy visibility. It is a painful trade, but the network stops being blind.",
      },
      {
        id: "wind-quiet-fix",
        title: "Keep it operator-led and quiet while the grid compensates",
        description:
          "Because the wider system can absorb one site loss, let the operator handle it and keep the incident contained for as long as possible.",
        tags: ["supply"],
        effects: { stability: 4, fiscal: 0, trust: -4, clarity: -8 },
        result:
          "The grid stays smoother in the moment, but the rest of the fleet learns very little and the blind spots remain exactly where they were.",
      },
      {
        id: "wind-fleet-audit",
        title: "Order precautionary audits across offshore fleets",
        description:
          "Assume the compromise path may be wider than one site and accept controlled losses now to reduce the chance of a much larger hit later.",
        tags: ["cyber", "storage"],
        effects: { stability: -5, fiscal: -2, trust: 2, clarity: 6 },
        bonuses: [
          {
            tool: "reserves",
            effects: { stability: 2 },
            note: "Reserve capacity gives you enough room to be cautious without losing control.",
          },
          {
            tool: "flex",
            effects: { stability: 2, fiscal: 1 },
            note: "Flexible demand softens the operational cost of caution.",
          },
        ],
        result:
          "You take the hit early and on your own terms, rather than waiting to see how many sites fail at once.",
      },
    ],
  },
  {
    id: "wind-2",
    phasePage: "scenario-two",
    title: "Copycat risk across smaller assets",
    lead:
      "Forensics now suggest the same route could reach smaller wind and solar sites. One outage is manageable. Thirty at once would be something else entirely.",
    signals: ["Distributed contagion risk", "Board visibility gap", "Procedures still uneven"],
    prompt:
      "What structural move do you make while the threat is still visible?",
    intelNote:
      "Several operators are calling this a one-off. Cyber teams are less sure.",
    choices: [
      {
        id: "wind-common-channel",
        title: "Lower thresholds and create a common incident channel",
        description:
          "Pull smaller renewable operators into a shared reporting and response channel before the threat can fan out across them.",
        tags: ["cyber", "coordination"],
        effects: { stability: 4, fiscal: -1, trust: 1, clarity: 6 },
        bonuses: [
          {
            tool: "thresholds",
            effects: { stability: 2, clarity: 4 },
            note: "Because thresholds were already lower, the channel fills with usable signals immediately.",
          },
          {
            tool: "renewables",
            effects: { clarity: 2 },
            note: "Operators already know where to send alerts and what a good escalation looks like.",
          },
        ],
        result:
          "Fragmented operators start behaving more like a single defended system. That alone changes the tempo of the threat.",
      },
      {
        id: "wind-prioritise-largest",
        title: "Protect only the biggest sites",
        description:
          "Concentrate scarce cyber effort on the assets with the biggest immediate megawatt consequences and let smaller operators fend for themselves.",
        tags: ["cyber", "cost"],
        effects: { stability: -5, fiscal: 2, trust: -1, clarity: -4 },
        result:
          "You save money and keep the effort focused, but the seams between operators stay wide open.",
      },
      {
        id: "wind-storage-flex",
        title: "Accelerate storage and flexibility dispatch",
        description:
          "Use the incident as a trigger to give the system more cushions, so variable generation losses do not always push pressure back onto gas.",
        tags: ["demand", "storage"],
        effects: { stability: 6, fiscal: 4, trust: 3, clarity: 1 },
        bonuses: [
          {
            tool: "reserves",
            effects: { stability: 4 },
            note: "Your insurance layer turns resilience from a slogan into real operating room.",
          },
          {
            tool: "flex",
            effects: { stability: 2, fiscal: 3 },
            note: "Demand-side participation turns spare headroom into something you can actually dispatch.",
          },
        ],
        result:
          "Instead of trying to make every turbine invulnerable, you make the wider system harder to corner.",
      },
    ],
  },
  {
    id: "terminal-1",
    phasePage: "scenario-three",
    title: "Malware at a gas terminal",
    lead:
      "Malware is found in a peripheral system tied to a major gas terminal's master control unit. The site drops into a no-flow state while engineers decide whether the safety layer has been touched. Roughly a quarter of UK gas imports now hang in the balance.",
    signals: ["Quarter of gas imports at risk", "No-flow state", "SCADA compromise suspected"],
    prompt:
      "Do you move fast, move carefully, or split the difference?",
    intelNote:
      "Terminal engineers can clear sections of the site, but nobody wants to be the person who restarts into a poisoned system.",
    choices: [
      {
        id: "terminal-hold",
        title: "Hold the shutdown and shift demand instead",
        description:
          "Keep the site dark until the safety picture is clean, reroute what you can, and lean on demand response to buy time.",
        tags: ["cyber", "demand", "coordination"],
        effects: { stability: -3, fiscal: 5, trust: 2, clarity: 8 },
        bonuses: [
          {
            tool: "flex",
            effects: { stability: 4, trust: 1 },
            note: "Demand-side participation turns a hard hold into a manageable one.",
          },
          {
            tool: "reserves",
            effects: { stability: 3 },
            note: "Stored energy buys the forensic team the hours it needs.",
          },
          {
            tool: "society",
            effects: { trust: 1 },
            note: "A prepared public is less likely to read restraint as drift.",
          },
        ],
        result:
          "You choose certainty over speed. It hurts in the moment, but it avoids turning one emergency into two.",
      },
      {
        id: "terminal-fast-restart",
        title: "Push for a fast restart under pressure",
        description:
          "Minimise the immediate supply hit and bet that the compromise was narrow enough to manage while bringing the terminal back online.",
        tags: ["supply"],
        effects: { stability: 7, fiscal: -2, trust: -6, clarity: -10 },
        result:
          "The system breathes easier immediately, but everyone in the room knows you just wagered national confidence on incomplete certainty.",
      },
      {
        id: "terminal-segment",
        title: "Segment the terminal and restore partial flow",
        description:
          "Carve away the suspect architecture, restore what you can safely restore, and flood the site with cyber and engineering support.",
        tags: ["cyber", "coordination"],
        effects: { stability: 4, fiscal: -2, trust: 1, clarity: 6 },
        bonuses: [
          {
            tool: "renewables",
            effects: { clarity: 1 },
            note: "Cross-sector cyber habits make joint response faster and less clumsy.",
          },
        ],
        result:
          "You neither freeze nor gamble. The partial restart is slower than ministers want, but it is far easier to defend.",
      },
    ],
  },
  {
    id: "terminal-2",
    phasePage: "scenario-three",
    title: "The rest of winter",
    lead:
      "By now the crisis is strategic, not just operational. Prices are still painful, patience is thinning, and every actor in the system can feel how much of the burden still falls on gas.",
    signals: ["Public patience thinning", "Treasury under strain", "Gas still setting the mood"],
    prompt:
      "What doctrine carries you through the rest of winter?",
    intelNote:
      "This is the part everyone remembers later: not whether the first response was neat, but what pattern of response followed it.",
    choices: [
      {
        id: "winter-buy-normality",
        title: "Buy normality at almost any cost",
        description:
          "Protect continuity first, spend hard to suppress the pain, and keep asking the market to carry the system through.",
        tags: ["supply", "cost"],
        effects: { stability: 5, fiscal: -14, trust: 1, clarity: 0 },
        result:
          "The country sees continuity. Underneath it, the tab keeps climbing and the same pressure points remain ready for the next shock.",
      },
      {
        id: "winter-resilience-model",
        title: "Move to an explicit resilience model",
        description:
          "Use targeted support, open briefings, and paid flexibility so the system leans on participation instead of panic-priced fuel alone.",
        tags: ["demand", "public", "coordination"],
        effects: { stability: 5, fiscal: 6, trust: 6, clarity: 4 },
        bonuses: [
          {
            tool: "society",
            effects: { trust: 4 },
            note: "The public reads the shift as disciplined national effort rather than last-minute improvisation.",
          },
          {
            tool: "flex",
            effects: { stability: 2, fiscal: 4 },
            note: "Flexible demand finally becomes a strategic tool, not a side programme.",
          },
        ],
        result:
          "The country has to feel the strain, but it feels it inside a plan. That changes both the politics and the economics of the winter.",
      },
      {
        id: "winter-insurance-layer",
        title: "Rebuild the insurance layer for the next shock",
        description:
          "Invest hard in reserves, storage, spare hardware, and regional protection so the next winter starts from a stronger base.",
        tags: ["storage", "coordination"],
        effects: { stability: 7, fiscal: 2, trust: 2, clarity: 3 },
        bonuses: [
          {
            tool: "reserves",
            effects: { stability: 4, fiscal: 2 },
            note: "Because buffers were already part of the posture, scaling them up happens faster.",
          },
          {
            tool: "northsea",
            effects: { clarity: 2 },
            note: "Regional protection becomes a real operating layer instead of a diplomatic aspiration.",
          },
        ],
        result:
          "You spend to become harder to corner next time, not just to survive this week.",
      },
    ],
  },
];

const PAGE_CONFIG = {
  prep: {
    label: "Preparation",
    step: "Page 1",
    path: "index.html",
    heroEyebrow: "Preparation",
    heroTitle: "Set your winter doctrine",
    heroDek:
      "The crisis has not started yet. You have funding, political space, and time to activate only two resilience tools before winter turns violent.",
    contextLabel: "Before the shock",
    contextItems: [
      "Coldest January in five years",
      "Global LNG markets already strained",
      "Only two strategic tools can be activated",
    ],
    statCards: [
      { label: "Mission", value: "Pick two tools before the first strike lands" },
      { label: "Threat style", value: "Grey-zone pressure, sabotage, and cyber intrusion" },
      { label: "Win condition", value: "Keep the system alive without burning trust or money" },
    ],
    sources: [
      {
        title: "Exercise frame",
        detail:
          "Winter demand is already high before the first hostile move arrives. You are not entering a calm system.",
      },
      {
        title: "Resilience toolkit",
        detail:
          "Six tools are available: public readiness, reserves, flexibility, renewable security channels, lower reporting thresholds, and North Sea coordination.",
      },
    ],
  },
  "scenario-one": {
    label: "Scenario One",
    step: "Page 2",
    path: "scenario-one.html",
    eventRange: [0, 1],
    heroEyebrow: "Scenario One",
    heroTitle: "North Sea gas-pipeline sabotage",
    heroDek:
      "A transport line is hit in the middle of a winter market squeeze. You are now managing both a physical outage and the fear that more is coming.",
    contextLabel: "Pipeline phase",
    contextItems: [
      "Explosions near Sleipner infrastructure",
      "18% of winter gas supply disappears",
      "Prices jump before attribution is clear",
    ],
    statCards: [
      { label: "Primary problem", value: "Physical shock to a central gas artery" },
      { label: "Immediate risk", value: "Market panic outruns operational control" },
      { label: "Your job", value: "Stabilise the system before panic becomes policy" },
    ],
    sources: [
      {
        title: "Operational note",
        detail:
          "Legacy gas infrastructure is vulnerable because so much of the flow passes through a few high-value assets.",
      },
      {
        title: "Command note",
        detail:
          "Known gas crises come with mature escalation chains. The challenge is speed, cost, and public handling under pressure.",
      },
    ],
  },
  "scenario-two": {
    label: "Scenario Two",
    step: "Page 3",
    path: "scenario-two.html",
    eventRange: [2, 3],
    heroEyebrow: "Scenario Two",
    heroTitle: "A cyber strike through the renewable fleet",
    heroDek:
      "One wind farm can be absorbed. A wider compromise across many distributed assets could become something very different. This phase is about visibility, contagion, and coordination.",
    contextLabel: "Renewables phase",
    contextItems: [
      "174 turbines lose contact with control",
      "Compromised update path under investigation",
      "Small sites may be the real danger next",
    ],
    statCards: [
      { label: "Primary problem", value: "Cyber ambiguity inside a distributed system" },
      { label: "Immediate risk", value: "Local incidents stacking into critical mass" },
      { label: "Your job", value: "See more of the system before it fragments" },
    ],
    sources: [
      {
        title: "Operational note",
        detail:
          "Distributed renewables are harder to cripple physically, but weak cyber coordination can still create systemic danger.",
      },
      {
        title: "Command note",
        detail:
          "Smaller operators and working-level cyber incidents are often the pieces that never reach the national picture in time.",
      },
    ],
  },
  "scenario-three": {
    label: "Scenario Three",
    step: "Page 4",
    path: "scenario-three.html",
    eventRange: [4, 5],
    heroEyebrow: "Scenario Three",
    heroTitle: "Gas terminal malware and the long winter",
    heroDek:
      "A terminal drops into a no-flow state. The immediate decision is technical. The real question is what kind of country-wide response you build after that.",
    contextLabel: "Terminal phase",
    contextItems: [
      "Major gas terminal in no-flow state",
      "Quarter of UK gas imports at risk",
      "Winter doctrine now matters more than a single fix",
    ],
    statCards: [
      { label: "Primary problem", value: "Cyber safety risk inside critical gas infrastructure" },
      { label: "Immediate risk", value: "Short-term supply pressure hardening into long-term fragility" },
      { label: "Your job", value: "Choose what carries the country through the rest of winter" },
    ],
    sources: [
      {
        title: "Operational note",
        detail:
          "Gas terminals and pipelines remain central enough that one well-placed hit can still carry national consequences.",
      },
      {
        title: "Command note",
        detail:
          "When gas keeps setting the tempo, every choice starts to bleed into cost, politics, and trust.",
      },
    ],
  },
  debrief: {
    label: "Debrief",
    step: "Page 5",
    path: "debrief.html",
    heroEyebrow: "Debrief",
    heroTitle: "What kind of winter did you build?",
    heroDek:
      "The screens cool down, the shouting stops, and the deeper question arrives: did your choices make the country harder to coerce, or did they only keep it moving a little longer?",
    contextLabel: "After the exercise",
    contextItems: [
      "Six decisions are now on the record",
      "Every score is out of 100",
      "The aggregate resilience score is out of 400",
    ],
    statCards: [
      { label: "Readout", value: "Review the doctrine your decisions produced" },
      { label: "Question", value: "Did you buy time, or build resilience?" },
      { label: "Next move", value: "Reset and rerun with a different posture if needed" },
    ],
    sources: [
      {
        title: "After-action note",
        detail:
          "The board is cold now. What matters is the posture you revealed under stress: where you bought time, where you shared strain, and where you stayed easy to pressure.",
      },
      {
        title: "Archive access",
        detail:
          "The external research dossier sits outside the simulation. Open it if you want the real-world material that inspired the scenario design.",
      },
    ],
  },
};

const PAGE_ORDER = ["prep", "scenario-one", "scenario-two", "scenario-three", "debrief"];
const TOOL_MAP = new Map(TOOLS.map((tool) => [tool.id, tool]));
const HERO_THEME_LINE = "New Threats. New Tools.";

const pageId = document.body.dataset.page || "prep";
const page = PAGE_CONFIG[pageId] || PAGE_CONFIG.prep;
let state = loadState();

const elements = {
  pageEyebrow: document.getElementById("pageEyebrow"),
  pageTheme: document.getElementById("pageTheme"),
  pageHeading: document.getElementById("pageHeading"),
  pageDek: document.getElementById("pageDek"),
  heroActions: document.getElementById("heroActions"),
  pageContextLabel: document.getElementById("pageContextLabel"),
  pageContextList: document.getElementById("pageContextList"),
  pageStatGrid: document.getElementById("pageStatGrid"),
  phaseNav: document.getElementById("phaseNav"),
  phaseChip: document.getElementById("phaseChip"),
  eventCounter: document.getElementById("eventCounter"),
  stageTitle: document.getElementById("stageTitle"),
  stageLead: document.getElementById("stageLead"),
  signalRow: document.getElementById("signalRow"),
  stageBody: document.getElementById("stageBody"),
  progressText: document.getElementById("progressText"),
  progressFill: document.getElementById("progressFill"),
  toolCounter: document.getElementById("toolCounter"),
  toolSummary: document.getElementById("toolSummary"),
  decisionLog: document.getElementById("decisionLog"),
  sourceList: document.getElementById("sourceList"),
  metrics: {
    stability: {
      value: document.getElementById("metric-stability-value"),
      fill: document.getElementById("metric-stability-fill"),
      copy: document.getElementById("metric-stability-copy"),
    },
    trust: {
      value: document.getElementById("metric-trust-value"),
      fill: document.getElementById("metric-trust-fill"),
      copy: document.getElementById("metric-trust-copy"),
    },
    fiscal: {
      value: document.getElementById("metric-fiscal-value"),
      fill: document.getElementById("metric-fiscal-fill"),
      copy: document.getElementById("metric-fiscal-copy"),
    },
    clarity: {
      value: document.getElementById("metric-clarity-value"),
      fill: document.getElementById("metric-clarity-fill"),
      copy: document.getElementById("metric-clarity-copy"),
    },
  },
};

document.addEventListener("click", handleActionClick);

render();

function createDefaultState() {
  return {
    gameStarted: false,
    selectedTools: [],
    metrics: cloneMetrics(BASE_METRICS),
    currentEventIndex: 0,
    pendingResolution: null,
    log: [],
    history: [],
    patterns: {
      supply: 0,
      cost: 0,
      demand: 0,
      public: 0,
      coordination: 0,
      cyber: 0,
      storage: 0,
      attribution: 0,
    },
  };
}

function loadState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return createDefaultState();
    }

    return ensureStateShape(JSON.parse(raw));
  } catch (_error) {
    return createDefaultState();
  }
}

function saveState() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (_error) {
    // Ignore storage failures in static mode.
  }
}

function clearStoredState() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (_error) {
    // Ignore storage failures in static mode.
  }
}

function ensureStateShape(raw) {
  const defaults = createDefaultState();
  return {
    ...defaults,
    ...raw,
    metrics: {
      ...defaults.metrics,
      ...(raw.metrics || {}),
    },
    patterns: {
      ...defaults.patterns,
      ...(raw.patterns || {}),
    },
    selectedTools: Array.isArray(raw.selectedTools) ? raw.selectedTools.filter((id) => TOOL_MAP.has(id)) : [],
    log: Array.isArray(raw.log) && raw.log.length ? raw.log : defaults.log,
    history: Array.isArray(raw.history) ? raw.history : [],
  };
}

function cloneMetrics(source) {
  return Object.fromEntries(Object.entries(source).map(([key, value]) => [key, value]));
}

function handleActionClick(event) {
  const target = event.target.closest("[data-action]");
  if (!target) return;

  const action = target.getAttribute("data-action");
  if (target.getAttribute("aria-disabled") === "true") return;

  if (action === "jump-to-game") {
    document.getElementById("game").scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  if (action === "toggle-tool") {
    toggleTool(target.getAttribute("data-tool-id"));
    return;
  }

  if (action === "clear-tools") {
    state.selectedTools = [];
    saveState();
    render();
    return;
  }

  if (action === "start-game") {
    startGame();
    return;
  }

  if (action === "reset-game") {
    resetGame();
    return;
  }

  if (action === "choose-option") {
    resolveChoice(target.getAttribute("data-choice-id"));
    return;
  }

  if (action === "continue") {
    continueFromResult();
  }
}

function render() {
  renderHero();
  renderPhaseNav();
  renderMetrics();
  renderProgress();
  renderToolSummary();
  renderDecisionLog();
  renderSourceList();
  renderStage();
}

function renderHero() {
  elements.pageEyebrow.textContent = page.heroEyebrow;
  elements.pageTheme.textContent = HERO_THEME_LINE;
  elements.pageHeading.textContent = page.heroTitle;
  elements.pageDek.textContent = page.heroDek;
  elements.pageContextLabel.textContent = page.contextLabel;
  elements.pageContextList.innerHTML = page.contextItems.map((item) => `<li>${item}</li>`).join("");
  elements.pageStatGrid.innerHTML = page.statCards
    .map(
      (card) => `
        <article class="hero-stat">
          <span class="mini-label">${card.label}</span>
          <strong>${card.value}</strong>
        </article>
      `,
    )
    .join("");
  elements.heroActions.innerHTML = getHeroActions();
}

function getHeroActions() {
  const actions = [];

  if (pageId === "prep" && state.gameStarted && state.currentEventIndex < EVENTS.length) {
    actions.push(
      `<a class="primary-button" href="${PAGE_CONFIG[getCurrentPlayablePageId()].path}">Resume Current Run</a>`,
    );
    actions.push('<button class="secondary-button" type="button" data-action="reset-game">Start Fresh</button>');
  } else if (pageId === "debrief") {
    actions.push('<button class="primary-button" type="button" data-action="reset-game">Run Another Winter</button>');
  } else if (pageId === "prep") {
    actions.push('<button class="primary-button" type="button" data-action="jump-to-game">Configure Posture</button>');
  } else {
    actions.push(`<a class="secondary-link" href="${PAGE_CONFIG.prep.path}">Open Preparation</a>`);
    actions.push('<button class="ghost-button" type="button" data-action="reset-game">Reset Exercise</button>');
  }

  actions.push(
    '<a class="secondary-link" href="https://www.renewableuk.com/media/pqobbk3c/new-threats-and-new-tools-reinventing-energy-security-for-an-era-of-instability.pdf" target="_blank" rel="noreferrer">Open External Dossier</a>',
  );

  return actions.join("");
}

function renderPhaseNav() {
  elements.phaseNav.innerHTML = PAGE_ORDER.map((id, index) => renderPhaseNavItem(id, index)).join("");
}

function renderPhaseNavItem(id, index) {
  const config = PAGE_CONFIG[id];
  const isCurrent = id === pageId;
  const unlocked = isPhaseUnlocked(id);
  const completed = isPhaseCompleted(id);
  const status = isCurrent ? "Current" : completed ? "Complete" : unlocked ? "Open" : "Locked";
  const className = `phase-nav-link${isCurrent ? " is-current" : ""}${completed ? " is-complete" : ""}${
    unlocked ? "" : " is-locked"
  }`;

  if (!unlocked) {
    return `
      <span class="${className}" aria-disabled="true">
        <span class="phase-nav-step">${config.step}</span>
        <span class="phase-nav-label">${config.label}</span>
        <span class="phase-nav-status">${status}</span>
      </span>
    `;
  }

  return `
    <a class="${className}" href="${config.path}">
      <span class="phase-nav-step">${config.step}</span>
      <span class="phase-nav-label">${config.label}</span>
      <span class="phase-nav-status">${status}</span>
    </a>
  `;
}

function isPhaseUnlocked(id) {
  if (id === "prep") return true;
  if (!state.gameStarted) return false;
  if (id === "scenario-one") return true;
  if (id === "scenario-two") return state.currentEventIndex >= 2;
  if (id === "scenario-three") return state.currentEventIndex >= 4;
  if (id === "debrief") return state.currentEventIndex >= EVENTS.length;
  return false;
}

function isPhaseCompleted(id) {
  if (!state.gameStarted) return false;
  if (id === "prep") return state.gameStarted;
  if (id === "scenario-one") return state.currentEventIndex >= 2;
  if (id === "scenario-two") return state.currentEventIndex >= 4;
  if (id === "scenario-three") return state.currentEventIndex >= EVENTS.length;
  if (id === "debrief") return state.currentEventIndex >= EVENTS.length;
  return false;
}

function renderMetrics() {
  Object.keys(METRIC_META).forEach((metric) => {
    const value = state.metrics[metric];
    const nodes = elements.metrics[metric];
    nodes.value.textContent = `${Math.round(value)}`;
    nodes.fill.style.width = `${value}%`;
    nodes.copy.textContent = getMetricCopy(metric, value);
  });
}

function getMetricCopy(metric, value) {
  const copy = METRIC_META[metric].copy;
  if (value >= 70) return copy.high;
  if (value >= 40) return copy.mid;
  return copy.low;
}

function renderProgress() {
  const completed = state.gameStarted
    ? Math.min(state.currentEventIndex + (state.pendingResolution ? 1 : 0), EVENTS.length)
    : 0;

  let text = "Choose two tools and lock your posture before the first move lands.";

  if (pageId === "prep" && state.gameStarted && state.currentEventIndex < EVENTS.length) {
    text = `Run in progress. Next playable phase: ${PAGE_CONFIG[getCurrentPlayablePageId()].label}.`;
  } else if (pageId !== "prep" && pageId !== "debrief") {
    text = `Working through ${page.label}.`;
    if (state.pendingResolution && getCurrentPlayablePageId() === pageId) {
      text = `Outcome logged. Review the result and keep the exercise moving.`;
    }
  } else if (pageId === "debrief") {
    text = "Exercise complete. Review the winter doctrine you built.";
  }

  elements.progressFill.style.width = `${(completed / EVENTS.length) * 100}%`;
  elements.progressText.textContent = text;
}

function renderToolSummary() {
  elements.toolCounter.textContent = `${state.selectedTools.length} / 2 selected`;

  if (!state.selectedTools.length) {
    elements.toolSummary.innerHTML =
      '<div class="empty-state">No tools selected yet. The preparation page is where the posture gets built.</div>';
    return;
  }

  elements.toolSummary.innerHTML = state.selectedTools
    .map((toolId) => {
      const tool = TOOL_MAP.get(toolId);
      return `
        <article class="summary-card">
          <p class="tool-tag">${tool.tag}</p>
          <h4>${tool.title}</h4>
          <p>${tool.description}</p>
          <div class="effect-list">
            ${tool.effectSummary.map((item) => `<span class="effect-pill">${item}</span>`).join("")}
          </div>
        </article>
      `;
    })
    .join("");
}

function renderDecisionLog() {
  if (!state.log.length) {
    elements.decisionLog.innerHTML = '<div class="empty-state">No decisions recorded yet.</div>';
    return;
  }

  elements.decisionLog.innerHTML = state.log
    .map(
      (entry) => `
        <article class="log-item">
          <span class="log-tag">${entry.tag}</span>
          <h4>${entry.title}</h4>
          <p>${entry.copy}</p>
        </article>
      `,
    )
    .join("");
}

function renderSourceList() {
  const pageItems = page.sources || [];
  elements.sourceList.innerHTML = [
    ...pageItems.map(
      (item) => `
        <article class="source-item">
          <h4>${item.title}</h4>
          <p>${item.detail}</p>
        </article>
      `,
    ),
    `
      <article class="source-item">
        <h4>External dossier</h4>
        <p>Source material and real-world background used to build this exercise.</p>
        <p class="source-meta">
          <a class="panel-link" href="https://www.renewableuk.com/media/pqobbk3c/new-threats-and-new-tools-reinventing-energy-security-for-an-era-of-instability.pdf" target="_blank" rel="noreferrer">Open source dossier (PDF)</a>
        </p>
      </article>
    `,
  ].join("");
}

function renderStage() {
  if (pageId === "prep") {
    renderPreparationStage();
    return;
  }

  if (pageId === "debrief") {
    renderDebriefStage();
    return;
  }

  renderScenarioStage();
}

function renderPreparationStage() {
  if (state.gameStarted && state.currentEventIndex < EVENTS.length) {
    const nextPage = PAGE_CONFIG[getCurrentPlayablePageId()];
    setStageHeader({
      chip: "Run In Progress",
      counter: `${Math.max(1, state.currentEventIndex + 1)} / 6 decisions`,
      title: "Your winter run is already live",
      lead:
        "You have already locked a posture and the crisis clock is running. Resume where you left off or reset the board and start a new winter from scratch.",
      signals: state.selectedTools.map((toolId) => TOOL_MAP.get(toolId).title),
    });

    elements.stageBody.innerHTML = `
      <article class="result-card">
        <p class="result-kicker">Situation</p>
        <h3 class="result-title">Control room standing by</h3>
        <p class="result-copy">
          The next open phase is <strong>${nextPage.label}</strong>. Your current posture and scores are being held in memory across the phase pages.
        </p>
        <div class="result-actions">
          <a class="primary-button" href="${nextPage.path}">Resume ${nextPage.label}</a>
          <button class="secondary-button" type="button" data-action="reset-game">Start Fresh</button>
        </div>
      </article>
    `;
    return;
  }

  setStageHeader({
    chip: "Preparation",
    counter: "0 / 6 decisions",
    title: "Choose the posture you will live with",
    lead:
      "You can only fund and operationalise two tools before the crisis starts. Those two choices will shape how every later decision lands.",
    signals: ["2 tools maximum", "Scores carry across pages", "No mid-crisis rebuild"],
  });

  const cards = TOOLS.map((tool) => {
    const isSelected = state.selectedTools.includes(tool.id);
    const isDisabled = !isSelected && state.selectedTools.length >= 2;
    return `
      <button
        type="button"
        class="tool-card${isSelected ? " is-selected" : ""}${isDisabled ? " is-disabled" : ""}"
        data-action="toggle-tool"
        data-tool-id="${tool.id}"
        ${isDisabled ? 'aria-disabled="true"' : ""}
      >
        <p class="tool-tag">${tool.tag}</p>
        <h3 class="tool-title">${tool.title}</h3>
        <p class="tool-copy">${tool.description}</p>
        <div class="effect-list">
          ${tool.effectSummary.map((item) => `<span class="effect-pill">${item}</span>`).join("")}
        </div>
      </button>
    `;
  }).join("");

  const canStart = state.selectedTools.length === 2;
  const note = state.gameStarted && state.currentEventIndex >= EVENTS.length
    ? "Last run complete. You can now lock a fresh posture and run the winter again."
    : "Once the first phase opens, your preparation choices are locked in until the run ends.";

  elements.stageBody.innerHTML = `
    <div class="prep-grid">${cards}</div>
    <div class="prep-actions">
      <button class="primary-button" type="button" data-action="start-game" ${canStart ? "" : "disabled"}>
        Start Winter Exercise
      </button>
      <button class="ghost-button" type="button" data-action="clear-tools">
        Clear Selection
      </button>
    </div>
    <p class="stage-note">${note}</p>
  `;
}

function renderScenarioStage() {
  const [start, end] = page.eventRange;

  if (!state.gameStarted) {
    renderLockedStage(
      "No active exercise",
      "Open the preparation page, choose two tools, and start the winter run before trying to enter this phase.",
      PAGE_CONFIG.prep.path,
      "Go to Preparation",
    );
    return;
  }

  if (state.currentEventIndex < start) {
    const nextPage = PAGE_CONFIG[getCurrentPlayablePageId()];
    renderLockedStage(
      "Phase locked",
      `This page is not open yet. The next live phase is ${nextPage.label}.`,
      nextPage.path,
      `Go to ${nextPage.label}`,
    );
    return;
  }

  if (state.currentEventIndex > end) {
    renderPhaseArchive(start, end);
    return;
  }

  const event = EVENTS[state.currentEventIndex];

  if (state.pendingResolution && state.pendingResolution.eventIndex === state.currentEventIndex) {
    renderResultStage(event, state.pendingResolution);
    return;
  }

  setStageHeader({
    chip: page.label,
    counter: `${state.currentEventIndex + 1} / 6 decisions`,
    title: event.title,
    lead: event.lead,
    signals: event.signals,
  });

  const choiceCards = event.choices
    .map((choice) => {
      const synergy = getSynergyText(choice);
      return `
        <button class="choice-card" type="button" data-action="choose-option" data-choice-id="${choice.id}">
          <span class="choice-tag">Decision option</span>
          <h3 class="choice-title">${choice.title}</h3>
          <p class="choice-copy">${choice.description}</p>
          <div class="choice-footer">
            ${synergy ? `<p class="choice-synergy">${synergy}</p>` : ""}
          </div>
        </button>
      `;
    })
    .join("");

  elements.stageBody.innerHTML = `
    <p class="stage-note">${event.prompt}</p>
    <div class="choice-grid">${choiceCards}</div>
    <p class="stage-note">${event.intelNote}</p>
  `;
}

function renderResultStage(event, resolution) {
  const nextLabel = getContinueLabel();
  setStageHeader({
    chip: page.label,
    counter: `${state.currentEventIndex + 1} / 6 decisions`,
    title: resolution.choiceTitle,
    lead: resolution.result,
    signals: event.signals,
  });

  const deltaChips = resolution.deltas
    .map(
      (delta) => `
        <span class="delta-chip ${delta.delta >= 0 ? "is-positive" : "is-negative"}">
          ${delta.delta >= 0 ? "+" : ""}${delta.delta} ${METRIC_META[delta.metric].shortLabel}
        </span>
      `,
    )
    .join("");

  const notesBlock = resolution.notes.length
    ? `
      <div class="bonus-block">
        <p class="result-kicker">Tool interactions</p>
        <div class="bonus-stack">
          ${resolution.notes.map((note) => `<div class="bonus-item">${note}</div>`).join("")}
        </div>
      </div>
    `
    : "";

  elements.stageBody.innerHTML = `
    <article class="result-card">
      <p class="result-kicker">Outcome</p>
      <h3 class="result-title">${resolution.choiceTitle}</h3>
      <div class="delta-row">${deltaChips}</div>
      <p class="result-copy">${resolution.result}</p>
      ${notesBlock}
      <div class="result-actions">
        <button class="primary-button" type="button" data-action="continue">${nextLabel}</button>
      </div>
    </article>
  `;
}

function renderPhaseArchive(start, end) {
  const phaseHistory = state.history.filter((item) => item.eventIndex >= start && item.eventIndex <= end);
  const nextPage = PAGE_CONFIG[getCurrentPlayablePageId()];

  setStageHeader({
    chip: page.label,
    counter: `${end + 1} / 6 decisions`,
    title: `${page.label} complete`,
    lead:
      "This phase has already been resolved. Review the calls you made here or move forward to the next live page in the run.",
    signals: phaseHistory.map((item) => item.choiceTitle),
  });

  elements.stageBody.innerHTML = `
    <div class="history-grid">
      ${phaseHistory
        .map(
          (item) => `
            <article class="history-card">
              <p class="tool-tag">${item.eventTitle}</p>
              <h4>${item.choiceTitle}</h4>
              <p class="history-copy">${item.result}</p>
            </article>
          `,
        )
        .join("")}
    </div>
    <div class="debrief-actions">
      <a class="primary-button" href="${nextPage.path}">Go to ${nextPage.label}</a>
    </div>
  `;
}

function renderDebriefStage() {
  if (!state.gameStarted || state.currentEventIndex < EVENTS.length) {
    const nextPage = PAGE_CONFIG[getCurrentPlayablePageId()];
    renderLockedStage(
      "Debrief unavailable",
      "The exercise is still live. Finish the remaining phase pages before opening the debrief.",
      nextPage.path,
      `Go to ${nextPage.label}`,
    );
    return;
  }

  const totalScore = getTotalScore();
  const ending = getEnding(totalScore);
  const insights = buildInsights();
  const recommendations = buildRecommendations();

  setStageHeader({
    chip: "Debrief",
    counter: "6 / 6 decisions",
    title: "The winter is over. The consequences are not.",
    lead:
      "Keeping the system live is not the same as keeping the country calm, solvent, and hard to coerce. This is the doctrine your decisions created.",
    signals: Object.entries(state.metrics).map(
      ([metric, value]) => `${Math.round(value)} ${METRIC_META[metric].shortLabel}`,
    ),
  });

  const historyCards = state.history
    .map(
      (item) => `
        <article class="history-card">
          <p class="tool-tag">${item.phase}</p>
          <h4>${item.eventTitle}</h4>
          <p class="history-choice">${item.choiceTitle}</p>
          <p class="history-copy">${item.result}</p>
          <div class="summary-row">
            ${item.deltas
              .map(
                (delta) =>
                  `<span class="summary-pill">${delta.delta >= 0 ? "+" : ""}${delta.delta} ${METRIC_META[delta.metric].shortLabel}</span>`,
              )
              .join("")}
          </div>
        </article>
      `,
    )
    .join("");

  elements.stageBody.innerHTML = `
    <div class="debrief-grid">
      <article class="ending-card">
        <div class="ending-banner">
          <div>
            <p class="result-kicker">Final assessment</p>
            <h3 class="ending-title">${ending.title}</h3>
            <p class="score-summary">${ending.copy}</p>
          </div>
          <div class="ending-score">
            <p class="ending-score-label">Aggregate resilience score (out of 400)</p>
            <p class="ending-score-value">${totalScore} / 400</p>
          </div>
        </div>
        <div class="scoreboard">
          ${Object.entries(state.metrics)
            .map(
              ([key, value]) => `
                <div class="score-card">
                  <span class="mini-label">${METRIC_META[key].label}</span>
                  <strong>${Math.round(value)} / 100</strong>
                  <p class="score-card-scale">Individual score out of 100</p>
                </div>
              `,
            )
            .join("")}
        </div>
      </article>

      <div>
        <p class="result-kicker">After-action readout</p>
        <div class="insight-grid">
          ${insights
            .map(
              (item) => `
                <article class="insight-card">
                  <h4 class="insight-title">${item.title}</h4>
                  <p class="insight-copy">${item.copy}</p>
                </article>
              `,
            )
            .join("")}
        </div>
      </div>

      <div>
        <p class="result-kicker">Weak points</p>
        <div class="recommendation-grid">
          ${recommendations
            .map(
              (item) => `
                <article class="recommendation-card">
                  <h4 class="recommendation-title">${item.title}</h4>
                  <p class="recommendation-copy">${item.copy}</p>
                </article>
              `,
            )
            .join("")}
        </div>
      </div>

      <div>
        <p class="result-kicker">Recorded timeline</p>
        <div class="history-grid">${historyCards}</div>
      </div>

      <div class="debrief-actions">
        <button class="primary-button" type="button" data-action="reset-game">Play Again</button>
      </div>
    </div>
  `;
}

function renderLockedStage(title, copy, href, ctaLabel) {
  setStageHeader({
    chip: page.label,
    counter: pageId === "debrief" ? "Debrief locked" : "Phase locked",
    title,
    lead: copy,
    signals: ["Locked", "Saved state preserved"],
  });

  elements.stageBody.innerHTML = `
    <article class="result-card">
      <p class="result-kicker">Access control</p>
      <h3 class="result-title">${title}</h3>
      <p class="result-copy">${copy}</p>
      <div class="result-actions">
        <a class="primary-button" href="${href}">${ctaLabel}</a>
      </div>
    </article>
  `;
}

function setStageHeader({ chip, counter, title, lead, signals }) {
  elements.phaseChip.textContent = chip;
  elements.eventCounter.textContent = counter;
  elements.stageTitle.textContent = title;
  elements.stageLead.textContent = lead;
  elements.signalRow.innerHTML = (signals || []).map((signal) => `<span class="signal-pill">${signal}</span>`).join("");
}

function toggleTool(toolId) {
  if (pageId !== "prep") return;
  if (!toolId) return;
  if (state.gameStarted && state.currentEventIndex < EVENTS.length) return;

  if (state.selectedTools.includes(toolId)) {
    state.selectedTools = state.selectedTools.filter((id) => id !== toolId);
    saveState();
    render();
    return;
  }

  if (state.selectedTools.length >= 2) return;

  state.selectedTools = [...state.selectedTools, toolId];
  saveState();
  render();
}

function startGame() {
  if (pageId !== "prep" || state.selectedTools.length !== 2) return;

  const lockedTools = [...state.selectedTools];
  state = createDefaultState();
  state.gameStarted = true;
  state.selectedTools = lockedTools.filter((id) => TOOL_MAP.has(id));

  state.metrics = cloneMetrics(BASE_METRICS);
  state.currentEventIndex = 0;
  state.pendingResolution = null;
  state.log = [
    {
      tag: "Prepared",
      title: "Winter posture locked",
      copy: state.selectedTools.map((toolId) => TOOL_MAP.get(toolId).title).join(" and "),
    },
  ];

  state.selectedTools.forEach((toolId) => {
    applyEffects(TOOL_MAP.get(toolId).setupEffects);
  });

  saveState();
  window.location.href = PAGE_CONFIG["scenario-one"].path;
}

function resolveChoice(choiceId) {
  const event = EVENTS[state.currentEventIndex];
  if (!event || pageId !== event.phasePage) return;

  const choice = event.choices.find((item) => item.id === choiceId);
  if (!choice) return;

  const cumulativeEffects = { stability: 0, trust: 0, fiscal: 0, clarity: 0 };
  const notes = [];

  mergeEffects(cumulativeEffects, choice.effects);

  (choice.bonuses || []).forEach((bonus) => {
    if (!state.selectedTools.includes(bonus.tool)) return;
    mergeEffects(cumulativeEffects, bonus.effects);
    notes.push(bonus.note);
  });

  const deltas = applyEffects(cumulativeEffects);
  updatePatterns(choice.tags);

  const resolution = {
    eventIndex: state.currentEventIndex,
    choiceTitle: choice.title,
    result: choice.result,
    deltas,
    notes,
  };

  state.history.push({
    eventIndex: state.currentEventIndex,
    phase: page.label,
    eventTitle: event.title,
    choiceTitle: choice.title,
    result: choice.result,
    deltas,
  });

  state.log.unshift({
    tag: page.label,
    title: choice.title,
    copy: choice.result,
  });

  state.pendingResolution = resolution;
  saveState();
  render();
}

function continueFromResult() {
  if (!state.pendingResolution) return;

  const isLastEvent = state.currentEventIndex === EVENTS.length - 1;
  const currentPageId = getPhaseForEventIndex(state.currentEventIndex);
  const phaseEnd = PAGE_CONFIG[currentPageId].eventRange[1];

  state.pendingResolution = null;

  if (isLastEvent) {
    state.currentEventIndex = EVENTS.length;
    saveState();
    window.location.href = PAGE_CONFIG.debrief.path;
    return;
  }

  if (state.currentEventIndex === phaseEnd) {
    state.currentEventIndex += 1;
    saveState();
    window.location.href = PAGE_CONFIG[getPhaseForEventIndex(state.currentEventIndex)].path;
    return;
  }

  state.currentEventIndex += 1;
  saveState();
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetGame() {
  state = createDefaultState();
  clearStoredState();

  if (pageId !== "prep") {
    window.location.href = PAGE_CONFIG.prep.path;
    return;
  }

  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function mergeEffects(target, source) {
  Object.entries(source || {}).forEach(([metric, delta]) => {
    target[metric] = (target[metric] || 0) + delta;
  });
}

function applyEffects(effects) {
  const deltas = [];

  Object.keys(METRIC_META).forEach((metric) => {
    const delta = Number(effects[metric] || 0);
    if (!delta) return;

    state.metrics[metric] = clamp(state.metrics[metric] + delta, 0, 100);
    deltas.push({ metric, delta });
  });

  return deltas;
}

function updatePatterns(tags) {
  (tags || []).forEach((tag) => {
    state.patterns[tag] = (state.patterns[tag] || 0) + 1;
  });
}

function getPhaseForEventIndex(index) {
  if (index <= 1) return "scenario-one";
  if (index <= 3) return "scenario-two";
  if (index <= 5) return "scenario-three";
  return "debrief";
}

function getCurrentPlayablePageId() {
  if (!state.gameStarted) return "prep";
  if (state.currentEventIndex >= EVENTS.length) return "debrief";
  return getPhaseForEventIndex(state.currentEventIndex);
}

function getContinueLabel() {
  const isLastEvent = state.currentEventIndex === EVENTS.length - 1;
  if (isLastEvent) return "Go to Debrief";

  const currentPageId = getPhaseForEventIndex(state.currentEventIndex);
  const phaseEnd = PAGE_CONFIG[currentPageId].eventRange[1];
  if (state.currentEventIndex === phaseEnd) {
    const nextPage = PAGE_CONFIG[getPhaseForEventIndex(state.currentEventIndex + 1)];
    return `Continue to ${nextPage.label}`;
  }

  return "Proceed to Next Decision";
}

function getSynergyText(choice) {
  const matchedTools = (choice.bonuses || [])
    .filter((bonus) => state.selectedTools.includes(bonus.tool))
    .map((bonus) => TOOL_MAP.get(bonus.tool).title);

  if (!matchedTools.length) return "";
  if (matchedTools.length === 1) return `Live synergy: ${matchedTools[0]}`;
  return `Live synergy: ${matchedTools.join(" + ")}`;
}

function getTotalScore() {
  return Math.round(Object.values(state.metrics).reduce((total, value) => total + value, 0));
}

function getEnding(totalScore) {
  if (totalScore >= 300) {
    return {
      title: "Resilient winter",
      copy:
        "You kept the system upright without leaning on a single blunt instrument. The country still paid a price, but the pressure spread across buffers, flexibility, and shared discipline instead of collapsing into panic.",
    };
  }

  if (totalScore >= 240) {
    return {
      title: "Managed but exposed",
      copy:
        "You prevented a breakdown, but one or two flanks stayed open. The system survived because your choices worked together, not because any one of them solved the whole problem.",
    };
  }

  if (totalScore >= 180) {
    return {
      title: "Expensive stability",
      copy:
        "You kept the country moving, but mainly by spending heavily or absorbing dangerous ambiguity. It worked for this winter. It may not work for the next one.",
    };
  }

  return {
    title: "Fragile calm",
    copy:
      "The country did not fully lose control, but it came out of winter easier to pressure than it should have been. Too much of the burden still fell on blind spots, luck, and expensive fuel.",
  };
}

function buildInsights() {
  const insights = [];

  if (state.patterns.demand + state.patterns.public >= 3) {
    insights.push({
      title: "You turned the public into part of the machine",
      copy:
        "That gave you options beyond simply buying more supply. Once homes and firms started moving with the system instead of only watching it, the response became harder to corner.",
    });
  } else {
    insights.push({
      title: "Demand stayed too passive",
      copy:
        "Too much of the burden fell on supply-side fixes. When people never move, every shock ends up landing harder on markets and budgets.",
    });
  }

  if (state.patterns.cyber + state.patterns.coordination >= 3) {
    insights.push({
      title: "You treated cyber ambiguity as a live battlefield",
      copy:
        "That helped you see the network as one system instead of a collection of operators hoping the problem stayed local.",
    });
  } else {
    insights.push({
      title: "You let local containment do too much work",
      copy:
        "Quiet fixes kept some moments cleaner, but they also left the wider system blind longer than was safe.",
    });
  }

  if (state.patterns.supply + state.patterns.cost >= 3) {
    insights.push({
      title: "You kept reaching for bought calm",
      copy:
        "That can stabilise the screen in front of you, but it leaves the deeper pressure points standing exactly where the next shock can find them.",
    });
  } else {
    insights.push({
      title: "You spread the burden of survival",
      copy:
        "Buffers, flexibility, and coordination took more of the strain, which means the same kind of attack is less likely to corner you the same way twice.",
    });
  }

  return insights.slice(0, 3);
}

function buildRecommendations() {
  const sortedMetrics = Object.entries(state.metrics)
    .sort(([, a], [, b]) => a - b)
    .map(([metric]) => metric);

  const recommendations = [];

  sortedMetrics.slice(0, 2).forEach((metric) => {
    if (metric === "stability") {
      recommendations.push({
        title: "Build more buffer before the next winter",
        copy:
          "You need more time in the system: gas storage, long-duration power storage, and spare hardware that can be moved fast under pressure.",
      });
    }

    if (metric === "trust") {
      recommendations.push({
        title: "Train the country before you ask it to bend",
        copy:
          "Public cooperation is strongest when it feels rehearsed and fair. Right now, too much still depends on people hearing a crisis ask cold.",
      });
    }

    if (metric === "fiscal") {
      recommendations.push({
        title: "Stop making the Treasury your emergency generator",
        copy:
          "A system that only stays calm when it spends big is still easy to pressure. You need more non-fiscal options on the board.",
      });
    }

    if (metric === "clarity") {
      recommendations.push({
        title: "Widen the field of view",
        copy:
          "Lower reporting thresholds, tighter telemetry sharing, and better cyber escalation would help you see trouble earlier and move with more confidence.",
      });
    }
  });

  if (!recommendations.some((item) => item.title.includes("North Sea"))) {
    recommendations.push({
      title: "Make the North Sea a defended operating space",
      copy:
        "Regional monitoring, patrol coordination, and shared awareness should be built as daily capability, not improvised after a strike.",
      });
  }

  return recommendations.slice(0, 3);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
