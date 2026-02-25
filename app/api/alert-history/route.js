export async function GET() {

  // Mock data - replace with your database query
  const alertHistory = [
    {
      activityType: "High Heart Rate",
      level: "critical",
      triggerTime: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
    },
    {
      activityType: "Low Oxygen Level",
      level: "warning",
      triggerTime: new Date(Date.now() - 5 * 60 * 60000).toISOString(),
    },
    {
      activityType: "Abnormal Temperature",
      level: "critical",
      triggerTime: new Date(Date.now() - 24 * 60 * 60000).toISOString(),
    },
  ]

  return Response.json({ alertHistory })
}
