"use client"

import { Card } from "../ui/card"
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Heart, Wind, Thermometer } from "lucide-react"

// Sample data for the charts
const heartRateData = [
  { time: "00:00", rate: 68 },
  { time: "04:00", rate: 65 },
  { time: "08:00", rate: 72 },
  { time: "12:00", rate: 75 },
  { time: "16:00", rate: 78 },
  { time: "20:00", rate: 72 },
  { time: "24:00", rate: 70 },
]

const oxygenLevelData = [
  { time: "00:00", level: 97 },
  { time: "04:00", level: 96 },
  { time: "08:00", level: 98 },
  { time: "12:00", level: 99 },
  { time: "16:00", level: 98 },
  { time: "20:00", level: 97 },
  { time: "24:00", level: 98 },
]

const temperatureData = [
  { time: "00:00", temp: 98.2 },
  { time: "04:00", temp: 97.8 },
  { time: "08:00", temp: 98.4 },
  { time: "12:00", temp: 98.6 },
  { time: "16:00", temp: 98.5 },
  { time: "20:00", temp: 98.3 },
  { time: "24:00", temp: 98.1 },
]

export default function VitalsChartSection() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Vital Signs Trends</h2>
        <p className="text-sm text-muted-foreground">24-hour graphical view of patient vital signs</p>
      </div>

      {/* <div className="grid grid-cols-1 gap-6 lg:grid-cols-3"> */}
      <div className="">
        {/* Heart Rate Chart */}
        <Card className="border-2 border-red-200 dark:border-red-800 p-6 mb-3">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-red-100 dark:bg-red-900 p-2">
                <Heart className="h-5 w-5 text-red-600 dark:text-red-300" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Heart Rate</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-300">72 bpm</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={heartRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" style={{ fontSize: "12px" }} />
                <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: "12px" }} domain={[60, 85]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line type="monotone" dataKey="rate" stroke="#dc2626" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Oxygen Level Chart */}
        <Card className="border-2 border-blue-200 dark:border-blue-800 p-6 mb-3
        ">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-blue-100 dark:bg-blue-900 p-2">
                <Wind className="h-5 w-5 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Oxygen Level</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">98%</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={oxygenLevelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" style={{ fontSize: "12px" }} />
                <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: "12px" }} domain={[94, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Area type="monotone" dataKey="level" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Temperature Chart */}
        <Card className="border-2 border-orange-200 dark:border-orange-800 p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-orange-100 dark:bg-orange-900 p-2">
                <Thermometer className="h-5 w-5 text-orange-600 dark:text-orange-300" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Temperature</p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-300">98.6°F</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" style={{ fontSize: "12px" }} />
                <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: "12px" }} domain={[97, 99]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line type="monotone" dataKey="temp" stroke="#ea580c" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  )
}
