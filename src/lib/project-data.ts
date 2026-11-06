export interface ProjectPhase {
  id: string;
  order: number;
  code: string;
  name: string;
  short: string;
  duration: string;
  weeksLabel: string;
  startWeek: number;
  endWeek: number;
  progress: number;
  activities: string[];
  deliverable: string;
  icon: string;
}

export const PROJECT_OVERVIEW = {
  title: "e-LGU: Local Government Service Management and Online Request System",
  tagline:
    "A web-based system that lets citizens submit government service requests online and helps LGU employees manage, monitor, and process them in one centralized system.",
  goal: "To develop a user-friendly system that makes LGU services more organized, accessible, and efficient for citizens and government employees.",
  duration: "12 Weeks",
  budget: "₱70,000",
  teamSize: 5,
  location: "Dapitan City, Zamboanga del Norte",
};

export const PROJECT_OBJECTIVES = [
  "Allow citizens to submit service requests online",
  "Provide citizens with a way to monitor the status of their requests",
  "Help LGU employees manage requests in one centralized system",
  "Reduce paperwork and manual recording",
  "Improve the speed and organization of LGU services",
  "Provide better records and reports for LGU administrators",
];

export const SCOPE_INCLUDED = [
  "Citizen registration and login",
  "Citizen profile management",
  "Online service request submission",
  "Uploading of required documents",
  "Request status tracking",
  "LGU employee/admin dashboard",
  "Request approval/rejection workflow",
  "Notification of request status",
  "Search and management of citizen records",
  "Basic reports and statistics",
  "Secure login and user access control",
];

export const SCOPE_EXCLUDED = [
  "Online payment processing",
  "Actual delivery of government documents",
  "Integration with national government databases",
  "Advanced AI features",
  "Full mobile application",
];

/* ------------------------------------------------------------------ */
/* SCHEDULE: 8 phases over 12 weeks                                   */
/* ------------------------------------------------------------------ */
export const PROJECT_PHASES: ProjectPhase[] = [
  {
    id: "planning",
    order: 1,
    code: "1.0",
    name: "Planning",
    short: "Planning",
    duration: "1 week",
    weeksLabel: "Week 1",
    startWeek: 1,
    endWeek: 1,
    progress: 100,
    activities: [
      "Identify LGU problems and requirements",
      "Define project scope and objectives",
      "Set up project management tools",
      "Create project documentation",
    ],
    deliverable: "Project Plan Document",
    icon: "clipboard",
  },
  {
    id: "analysis",
    order: 2,
    code: "2.0",
    name: "Analysis",
    short: "Analysis",
    duration: "1 week",
    weeksLabel: "Week 2",
    startWeek: 2,
    endWeek: 2,
    progress: 100,
    activities: [
      "Gather system requirements from stakeholders",
      "Document functional requirements",
      "Create use case diagrams",
      "Define user stories",
    ],
    deliverable: "Requirements Specification Document",
    icon: "scale",
  },
  {
    id: "design",
    order: 3,
    code: "3.0",
    name: "Design",
    short: "Design",
    duration: "2 weeks",
    weeksLabel: "Weeks 3–4",
    startWeek: 3,
    endWeek: 4,
    progress: 100,
    activities: [
      "Design UI/UX wireframes and mockups",
      "Design database schema",
      "Create system architecture diagram",
      "Design workflow diagrams",
    ],
    deliverable: "UI Mockups · Database Schema · System Architecture",
    icon: "palette",
  },
  {
    id: "development",
    order: 4,
    code: "4.0",
    name: "Development",
    short: "Development",
    duration: "4 weeks",
    weeksLabel: "Weeks 5–8",
    startWeek: 5,
    endWeek: 8,
    progress: 100,
    activities: [
      "Set up environment and backend foundation",
      "Build citizen portal (registration, profile, requests, document upload)",
      "Build LGU admin dashboard and approval workflows",
      "Build reports, search, notifications, and integration",
    ],
    deliverable: "Functional System",
    icon: "code",
  },
  {
    id: "testing",
    order: 5,
    code: "5.0",
    name: "Testing",
    short: "Testing",
    duration: "1 week",
    weeksLabel: "Week 9",
    startWeek: 9,
    endWeek: 9,
    progress: 60,
    activities: [
      "Perform unit and integration testing",
      "Conduct user acceptance testing (UAT)",
      "Document and fix bugs",
      "Perform security testing",
    ],
    deliverable: "Test Report · Bug Fix Log",
    icon: "bug",
  },
  {
    id: "deployment",
    order: 6,
    code: "6.0",
    name: "Deployment",
    short: "Deployment",
    duration: "1 week",
    weeksLabel: "Week 10",
    startWeek: 10,
    endWeek: 10,
    progress: 0,
    activities: [
      "Configure server/hosting environment",
      "Deploy system to production",
      "Verify all features work correctly",
      "Set up backup procedures",
    ],
    deliverable: "Live System",
    icon: "rocket",
  },
  {
    id: "evaluation",
    order: 7,
    code: "7.0",
    name: "Evaluation",
    short: "Evaluation",
    duration: "1 week",
    weeksLabel: "Week 11",
    startWeek: 11,
    endWeek: 11,
    progress: 0,
    activities: [
      "Conduct user testing with LGU staff",
      "Gather citizen feedback",
      "Document issues and suggestions",
      "Plan improvements",
    ],
    deliverable: "Evaluation Report",
    icon: "clipboard-check",
  },
  {
    id: "finalization",
    order: 8,
    code: "8.0",
    name: "Finalization",
    short: "Finalization",
    duration: "1 week",
    weeksLabel: "Week 12",
    startWeek: 12,
    endWeek: 12,
    progress: 0,
    activities: [
      "Implement final improvements",
      "Complete system documentation and user manuals",
      "Create video presentation / pitch",
      "Final project submission",
    ],
    deliverable: "Final System · Documentation · Video Pitch",
    icon: "flag",
  },
];

