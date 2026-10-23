export type RequestStatus =
  | "Pending"
  | "Under Review"
  | "Approved"
  | "Ready for Pickup"
  | "Rejected";

/**
 * Service names are dynamic because administrators can add new services at
 * runtime, so requests store the service name as a free-form string.
 */
export type ServiceType = string;

export interface Service {
  id: string;
  name: string;
  description: string;
  processingTime: string;
  fee: string;
  icon: string;
}

export interface CitizenRequest {
  id: string;
  trackingId: string;
  citizen: string;
  service: ServiceType;
  date: string;
  status: RequestStatus;
  notes?: string;
}

export interface Citizen {
  name: string;
  address: string;
  email: string;
  contact: string;
  barangay: string;
  city: string;
}

/* ------------------------------------------------------------------ */
/* SERVICES (View 1)                                                   */
/* ------------------------------------------------------------------ */
export const SERVICES: Service[] = [
  {
    id: "barangay-clearance",
    name: "Barangay Clearance",
    description:
      "Certificate of residency and good moral character issued by the barangay.",
    processingTime: "2–3 working days",
    fee: "₱50.00",
    icon: "file-check",
  },
  {
    id: "business-permit",
    name: "Business Permit",
    description:
      "Application for Mayor's / Business Permit to legally operate a business.",
    processingTime: "3–5 working days",
    fee: "₱500.00",
    icon: "store",
  },
  {
    id: "certificate-of-indigency",
    name: "Certificate of Indigency",
    description:
      "Proof of financial status for medical, scholarship, and aid assistance.",
    processingTime: "1–2 working days",
    fee: "Free",
    icon: "hand-heart",
  },
  {
    id: "cedula",
    name: "Community Tax (Cedula)",
    description:
      "Issuance of Community Tax Certificate (CTC) for residents and businesses.",
    processingTime: "Same day",
    fee: "₱5.00",
    icon: "receipt",
  },
];

/* ------------------------------------------------------------------ */
/* CITIZEN PROFILE + REQUESTS (View 2)                                */
/* ------------------------------------------------------------------ */
export const CITIZEN: Citizen = {
  name: "Nick Bayer",
  address: "Blk 12, Lot 5, Phase 3",
  barangay: "San Isidro",
  city: "Dapitan City, Zamboanga del Norte",
  email: "nick.bayer@email.com",
  contact: "+63 917 555 0123",
};

export const CITIZEN_REQUESTS: CitizenRequest[] = [
  {
    id: "r1",
    trackingId: "LGU-2026-BC-1042",
    citizen: "Nick Bayer",
    service: "Barangay Clearance",
    date: "Oct 20, 2026",
    status: "Ready for Pickup",
  },
  {
    id: "r2",
    trackingId: "LGU-2026-BP-0871",
    citizen: "Nick Bayer",
    service: "Business Permit",
    date: "Oct 14, 2026",
    status: "Pending",
  },
  {
    id: "r3",
    trackingId: "LGU-2026-CI-0633",
    citizen: "Nick Bayer",
    service: "Certificate of Indigency",
    date: "Oct 06, 2026",
    status: "Approved",
  },
  {
    id: "r4",
    trackingId: "LGU-2026-CD-0510",
    citizen: "Nick Bayer",
    service: "Cedula",
    date: "Sep 28, 2026",
    status: "Rejected",
    notes: "Invalid photo ID submitted. Please re-submit.",
  },
];

/* ------------------------------------------------------------------ */
/* ADMIN METRICS + RECENT REQUESTS (View 3)                           */
/* ------------------------------------------------------------------ */
export const ADMIN_METRICS = {
  totalRequests: 3842,
  pendingApprovals: 156,
  completedToday: 84,
  avgProcessingDays: 2.4,
};

export const RECENT_REQUESTS: CitizenRequest[] = [
  {
    id: "a1",
    trackingId: "LGU-2026-BC-2451",
    citizen: "Maria Santos",
    service: "Barangay Clearance",
    date: "Oct 23, 2026",
    status: "Pending",
  },
  {
    id: "a2",
    trackingId: "LGU-2026-BP-2108",
    citizen: "Jose Ramirez",
    service: "Business Permit",
    date: "Oct 23, 2026",
    status: "Under Review",
  },
  {
    id: "a3",
    trackingId: "LGU-2026-CI-1894",
    citizen: "Ana Bautista",
    service: "Certificate of Indigency",
    date: "Oct 22, 2026",
    status: "Approved",
  },
  {
    id: "a4",
    trackingId: "LGU-2026-CD-1657",
    citizen: "Reynaldo Cruz",
    service: "Cedula",
    date: "Oct 22, 2026",
    status: "Ready for Pickup",
  },
  {
    id: "a5",
    trackingId: "LGU-2026-BC-1523",
    citizen: "Liza Mendoza",
    service: "Barangay Clearance",
    date: "Oct 21, 2026",
    status: "Rejected",
  },
  {
    id: "a6",
    trackingId: "LGU-2026-BP-1405",
    citizen: "Carlo Villanueva",
    service: "Business Permit",
    date: "Oct 21, 2026",
    status: "Pending",
  },
  {
    id: "a7",
    trackingId: "LGU-2026-CI-1298",
    citizen: "Grace Aquino",
    service: "Certificate of Indigency",
    date: "Oct 20, 2026",
    status: "Approved",
  },
];

