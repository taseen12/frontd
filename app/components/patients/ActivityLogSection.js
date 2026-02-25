"use client"

import { useState, useEffect } from "react"
import { AlertCircle, Activity, Clock, Square, Play } from "lucide-react"
import { getActivityAlert, getActivityHistory, getActivityLog } from './../../../services/patientDetailsService';

export default function ActivityLogSection({ patientId }) {
  const [selectedPeriod, setSelectedPeriod] = useState("1")
  const [activityLog, setActivityLog] = useState([])
  const [activityPolicy, setActivityPolicy] = useState([])
  const [activityHistory, setActivityHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [policyPage, setPolicyPage] = useState(1);
  const policyPerPage = 5;
  const [historyPage, setHistoryPage] = useState(1);
  const historyPerPage = 5;

  useEffect(() => {
    fetchActivityLog();
  }, [patientId, selectedPeriod]);


  useEffect(() => {
    if (!patientId) return; // Prevent API calls if patientId is missing
    fetchAllData();
  }, [patientId, selectedPeriod])

  // --- Unified fetch function ---
  const fetchAllData = async () => {
    setLoading(true)
    try {
      await Promise.all([
        fetchActivityPolicy(),
        fetchActivityHistory()
      ])
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchActivityLog = async () => {
    try {
      const response = await getActivityLog(patientId, selectedPeriod);
      setActivityLog(response?.activityLog || []);
    } catch (error) {
      console.error("Error fetching activity log:", error);
      setActivityLog([]);
    }
  };

  const fetchActivityPolicy = async () => {
    try {
      const data = await getActivityAlert(patientId)
      setActivityPolicy(data?.activityAlerts || [])
    } catch (error) {
      console.error("Error fetching activity alerts:", error)
      setActivityPolicy([])
    }
  }

  const fetchActivityHistory = async () => {
    try {
      const response = await getActivityHistory(patientId)
      setActivityHistory(response?.healthAlerts || [])
    } catch (error) {
      console.error("Error fetching activity history:", error)
      setActivityHistory([])
    }
  }

  const timePeriods = [
    { value: "1", label: "1 Hour" },
    { value: "2", label: "2 Hours" },
    { value: "12", label: "12 Hours" },
    { value: "24", label: "1 Day" },
  ]

  // Filter logs by selected hour range
  // const filteredActivityLog = activityLog.filter((log) => {
  //   const selectedHours = Number(selectedPeriod);

  //   const logTime = new Date(log.activityStart).getTime();
  //   const now = Date.now();

  //   const diffInHours = (now - logTime) / (1000 * 60 * 60);

  //   return diffInHours <= selectedHours;
  // });

  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const paginatedData = filteredActivityLog.slice(startIndex, startIndex + itemsPerPage);
  // const totalPages = Math.ceil(filteredActivityLog.length / itemsPerPage);

  // Pagination for Activity Log
  const totalPages = Math.ceil(activityLog.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedActivity = activityLog.slice(indexOfFirstItem, indexOfLastItem);


  // Pagination for Policy
  const totalPolicyPages = Math.ceil(activityPolicy.length / policyPerPage);
  const policyStartIndex = (policyPage - 1) * policyPerPage;
  const paginatedPolicy = activityPolicy.slice(
    policyStartIndex,
    policyStartIndex + policyPerPage
  );
  // Pagination for HIstory
  const totalHistoryPages = Math.ceil(activityHistory.length / historyPerPage);
  const historyStartIndex = (historyPage - 1) * historyPerPage;
  const paginatedHistory = activityHistory.slice(
    historyStartIndex,
    historyStartIndex + historyPerPage
  );




  const getLevelBadgeColor = (level) => {
    switch (level) {
      case "Normal":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "Critical":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      case "Danger":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Log Card */}
        <div className="rounded-lg border border-border bg-background p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Activity Log</h3>
            </div>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {timePeriods.map((period) => (
                <option key={period.value} value={period.value}>
                  {period.label}
                </option>
              ))}
            </select>

          </div>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-sm text-muted-foreground">Loading activities...</div>
            </div>
          ) : paginatedActivity.length > 0 ? (
            <div className="space-y-3">
              {paginatedActivity.map((log, index) => (
                <div key={index} className="border-b border-border pb-3 last:border-b-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-sm font-bold text-foreground">{log.activityTypeName}</p>
                      {/* <div className="mt-1 space-y-1">
                        <p className="text-xs text-muted-foreground">
                          Start: {new Date(log.activityStart).toLocaleTimeString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          End: {new Date(log.activityEnd).toLocaleTimeString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Duration: {log.duration}
                        </p>
                      </div> */}
                      <div className="flex flex-wrap gap-2">
                        {/* Start Time Card */}
                        <div className="flex-1 min-w-[120px] bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg p-2.5 border border-blue-200 dark:border-blue-800 hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <Play className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                            <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-tight">{new Date(log.activityStart).toLocaleTimeString()}</span>
                          </div>
                        </div>

                        {/* End Time Card */}
                        <div className="flex-1 min-w-[120px] bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg p-2.5 border border-green-200 dark:border-green-800 hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <Square className="w-3.5 h-3.5 text-primaryColor dark:text-green-400" />
                            <span className="text-xs font-semibold text-primaryColor dark:text-green-300 uppercase tracking-tight">End</span>
                          </div>
                          <p className="text-xs font-bold text-green-900 dark:text-green-100">{new Date(log.activityEnd).toLocaleTimeString()}</p>
                        </div>

                        {/* Duration Card */}
                        <div className="flex-1 min-w-[120px] bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-lg p-2.5 border border-purple-200 dark:border-purple-800 hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <Clock className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                            <span className="text-xs font-semibold text-purple-700 dark:text-purple-300 uppercase tracking-tight">Duration</span>
                          </div>
                          <p className="text-xs font-bold text-purple-900 dark:text-purple-100">{log.duration}</p>
                        </div>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium flex-shrink-0 ${getLevelBadgeColor(log.activityLevelName)}`}
                    >
                      {log.activityLevelName}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          ) : (
            <div className="flex items-center justify-center py-8">
              <div className="text-sm text-muted-foreground">No activities in this period</div>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>

              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}

        </div>

        {/* Activity Policy Card */}
        <div className="rounded-lg border border-border bg-background p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-orange-500 dark:text-orange-400" />
            <h3 className="text-lg font-semibold text-foreground">Activity Alerts</h3>
          </div>

          {paginatedPolicy.length > 0 ? (
            <div className="space-y-3">
              {paginatedPolicy.map((alert, index) => (
                <div key={index} className="border-b border-border pb-3 last:border-b-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {alert.activityTypeName}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Triggered: {new Date(alert.timeStamp).toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium flex-shrink-0 ${getLevelBadgeColor(
                        alert.activityLevelName
                      )}`}
                    >
                      {alert.activityLevelName}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-8">
              <div className="text-sm text-muted-foreground">No activity alerts</div>
            </div>
          )}

          {/* Pagination */}
          {totalPolicyPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-4">
              <button
                onClick={() => setPolicyPage((p) => Math.max(p - 1, 1))}
                disabled={policyPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>

              <span className="text-sm">
                Page {policyPage} of {totalPolicyPages}
              </span>

              <button
                onClick={() => setPolicyPage((p) => Math.min(p + 1, totalPolicyPages))}
                disabled={policyPage === totalPolicyPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Alert History Card */}
        <div className="rounded-lg border border-border bg-background p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
            <h3 className="text-lg font-semibold text-foreground">Alert History</h3>
          </div>

          {paginatedHistory.length > 0 ? (
            <div className="space-y-3">
              {paginatedHistory.map((history, index) => (
                <div key={index} className="border-b border-border pb-3 last:border-b-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{history.healthType}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Triggered: {new Date(history.timeStamp).toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium flex-shrink-0 ${getLevelBadgeColor(history.healthLevelName)}`}
                    >
                      {history.healthLevelName}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-8">
              <div className="text-sm text-muted-foreground">No alerts</div>
            </div>
          )}
          {/* Pagination */}
          {totalHistoryPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-4">
              <button
                onClick={() => setHistoryPage((p) => Math.max(p - 1, 1))}
                disabled={historyPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>

              <span className="text-sm">
                Page {historyPage} of {totalHistoryPages}
              </span>

              <button
                onClick={() => setHistoryPage((p) => Math.min(p + 1, totalHistoryPages))}
                disabled={historyPage === totalHistoryPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