export const TOTAL_WEEKS = 12;

/* ------------------------------------------------------------------ */
/* WBS                                                                */
/* ------------------------------------------------------------------ */
export interface WbsLevel {
  id: string;
  phase: string;
  tasks: string[];
}

export const WBS_LEVELS: WbsLevel[] = [
  {
    id: "w1",
    phase: "1.0 Planning",
    tasks: [
      "1.1 Identify LGU problems & requirements",
      "1.2 Define scope and objectives",
      "1.3 Set up project management tools",
      "1.4 Create project documentation",
    ],
  },
  {
    id: "w2",
    phase: "2.0 Analysis",
    tasks: [
      "2.1 Gather stakeholder requirements",
      "2.2 Document functional requirements",
      "2.3 Create use case diagrams",
      "2.4 Define user stories",
    ],
  },
  {
    id: "w3",
    phase: "3.0 Design",
    tasks: [
      "3.1 UI/UX wireframes and mockups",
      "3.2 Database schema",
      "3.3 System architecture",
      "3.4 Workflow diagrams",
    ],
  },
  {
    id: "w4",
    phase: "4.0 Development",
    tasks: [
      "4.1 Environment setup & backend foundation",
      "4.2 Citizen portal module",
      "4.3 Admin dashboard module",
      "4.4 Reports, search & integration",
    ],
  },
  {
    id: "w5",
    phase: "5.0 Testing",
    tasks: [
      "5.1 Unit testing",
      "5.2 Integration testing",
      "5.3 User acceptance testing (UAT)",
      "5.4 Security testing & bug fixing",
    ],
  },
  {
    id: "w6",
    phase: "6.0 Deployment",
    tasks: [
      "6.1 Server/hosting configuration",
      "6.2 Production deployment",
      "6.3 Feature verification",
      "6.4 Backup procedures",
    ],
  },
  {
    id: "w7",
    phase: "7.0 Evaluation",
    tasks: [
      "7.1 Stakeholder testing",
      "7.2 Citizen feedback gathering",
      "7.3 Issues documentation & improvement plan",
    ],
  },
  {
    id: "w8",
    phase: "8.0 Finalization",
    tasks: [
      "8.1 Final improvements",
      "8.2 Documentation & user manuals",
      "8.3 Video presentation / pitch",
      "8.4 Final project submission",
    ],
  },
];

export const WBS_ROOT = "e-LGU System";

/* ------------------------------------------------------------------ */
/* BUDGET                                                             */
/* ------------------------------------------------------------------ */
export interface BudgetItem {
  id: string;
  item: string;
  cost: number;
}

export const BUDGET_ITEMS: BudgetItem[] = [
  { id: "b1", item: "Computer/Development Equipment", cost: 25000 },
  { id: "b2", item: "Server/Hosting", cost: 15000 },
  { id: "b3", item: "Internet/Networking", cost: 5000 },
  { id: "b4", item: "Domain Name", cost: 1500 },
  { id: "b5", item: "Software/Development Tools", cost: 5000 },
  { id: "b6", item: "System Testing & Maintenance", cost: 8000 },
  { id: "b7", item: "Training & Documentation", cost: 5000 },
  { id: "b8", item: "Contingency", cost: 5500 },
];

