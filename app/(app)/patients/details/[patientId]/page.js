'use client';

import PatientProfileSection from './../../../../components/patients/PatientProfileSection';
import HealthStatusSection from './../../../../components/patients/HealthStatusSection';
import ActivityLogSection from './../../../../components/patients/ActivityLogSection';
import VitalsChartSection from './../../../../components/patients/VitalsChartSection';

export default function PatientDetailsPage({ params }) {
    const { patientId } = params;


  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="space-y-8 px-6 py-8">
        <PatientProfileSection patientId={patientId} />
        <HealthStatusSection />
        <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <ActivityLogSection patientId={patientId} />
        </section>
        <VitalsChartSection />
      </div>
    </main>
  );
}
