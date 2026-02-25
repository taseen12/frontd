export async function GET() {

  // Mock alert history data - replace with actual database query
  const mockAlertHistory = [
    {
      activityType: "High Blood Pressure",
      level: "critical",
      triggerTime: new Date(Date.now() - 30 * 60000).toISOString(),
    },
    {
      activityType: "Low Oxygen Level",
      level: "warning",
      triggerTime: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
    },
    {
      activityType: "Irregular Heart Rate",
      level: "critical",
      triggerTime: new Date(Date.now() - 5 * 60 * 60000).toISOString(),
    },
  ]

  return Response.json({ alertHistory: mockAlertHistory })
}