export const TOTAL_BUDGET = BUDGET_ITEMS.reduce((sum, b) => sum + b.cost, 0);

export const formatPeso = (n: number) => "₱" + n.toLocaleString("en-PH");

/* ------------------------------------------------------------------ */
/* TEAM                                                               */
/* ------------------------------------------------------------------ */
export type WorkPersonality =
  | "Deliverer"
  | "Prototype"
  | "Perfector"
  | "Producer"
  | "Fixer"
  | "Finisher";

export const WORK_PERSONALITIES: Record<
  WorkPersonality,
  { label: string; description: string }
> = {
  Deliverer: {
    label: "Deliverer",
    description:
      "Turns plans into completed work and keeps commitments on schedule.",
  },
  Prototype: {
    label: "Prototype",
    description:
      "Explores ideas through mockups, experiments, and early versions.",
  },
  Perfector: {
    label: "Perfector",
    description:
      "Refines details and upholds quality, accuracy, and consistency.",
  },
  Producer: {
    label: "Producer",
    description:
      "Generates steady output and keeps the work moving forward.",
  },
  Fixer: {
    label: "Fixer",
    description: "Diagnoses problems and finds practical solutions.",
  },
  Finisher: {
    label: "Finisher",
    description:
      "Closes out loose ends and makes sure the work is truly complete.",
  },
};

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  personality: WorkPersonality[];
  skills: string[];
  preferredTasks: string;
  reason: string;
  responsibilities: string;
  deliverables: string[];
  icon: string;
  image?: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "t1",
    name: "Nicholas Orlino P. Bayron",
    role: "Project Manager & Programmer",
    personality: ["Deliverer", "Finisher"],
    skills: ["Leadership", "Communication", "Organization"],
    preferredTasks:
      "Coordinate tasks, monitor progress, and help the team meet deadlines.",
    reason:
      "To organize the team, coordinate project activities, and ensure tasks are completed on time.",
    responsibilities:
      "Coordinate the team, assign tasks, monitor progress and deadlines, and help develop system features and program code.",
    deliverables: [
      "Project schedule",
      "Task assignments",
      "Progress updates",
      "System code contributions",
    ],
    icon: "leadership",
    image: "/member images/Nicholas1.png",
  },
  {
    id: "t2",
    name: "Bon Barry Brioso",
    role: "System Analyst",
    personality: ["Fixer"],
    skills: ["System analysis", "Problem-solving", "Requirements gathering"],
    preferredTasks:
      "Gather user requirements, analyze user needs, and identify system problems.",
    reason:
      "To identify citizens' and LGU staff's needs and plan how the e-LGU system should work.",
    responsibilities:
      "Gather requirements, analyze users' needs, identify problems, and define the workflow.",
    deliverables: [
      "Requirements document",
      "System requirements",
      "Workflow diagram",
    ],
    icon: "search",
    image: "/member images/Barry1.png",
  },
  {
    id: "t3",
    name: "Cipreano Mellomida",
    role: "UI/UX Designer",
    personality: ["Prototype"],
    skills: ["Creativity", "Designing", "Attention to detail"],
    preferredTasks:
      "Design the user interface and improve the user experience.",
    reason:
      "To make the e-LGU system user-friendly and easy to navigate.",
    responsibilities:
      "Plan the layout and navigation; design clear screens and a simple user experience.",
    deliverables: ["Wireframes or screen mockups", "Basic interface design"],
    icon: "palette",
    image: "/member images/Cipreano1.png",
  },
  {
    id: "t4",
    name: "Regie Inding",
    role: "Web Developer / Programmer",
    personality: ["Producer"],
    skills: ["Coding", "Logical thinking", "Problem-solving"],
    preferredTasks:
      "Write code, develop system features, and fix programming errors.",
    reason:
      "To develop e-LGU features, such as submitting document requests and checking request status.",
    responsibilities:
      "Build system features, write code, connect screens to system functions, and fix errors.",
    deliverables: ["Working web pages/features", "Program code"],
    icon: "code",
    image: "/member images/Regie1.png",
  },
  {
    id: "t5",
    name: "Christian Mark Baje",
    role: "Database / Technical Role",
    personality: ["Perfector"],
    skills: ["Data management", "Organization", "Technical problem-solving"],
    preferredTasks:
      "Organize data, design database tables, and maintain data accuracy.",
    reason:
      "To store and manage citizens' information and document requests accurately and securely.",
    responsibilities:
      "Design and organize database tables; maintain accurate and secure records.",
    deliverables: ["Database structure", "Tables", "Organized data records"],
    icon: "database",
    image: "/member images/Mark1.png",
  },
];

