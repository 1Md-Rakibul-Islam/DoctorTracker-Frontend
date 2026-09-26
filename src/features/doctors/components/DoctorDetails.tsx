"use client";

import {
  Mail,
  Phone,
  Building2,
  Calendar,
  Stethoscope,
  User,
  Users,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { IPatient } from "@/types/patient.interface";
import type { IDoctor } from "@/types/doctor.interface";

import { formatDate, getInitials } from "@/lib/utils";
import { useDeletePatient } from "@/features/doctors/hooks";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AddPatientForm } from "./AddPatientForm";

const conditionColors: Record<string, string> = {
  Critical: "bg-red-500/10 text-red-600 border-red-500/20",
  Serious: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  Fair: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  Stable: "bg-sky-500/10 text-sky-600 border-sky-500/20",
  Good: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
};

interface DoctorDetailsProps {
  doctor: IDoctor;
  patients: IPatient[];
}

export function DoctorDetails({ doctor, patients }: DoctorDetailsProps) {
  const router = useRouter();
  const deletePatient = useDeletePatient();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild className="gap-2">
          <Link href="/doctors">
            <ArrowLeft className="w-4 h-4" />
            Back to Doctors
          </Link>
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-primary to-sky-400" />
        <CardContent className="p-6 -mt-12">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
              <AvatarFallback className="bg-primary text-primary-foreground text-xl font-semibold">
                {getInitials(doctor.name.replace("Dr. ", ""))}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  {doctor.name}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="gap-1">
                    <Stethoscope className="w-3 h-3" />
                    {doctor.specialization}
                  </Badge>
                </div>
              </div>
              <AddPatientForm doctorId={doctor.id} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-6 pt-6 border-t">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
                <Building2 className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Hospital</p>
                <p className="text-sm font-medium truncate">
                  {doctor.hospital}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
                <Mail className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium truncate">{doctor.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
                <Phone className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-sm font-medium truncate">{doctor.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
                <Calendar className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Registered</p>
                <p className="text-sm font-medium truncate">
                  {formatDate(doctor.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            Assigned Patients
            <Badge variant="outline" className="ml-1">
              {patients.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {patients.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-muted mb-3">
                <User className="w-7 h-7 text-muted-foreground" />
              </div>
              <h3 className="text-sm font-semibold">No patients assigned</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Add a patient to get started
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {patients.map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/30 transition-colors group"
                >
                  <Avatar className="w-9 h-9 shrink-0">
                    <AvatarFallback className="bg-muted text-muted-foreground text-xs font-semibold">
                      {getInitials(patient.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium truncate">
                        {patient.name}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {patient.age}y, {patient.gender}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {patient.diagnosis}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`shrink-0 ${conditionColors[patient.condition] || ""}`}
                  >
                    {patient.condition}
                  </Badge>
                  <Link href={`/patients/${patient.id}`}>
                    <Button variant="ghost" size="sm" className="h-8 text-xs">
                      View
                    </Button>
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Remove patient?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to remove {patient.name} from
                          this doctor&apos;s patient list? This action cannot be
                          undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deletePatient.mutate(patient.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Remove
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
