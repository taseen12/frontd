"use client"

import { useState, useEffect } from "react"
import { Card } from "../ui/card"
import { User, Bird as ID, Circle } from "lucide-react"
import { getPatientProfile } from "@/services/patientService"

export default function PatientProfileSection({patientId}) {
  const [ patientData, setPatientData] = useState({})

  useEffect(() => {
    const fetchPatientData = async () => {
        try {
          const response = await getPatientProfile(patientId)
          setPatientData(response?.patient)
        } catch (error) {
          console.error("Error fetching activity history:", error)
        }
    }
    fetchPatientData()

  }, [])

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Left Side - Patient Picture */}
      <div className="flex flex-col items-center gap-4">
        <Card className="flex h-64 w-64 items-center justify-center overflow-hidden bg-muted">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <User className="h-16 w-16" />
            <span className="text-sm">Patient Photo</span>
          </div>
        </Card>
        <button className="text-sm text-primary hover:underline">Upload Photo</button>
      </div>

      {/* Right Side - Personal Information */}
      <div className="lg:col-span-2">
        <Card className="p-6">
          <h2 className="mb-6 text-xl font-semibold text-foreground">Personal Information</h2>

          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <User className="h-4 w-4" />
                  First Name
                </div>
                <p className="mt-1 text-base text-foreground">{patientData.name}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Circle className="h-4 w-4" />
                Gender
              </div>
              <p className="mt-1 text-base text-foreground">{patientData.genderName}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <ID className="h-4 w-4" />
                Room NO
              </div>
              <p className="mt-1 text-base text-foreground">{patientData.roomName}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
