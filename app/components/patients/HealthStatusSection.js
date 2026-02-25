"use client"

import { AlertCircle, TrendingUp, Thermometer, Activity, Zap } from "lucide-react"
import { Card } from '../ui/card';

const getStatusColor = (status) => {
  switch (status) {
    case "normal":
      return "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"
    case "risk":
      return "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800"
    case "high-risk":
      return "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800"
    default:
      return "bg-card"
  }
}

const getStatusTextColor = (status) => {
  switch (status) {
    case "normal":
      return "text-primaryColor dark:text-green-300"
    case "risk":
      return "text-yellow-700 dark:text-yellow-300"
    case "high-risk":
      return "text-red-700 dark:text-red-300"
    default:
      return "text-foreground"
  }
}

const getStatusBadgeColor = (status) => {
  switch (status) {
    case "normal":
      return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
    case "risk":
      return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
    case "high-risk":
      return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export default function HealthStatusSection() {
  const healthStatuses = [
    {
      label: "Position Status",
      value: "Sitting",
      status: "normal",
      icon: <Activity className="h-6 w-6" />,
    },
    {
      label: "Blood Pressure",
      value: "120/80 mmHg",
      status: "normal",
      icon: <TrendingUp className="h-6 w-6" />,
    },
    {
      label: "Temperature",
      value: "98.6°F",
      status: "normal",
      icon: <Thermometer className="h-6 w-6" />,
    },
    {
      label: "Oxygen Level",
      value: "98%",
      status: "normal",
      icon: <Zap className="h-6 w-6" />,
    },
    {
      label: "Heart Rate",
      value: "72 bpm",
      status: "normal",
      icon: <AlertCircle className="h-6 w-6" />,
    },
  ]

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Live Status</h2>
        <p className="text-sm text-muted-foreground">Real-time patient vital signs and status indicators</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {healthStatuses.map((health, index) => (
          <Card key={index} className={`border-2 p-4 transition-all ${getStatusColor(health.status)}`}>
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className={`rounded-lg p-2 ${getStatusBadgeColor(health.status)}`}>{health.icon}</div>
                <span
                  className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${getStatusBadgeColor(health.status)}`}
                >
                  {health.status === "normal" ? "Normal" : health.status === "risk" ? "Risk" : "High Risk"}
                </span>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground">{health.label}</p>
                <p className={`text-lg font-bold ${getStatusTextColor(health.status)}`}>{health.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
