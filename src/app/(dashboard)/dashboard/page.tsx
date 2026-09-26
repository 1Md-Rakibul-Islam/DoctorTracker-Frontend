"use client";

import {
  Stethoscope,
  Users,
  Heart,
  CalendarPlus,
  Activity,
} from "lucide-react";
import { useDashboardStats } from "@/features/dashboard/hooks";
import { StatsCard } from "@/features/dashboard/components/StatsCard";
import { PatientChart } from "@/features/dashboard/components/PatientChart";
import { DoctorPatientChart } from "@/features/dashboard/components/DoctorPatientChart";
import { ConditionChart } from "@/features/dashboard/components/ConditionChart";
import { SpecializationChart } from "@/features/dashboard/components/SpecializationChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { data: stats, isLoading } = useDashboardStats();

  if (isLoading || !stats) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Skeleton className="h-80 rounded-xl" />
          <Skeleton className="h-80 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Doctors"
          value={stats.totalDoctors}
          icon={Stethoscope}
          description="Active registered doctors"
          variant="primary"
        />
        <StatsCard
          title="Total Patients"
          value={stats.totalPatients}
          icon={Users}
          description="Across all doctors"
          variant="default"
        />
        <StatsCard
          title="Critical Patients"
          value={stats.criticalPatients}
          icon={Heart}
          description="Require immediate attention"
          variant="destructive"
        />
        <StatsCard
          title="New This Month"
          value={stats.newPatientsThisMonth}
          icon={CalendarPlus}
          description="Patients registered this month"
          variant="success"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <PatientChart data={stats.patientsByMonth} />
        <ConditionChart data={stats.patientsByCondition} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DoctorPatientChart data={stats.patientsPerDoctor} />
        <SpecializationChart data={stats.doctorSpecializationDistribution} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            System Health Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-lg bg-muted/40 p-4">
              <p className="text-xs text-muted-foreground mb-1">
                Avg patients/doctor
              </p>
              <p className="text-2xl font-bold">
                {(stats.totalPatients / stats.totalDoctors).toFixed(1)}
              </p>
            </div>
            <div className="rounded-lg bg-muted/40 p-4">
              <p className="text-xs text-muted-foreground mb-1">
                Specializations
              </p>
              <p className="text-2xl font-bold">
                {stats.doctorSpecializationDistribution.length}
              </p>
            </div>
            <div className="rounded-lg bg-muted/40 p-4">
              <p className="text-xs text-muted-foreground mb-1">
                Stable+ patients
              </p>
              <p className="text-2xl font-bold">
                {stats.patientsByCondition
                  .filter(
                    (c: { condition: string }) =>
                      c.condition === "Stable" || c.condition === "Good",
                  )
                  .reduce(
                    (sum: number, c: { count: number }) => sum + c.count,
                    0,
                  )}
              </p>
            </div>
            <div className="rounded-lg bg-muted/40 p-4">
              <p className="text-xs text-muted-foreground mb-1">
                Active months
              </p>
              <p className="text-2xl font-bold">
                {stats.patientsByMonth.length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