/* ------------------------------------------------------------------ */
/* ANALYTICS DATA                                                      */
/* ------------------------------------------------------------------ */
export const REQUESTS_BY_SERVICE = [
  { service: "Barangay Clearance", requests: 1410 },
  { service: "Business Permit", requests: 980 },
  { service: "Certificate of Indigency", requests: 862 },
  { service: "Cedula", requests: 590 },
];

export const SUBMISSION_VOLUME_30_DAYS = [
  { date: "Sep 24", requests: 118 },
  { date: "Sep 26", requests: 132 },
  { date: "Sep 28", requests: 96 },
  { date: "Sep 30", requests: 145 },
  { date: "Oct 02", requests: 128 },
  { date: "Oct 04", requests: 152 },
  { date: "Oct 06", requests: 110 },
  { date: "Oct 08", requests: 138 },
  { date: "Oct 10", requests: 163 },
  { date: "Oct 12", requests: 121 },
  { date: "Oct 14", requests: 149 },
  { date: "Oct 16", requests: 173 },
  { date: "Oct 18", requests: 142 },
  { date: "Oct 20", requests: 158 },
  { date: "Oct 22", requests: 184 },
];

export const REQUEST_STATUS_COLORS = {
  Pending: "#f59e0b",
  "Under Review": "#3b82f6",
  Approved: "#10b981",
  "Ready for Pickup": "#0ea5e9",
  Rejected: "#f43f5e",
} as const;

export const OVERALL_REQUEST_STATUS = [
  { status: "Pending", value: 156, fill: REQUEST_STATUS_COLORS.Pending },
  {
    status: "Under Review",
    value: 92,
    fill: REQUEST_STATUS_COLORS["Under Review"],
  },
  { status: "Approved", value: 2388, fill: REQUEST_STATUS_COLORS.Approved },
  {
    status: "Ready for Pickup",
    value: 1110,
    fill: REQUEST_STATUS_COLORS["Ready for Pickup"],
  },
  { status: "Rejected", value: 96, fill: REQUEST_STATUS_COLORS.Rejected },
];

export const OVERALL_STATUS_TOTAL = OVERALL_REQUEST_STATUS.reduce(
  (sum, item) => sum + item.value,
  0
);

/* ------------------------------------------------------------------ */
/* ADMIN: ALL REQUESTS (combined table)                                */
/* ------------------------------------------------------------------ */
export const ALL_REQUESTS: CitizenRequest[] = [
  ...RECENT_REQUESTS,
  {
    id: "a8",
    trackingId: "LGU-2026-BC-1187",
    citizen: "Ramil Dizon",
    service: "Barangay Clearance",
    date: "Oct 19, 2026",
    status: "Under Review",
  },
  {
    id: "a9",
    trackingId: "LGU-2026-BP-0970",
    citizen: "Sonia Ramos",
    service: "Business Permit",
    date: "Oct 18, 2026",
    status: "Pending",
  },
  {
    id: "a10",
    trackingId: "LGU-2026-CI-0862",
    citizen: "Pedro Navarro",
    service: "Certificate of Indigency",
    date: "Oct 17, 2026",
    status: "Approved",
  },
  {
    id: "a11",
    trackingId: "LGU-2026-CD-0741",
    citizen: "Fely Lim",
    service: "Cedula",
    date: "Oct 16, 2026",
    status: "Ready for Pickup",
  },
  {
    id: "a12",
    trackingId: "LGU-2026-BC-0655",
    citizen: "Arnel Gonzales",
    service: "Barangay Clearance",
    date: "Oct 15, 2026",
    status: "Pending",
    notes: "Supporting documents incomplete.",
  },
];

/* ------------------------------------------------------------------ */
/* ADMIN: CITIZENS registry                                            */
/* ------------------------------------------------------------------ */
export interface CitizenRegistry {
  id: string;
  name: string;
  gender: string;
  age: number;
  barangay: string;
  email: string;
  contact: string;
  verified: boolean;
  requests: number;
}

