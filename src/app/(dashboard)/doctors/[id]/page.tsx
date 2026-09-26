"use client";

import { useParams } from "next/navigation";
import { useDoctor, useDoctorPatients } from "@/features/doctors/hooks";
import { DoctorDetails } from "@/features/doctors/components/DoctorDetails";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function DoctorDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const { data: doctor, isLoading: doctorLoading } = useDoctor(id);
  const { data: patients = [], isLoading: patientsLoading } =
    useDoctorPatients(id);

  if (doctorLoading || patientsLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-40" />
        <Card className="overflow-hidden">
          <Skeleton className="h-24 w-full" />
          <CardContent className="p-6 -mt-12 space-y-4">
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-8 w-64" />
            <div className="grid gap-4 sm:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-12" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-xl font-semibold">Doctor not found</h2>
        <p className="text-sm text-muted-foreground mt-1">
          The doctor you are looking for does not exist.
        </p>
      </div>
    );
  }

  return <DoctorDetails doctor={doctor} patients={patients} />;
}
