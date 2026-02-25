export async function GET() {

  // Mock data - replace with your database query
  const now = new Date()
  const activityLogs = [
    {
      activityType: "Walking",
      level: "normal",
      startTime: new Date(now - 30 * 60000).toISOString(),
      endTime: new Date(now - 10 * 60000).toISOString(),
    },
    {
      activityType: "Sitting",
      level: "normal",
      startTime: new Date(now - 60 * 60000).toISOString(),
      endTime: new Date(now - 30 * 60000).toISOString(),
    },
    {
      activityType: "Standing",
      level: "warning",
      startTime: new Date(now - 120 * 60000).toISOString(),
      endTime: new Date(now - 60 * 60000).toISOString(),
    },
  ]

  return Response.json({ activityLogs })
}
