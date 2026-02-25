export async function GET(request, { params }) {
  const { patientId } = params
  const { searchParams } = new URL(request.url)
  const period = searchParams.get("period") || "1"

  // Calculate time range
  const now = new Date()
  const hoursAgo = new Date(now.getTime() - Number.parseInt(period) * 60 * 60 * 1000)

  console.log(`[v0] Fetching activity logs for patient ${patientId} from ${hoursAgo} to ${now}`)

  const mockActivityLogs = [
    {
      activityType: "Blood Pressure Measured",
      level: "normal",
      startTime: new Date(now.getTime() - 10 * 60 * 1000).toISOString(),
      endTime: new Date(now.getTime() - 5 * 60 * 1000).toISOString(),
    },
    {
      activityType: "Temperature Check",
      level: "normal",
      startTime: new Date(now.getTime() - 25 * 60 * 1000).toISOString(),
      endTime: new Date(now.getTime() - 20 * 60 * 1000).toISOString(),
    },
    {
      activityType: "Oxygen Level Recorded",
      level: "warning",
      startTime: new Date(now.getTime() - 40 * 60 * 1000).toISOString(),
      endTime: new Date(now.getTime() - 35 * 60 * 1000).toISOString(),
    },
    {
      activityType: "Heart Rate Monitored",
      level: "normal",
      startTime: new Date(now.getTime() - 55 * 60 * 1000).toISOString(),
      endTime: new Date(now.getTime() - 50 * 60 * 1000).toISOString(),
    },
  ]

  const mockAlertHistory =
    period === "1"
      ? []
      : [
          {
            activityType: "Elevated Blood Pressure",
            level: "critical",
            triggerTime: new Date(now.getTime() - 90 * 60 * 1000).toISOString(),
          },
          {
            activityType: "Low Oxygen Level",
            level: "warning",
            triggerTime: new Date(now.getTime() - 120 * 60 * 1000).toISOString(),
          },
        ]

  return Response.json({
    activityLogs: mockActivityLogs,
    alertHistory: mockAlertHistory,
    period,
    timeRange: {
      from: hoursAgo.toISOString(),
      to: now.toISOString(),
    },
  })
}
