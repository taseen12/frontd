import {
  LayoutDashboard,
  // Users,
  // Bath,
  // Command,
  Video,
  Radar,
  HeartPulse,
  Cpu,
  BellRing,
  // Brain,
  ClipboardList,
  Activity,
  Pill,
  ClipboardCheck,
  AlertTriangle,
  FileText,
  UserCog,
  Boxes,
  UserCheck,
  Shield,
  BarChart3,
  Headset,
  Settings,
  MapPin
} from "lucide-react";

export const sidebarMenu = [
  /* =========================
     1. AI & IoT Intelligence
  ========================== */
  {
    id: "ai",
    title: "AI & IoT Intelligence",
    children: [
      {
        title: "Live Dashboard",
        icon: LayoutDashboard,
        path: "/live-monitoring",
        children: [
          // {
          //   title: "Patient",
          //   icon: Users,
          //   path: "/live-monitoring-module/patient"
          // },
          // {
          //   title: "Washroom",
          //   icon: Bath,
          //   path: "/live-monitoring-module/washroom"
          // }
        ]
      },
      // {
      //   title: "Facility Command",
      //   icon: Command,
      //   path: "/facility-command"
      // },
      {
        title: "Posture Monitoring",
        icon: Video,
        path: "/posture-monitoring"
      },
      {
        title: "Bathroom Radar",
        icon: Radar,
        path: "/washroom-monitoring"
      },
      {
        title: "VitalWatch Pro",
        icon: HeartPulse,
        path: "/watch-monitoring"
      },
      {
        title: "IoT Device Health",
        icon: Cpu,
        path: "/iot-device-health"
      },
      {
        title: "AI & Alert Settings",
        icon: BellRing,
        path: "/ai-alert-settings"
      },
      // {
      //   title: "Predictions AI",
      //   icon: Brain,
      //   path: "/predictions"
      // }
    ]
  },

  /* =========================
     2. Facility Management
  ========================== */
  {
    id: "facility",
    title: "Facility Management",
    children: [
      // {
      //   title: "Residents",
      //   icon: ClipboardList,
      //   path: "/patients"
      // },
      {
        title: "Residents Intake",
        icon: ClipboardList,
        path: "/residents"
      },
      {
        title: "Clinical Dashboard",
        icon: Activity,
        path: "/clinical-dashboard"
      },
      {
        title: "Medication Charts",
        icon: Pill,
        path: "/medication-charts"
      },
      {
        title: "Care Planning",
        icon: ClipboardCheck,
        path: "/care-planning"
      },
      {
        title: "SIRS & Incidents",
        icon: AlertTriangle,
        path: "/sirs-incidents"
      }
    ]
  },

  /* =========================
     3. Administrative Job
  ========================== */
  {
    id: "admin-job",
    title: "Administrative Job",
    children: [
      {
        title: "Policy",
        icon: FileText,
        path: "/policy"
      },
      {
        title: "Staff",
        icon: UserCog,
        path: "/staff"
      },
      {
        title: "Inventory",
        icon: Boxes,
        path: "/inventory"
      },
      {
        title: "Visitors",
        icon: UserCheck,
        path: "/visitors"
      },
      {
        title: "Admin",
        icon: Shield,
        path: "/admin"
      }
    ]
  },

  /* =========================
     4. CI & Executive
  ========================== */
  {
    id: "ci-executive",
    title: "CI & Executive",
    children: [
      {
        title: "CI Register (PCI)",
        icon: ClipboardList,
        path: "/ci-register"
      },
      {
        title: "Executive Summary",
        icon: BarChart3,
        path: "/executive-summary"
      },
      {
        title: "Contact & Support",
        icon: Headset,
        path: "/support"
      },
      {
        title: "Configurations",
        icon: Settings,
        path: "/configurations"
      }
    ]
  },

  /* =========================
     5. Staff Locator
  ========================== */
  {
    id: "staff-locator",
    title: "Staff Locator",
    children: [
      {
        title: "Live Staff Map",
        icon: MapPin,
        path: "/staff-locator"
      }
    ]
  }
];
