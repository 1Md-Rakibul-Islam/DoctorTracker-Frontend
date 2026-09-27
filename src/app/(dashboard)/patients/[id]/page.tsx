"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { usePatient } from "@/features/patients/hooks";
import { getDoctorName } from "@/features/patients/api";
import { PatientForm } from "@/features/patients/components/PatientForm";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function PatientDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const { data: patient, isLoading } = usePatient(id);

  const [doctorName, setDoctorName] = useState<string>("Loading...");

  useEffect(() => {
    if (patient) {
      getDoctorName(patient.doctorId).then(setDoctorName);
    }
  }, [patient]);

  if (isLoading) {
    return (
      <div className="space-y-4 max-w-2xl mx-auto">
        <Skeleton className="h-8 w-40" />
        <Card>
          <CardContent className="p-6 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-xl font-semibold">Patient not found</h2>
        <p className="text-sm text-muted-foreground mt-1">
          The patient you are looking for does not exist.
        </p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/patients">Back to Patients</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between gap-3">
        <Button variant="ghost" size="sm" asChild className="gap-2">
          <Link href="/patients">
            <ArrowLeft className="w-4 h-4" />
            Back to Patients
          </Link>
        </Button>
        <div className="text-sm text-muted-foreground">
          Assigned to:{" "}
          <span className="font-medium text-foreground">{doctorName}</span>
        </div>
      </div>
      <PatientForm patient={patient} />
    </div>
  );
}