export const CITIZENS: CitizenRegistry[] = [
  { id: "c1", name: "Nick Bayer", gender: "M", age: 32, barangay: "San Isidro", email: "nick.bayer@email.com", contact: "+63 917 555 0123", verified: true, requests: 4 },
  { id: "c2", name: "Maria Santos", gender: "F", age: 28, barangay: "Santo Rosario", email: "maria.santos@email.com", contact: "+63 918 555 1204", verified: true, requests: 2 },
  { id: "c3", name: "Jose Ramirez", gender: "M", age: 45, barangay: "San Nicolas", email: "jose.ramirez@email.com", contact: "+63 919 555 2301", verified: true, requests: 6 },
  { id: "c4", name: "Ana Bautista", gender: "F", age: 23, barangay: "Dolores", email: "ana.bautista@email.com", contact: "+63 920 555 4420", verified: false, requests: 1 },
  { id: "c5", name: "Reynaldo Cruz", gender: "M", age: 51, barangay: "San Agustin", email: "reynaldo.cruz@email.com", contact: "+63 921 555 3308", verified: true, requests: 8 },
  { id: "c6", name: "Liza Mendoza", gender: "F", age: 36, barangay: "Dapitan", email: "liza.mendoza@email.com", contact: "+63 922 555 5510", verified: true, requests: 3 },
  { id: "c7", name: "Carlo Villanueva", gender: "M", age: 29, barangay: "San Lazaro", email: "carlo.villanueva@email.com", contact: "+63 923 555 2200", verified: false, requests: 1 },
  { id: "c8", name: "Grace Aquino", gender: "F", age: 41, barangay: "San Matias", email: "grace.aquino@email.com", contact: "+63 924 555 6612", verified: true, requests: 5 },
  { id: "c9", name: "Ramil Dizon", gender: "M", age: 38, barangay: "San Isidro", email: "ramil.dizon@email.com", contact: "+63 925 555 7713", verified: true, requests: 2 },
  { id: "c10", name: "Sonia Ramos", gender: "F", age: 52, barangay: "Santo Niño", email: "sonia.ramos@email.com", contact: "+63 926 555 8824", verified: true, requests: 7 },
];

/* ------------------------------------------------------------------ */
/* ADMIN: services config                                              */
/* ------------------------------------------------------------------ */
export interface ServiceConfig {
  id: string;
  name: ServiceType;
  category: string;
  fee: string;
  processingTime: string;
  status: "Active" | "Maintenance";
  requirements: string[];
}

export const SERVICE_CONFIGS: ServiceConfig[] = [
  {
    id: "sc1",
    name: "Barangay Clearance",
    category: "Clearance",
    fee: "₱50.00",
    processingTime: "2–3 working days",
    status: "Active",
    requirements: ["Valid Government ID", "Proof of Residency"],
  },
  {
    id: "sc2",
    name: "Business Permit",
    category: "Permit",
    fee: "₱500.00",
    processingTime: "3–5 working days",
    status: "Active",
    requirements: ["BUS Form", "Barangay Clearance", "Duly notarized lease contract"],
  },
  {
    id: "sc3",
    name: "Certificate of Indigency",
    category: "Certificate",
    fee: "Free",
    processingTime: "1–2 working days",
    status: "Active",
    requirements: ["Barangay Verification", "Valid Government ID"],
  },
  {
    id: "sc4",
    name: "Cedula",
    category: "Tax",
    fee: "₱5.00",
    processingTime: "Same day",
    status: "Active",
    requirements: ["ICT form", "Proof of Income"],
  },
];

/* ------------------------------------------------------------------ */
/* ADMIN: reports                                                      */
/* ------------------------------------------------------------------ */
export const MONTHLY_REQUESTS = [
  { month: "May", count: 580 },
  { month: "Jun", count: 640 },
  { month: "Jul", count: 690 },
  { month: "Aug", count: 710 },
  { month: "Sep", count: 702 },
  { month: "Oct", count: 520 },
];

/* ------------------------------------------------------------------ */
/* ADMIN: settings                                                     */
/* ------------------------------------------------------------------ */
export interface MunicipalitySettings {
  municipalityName: string;
  primaryHall: string;
  officeHours: string;
  contactNumber: string;
  defaultReviewDays: string;
  notificationPreference: string;
}

export const DEFAULT_SETTINGS: MunicipalitySettings = {
  municipalityName: "City Government of Dapitan",
  primaryHall: "City Hall, Barangay Sto. Niño",
  officeHours: "Mon–Fri, 8:00 AM – 5:00 PM",
  contactNumber: "(065) 555-1234",
  defaultReviewDays: "2",
  notificationPreference: "both",
};

export const DATA_LAST_UPDATED = "Oct 23, 2026";
