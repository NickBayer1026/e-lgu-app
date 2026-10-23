"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  ALL_REQUESTS,
  CITIZEN_REQUESTS,
  DEFAULT_SETTINGS,
  SERVICES,
  type CitizenRequest,
  type MunicipalitySettings,
  type RequestStatus,
  type Service,
} from "@/lib/mock-data";

const INITIAL_REQUESTS: CitizenRequest[] = [
  ...CITIZEN_REQUESTS,
  ...ALL_REQUESTS,
];

interface AppStateValue {
  requests: CitizenRequest[];
  services: Service[];
  settings: MunicipalitySettings;
  addRequest: (request: CitizenRequest) => void;
  updateRequestStatus: (id: string, status: RequestStatus) => void;
  addService: (service: Service) => void;
  updateService: (service: Service) => void;
  updateSettings: (settings: MunicipalitySettings) => void;
}

const AppStateContext = createContext<AppStateValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [requests, setRequests] = useState<CitizenRequest[]>(INITIAL_REQUESTS);
  const [services, setServices] = useState<Service[]>(SERVICES);
  const [settings, setSettings] =
    useState<MunicipalitySettings>(DEFAULT_SETTINGS);

  const addRequest = useCallback((request: CitizenRequest) => {
    setRequests((previous) => [request, ...previous]);
  }, []);

  const updateRequestStatus = useCallback(
    (id: string, status: RequestStatus) => {
      setRequests((previous) =>
        previous.map((request) =>
          request.id === id ? { ...request, status } : request
        )
      );
    },
    []
  );

  const addService = useCallback((service: Service) => {
    setServices((previous) => [service, ...previous]);
  }, []);

  const updateService = useCallback((service: Service) => {
    setServices((previous) =>
      previous.map((item) => (item.id === service.id ? service : item))
    );
  }, []);

  const updateSettings = useCallback((next: MunicipalitySettings) => {
    setSettings(next);
  }, []);

  const value = useMemo<AppStateValue>(
    () => ({
      requests,
      services,
      settings,
      addRequest,
      updateRequestStatus,
      addService,
      updateService,
      updateSettings,
    }),
    [
      requests,
      services,
      settings,
      addRequest,
      updateRequestStatus,
      addService,
      updateService,
      updateSettings,
    ]
  );

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
}

const SERVICE_CODES: Record<string, string> = {
  "Barangay Clearance": "BC",
  "Business Permit": "BP",
  "Certificate of Indigency": "CI",
  Cedula: "CD",
  "Community Tax (Cedula)": "CD",
};

function getServiceCode(serviceName: string) {
  const known = SERVICE_CODES[serviceName];
  if (known) return known;

  const words = serviceName
    .replace(/[^a-zA-Z ]/g, "")
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) return "XX";

  const code =
    words.length > 1
      ? words
          .slice(0, 2)
          .map((word) => word[0])
          .join("")
      : words[0].slice(0, 2);

  return code.toUpperCase().padEnd(2, "X");
}

/**
 * Builds a tracking ID in the same format used by the mock data:
 * `LGU-2026-BC-1042`. The sequence continues from the highest existing
 * sequence for that service so IDs stay unique as requests are added.
 */
export function generateTrackingId(
  serviceName: string,
  requests: CitizenRequest[]
) {
  const code = getServiceCode(serviceName);
  const prefix = `LGU-2026-${code}-`;

  const highest = requests.reduce((max, request) => {
    if (!request.trackingId.startsWith(prefix)) return max;
    const sequence = Number.parseInt(
      request.trackingId.slice(prefix.length),
      10
    );
    return Number.isFinite(sequence) ? Math.max(max, sequence) : max;
  }, 1000);

  return `${prefix}${String(highest + 1).padStart(4, "0")}`;
}