/* ------------------------------------------------------------------ */
/* CONTACT                                                            */
/* ------------------------------------------------------------------ */
export const CONTACT = {
  org: "e-LGU Project Group",
  email: "elgu.project.group@gmail.com",
  location: "Dapitan City, Zamboanga del Norte",
  note: "Academic prototype for Laboratory Exercise 2 — Software Project Schedule & Portfolio",
};

/* ------------------------------------------------------------------ */
/* PROJECT COMMUNICATION PLAN                                         */
/* ------------------------------------------------------------------ */
export type StakeholderType = "Internal" | "External";

export interface CommunicationStakeholder {
  id: string;
  stakeholder: string;
  type: StakeholderType;
  role: string;
  involvement: string;
}

export const COMMUNICATION_STAKEHOLDERS: CommunicationStakeholder[] = [
  {
    id: "cs1",
    stakeholder: "Project Sponsor",
    type: "External",
    role: "LGU Administrator / City Mayor's Office representative",
    involvement:
      "Approves the project direction, budget, and final acceptance of the e-LGU system.",
  },
  {
    id: "cs2",
    stakeholder: "Project Manager",
    type: "Internal",
    role: "Nicholas Orlino P. Bayron — project lead and main contact",
    involvement:
      "Leads planning, assigns tasks, monitors progress, and coordinates communication with all stakeholders.",
  },
  {
    id: "cs3",
    stakeholder: "Project Team Members",
    type: "Internal",
    role: "Bon (System Analyst), Cipreano (UI/UX Designer), Regie (Web Developer / Programmer), and Christian Mark (Database / Technical)",
    involvement:
      "Perform assigned tasks and report progress, issues, and completed deliverables.",
  },
  {
    id: "cs4",
    stakeholder: "Web Developer / Programmer",
    type: "Internal",
    role: "Regie Inding — builds and integrates the system features",
    involvement:
      "Shares development progress, completed features, and technical blockers with the team.",
  },
  {
    id: "cs5",
    stakeholder: "LGU Employees / Admin Staff",
    type: "External",
    role: "End users who process, approve, and monitor service requests",
    involvement:
      "Use the admin dashboard and provide feedback on workflows, records, and reports.",
  },
  {
    id: "cs6",
    stakeholder: "Citizens / Residents",
    type: "External",
    role: "End users who request LGU services online",
    involvement:
      "Submit requests, upload requirements, and track the status of their requests.",
  },
  {
    id: "cs7",
    stakeholder: "Course Instructor / Evaluator",
    type: "External",
    role: "Academic adviser and project evaluator",
    involvement:
      "Reviews project documentation, monitors progress, and evaluates the final system output.",
  },
];

export interface CommunicationObjective {
  id: string;
  title: string;
  objective: string;
  detail: string;
}

export const COMMUNICATION_OBJECTIVES: CommunicationObjective[] = [
  {
    id: "co1",
    title: "Keep the team aligned",
    objective:
      "To keep all team members informed about project progress, task assignments, and deadlines.",
    detail:
      "Daily updates and a weekly group meeting keep every member aware of what is done, what comes next, and what is blocking the work.",
  },
  {
    id: "co2",
    title: "Gather accurate requirements",
    objective:
      "To gather clear requirements and user feedback from LGU staff and citizens.",
    detail:
      "Interviews, user acceptance testing, and short surveys confirm that the system matches real service workflows and user needs.",
  },
  {
    id: "co3",
    title: "Keep decision-makers updated",
    objective:
      "To keep the project sponsor and instructor updated on milestones, risks, and approvals.",
    detail:
      "Formal progress reports and email updates give decision-makers the information they need at the right time.",
  },
  {
    id: "co4",
    title: "Keep one source of truth",
    objective:
      "To document decisions and deliverables in a shared location that everyone can access.",
    detail:
      "A shared drive and task board prevent lost messages and conflicting versions of plans, requirements, and designs.",
  },
  {
    id: "co5",
    title: "Resolve issues quickly",
    objective:
      "To resolve questions and blockers quickly through clear channels and response expectations.",
    detail:
      "The team agrees on where to ask for help, who to escalate to, and how soon a response should be expected.",
  },
];

export interface CommunicationMatrixRow {
  id: string;
  stakeholder: string;
  information: string;
  method: string;
  frequency: string;
  responsible: string;
}

export const COMMUNICATION_MATRIX: CommunicationMatrixRow[] = [
  {
    id: "cm1",
    stakeholder: "Project Sponsor",
    information:
      "Project status, milestone approvals, budget, and scope decisions",
    method: "Formal progress report and email",
    frequency: "Every two weeks / at milestones",
    responsible: "Nicholas (Project Manager)",
  },
  {
    id: "cm2",
    stakeholder: "Project Manager",
    information: "Task assignments, deadlines, blockers, and meeting agenda",
    method: "Group chat and weekly group meeting",
    frequency: "Daily / weekly",
    responsible: "Nicholas (Project Manager)",
  },
  {
    id: "cm3",
    stakeholder: "Project Team Members",
    information: "Task progress, issues, and completed deliverables",
    method: "Group chat and shared task board",
    frequency: "Daily",
    responsible: "Nicholas (Project Manager)",
  },
  {
    id: "cm9",
    stakeholder: "Web Developer / Programmer",
    information:
      "Development progress, completed features, and technical blockers",
    method: "Group chat, shared task board, and technical huddle",
    frequency: "Daily / weekly",
    responsible: "Regie (Web Developer / Programmer)",
  },
  {
    id: "cm4",
    stakeholder: "UI/UX Designer",
    information: "Screen mockups, design revisions, and usability feedback",
    method: "Design review meeting and shared mockups",
    frequency: "Per design milestone",
    responsible: "Cipreano (UI/UX Designer)",
  },
  {
    id: "cm5",
    stakeholder: "LGU Employees / Admin Staff",
    information:
      "Workflow requirements, system feedback, and testing results",
    method: "Interview and user acceptance testing (UAT)",
    frequency: "As needed / during testing and evaluation",
    responsible: "Bon (System Analyst)",
  },
  {
    id: "cm6",
    stakeholder: "Citizens / Residents",
    information:
      "Feedback on request submission, tracking, and overall usability",
    method: "Short survey and user interview",
    frequency: "As needed / during evaluation",
    responsible: "Bon (System Analyst)",
  },
  {
    id: "cm7",
    stakeholder: "Database / Technical",
    information: "Data requirements, schema changes, and security concerns",
    method: "Technical huddle and group chat",
    frequency: "Weekly / as needed",
    responsible: "Christian Mark (Database / Technical)",
  },
  {
    id: "cm8",
    stakeholder: "Course Instructor / Evaluator",
    information:
      "Progress reports, project documentation, and final system output",
    method: "Email and consultation meeting",
    frequency: "Per submission / monthly",
    responsible: "Nicholas (Project Manager)",
  },
];

export interface CommunicationMethod {
  id: string;
  method: string;
  channel: string;
  purpose: string;
  bestFor: string;
  icon: string;
}

export const COMMUNICATION_METHODS: CommunicationMethod[] = [
  {
    id: "cmeth1",
    method: "Group Chat",
    channel: "Messenger or Discord group",
    purpose:
      "For daily updates, quick questions, reminders, and immediate alerts about blockers.",
    bestFor: "Daily coordination and urgent concerns",
    icon: "chat",
  },
  {
    id: "cmeth2",
    method: "Weekly Group Meeting",
    channel: "Face-to-face or video call",
    purpose:
      "To review progress, plan the week's tasks, resolve issues, and confirm the next deliverables.",
    bestFor: "Planning, review, and issue resolution",
    icon: "meeting",
  },
  {
    id: "cmeth3",
    method: "Email",
    channel: "Official group email",
    purpose:
      "For formal requests, approvals, document submission, and a written record of important decisions.",
    bestFor: "Formal communication and documentation",
    icon: "email",
  },
  {
    id: "cmeth4",
    method: "Shared Task Board & Documentation",
    channel: "Google Drive, Trello, or Notion",
    purpose:
      "To store plans, meeting minutes, requirements, designs, and task status in one shared reference.",
    bestFor: "Documentation and progress tracking",
    icon: "board",
  },
  {
    id: "cmeth5",
    method: "Interview / Focus Group / UAT Session",
    channel: "In person or video call",
    purpose:
      "To gather requirements and usability feedback from LGU staff and citizens, and to validate the system.",
    bestFor: "Requirements gathering and user feedback",
    icon: "interview",
  },
];