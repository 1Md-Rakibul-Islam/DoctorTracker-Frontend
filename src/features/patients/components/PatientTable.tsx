"use client";

import Link from "next/link";
import { Eye, Users, Trash2 } from "lucide-react";
import type { IPatientWithDoctor as PatientWithDoctor } from "@/features/patients/types";
import { useDeletePatientGlobal } from "@/features/patients/hooks";
import { formatDate, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

const conditionColors: Record<string, string> = {
  Critical: "bg-red-500/10 text-red-600 border-red-500/20",
  Serious: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  Fair: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  Stable: "bg-sky-500/10 text-sky-600 border-sky-500/20",
  Good: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
};

interface PatientTableProps {
  patients: PatientWithDoctor[];
}

export function PatientTable({ patients }: PatientTableProps) {
  const deletePatient = useDeletePatientGlobal();

  if (patients.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
          <Users className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">No patients found</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Try adjusting your filters
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto scrollbar-thin">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[250px]">Patient</TableHead>
            <TableHead className="hidden md:table-cell">Diagnosis</TableHead>
            <TableHead className="hidden lg:table-cell">Doctor</TableHead>
            <TableHead>Condition</TableHead>
            <TableHead className="hidden sm:table-cell">Registered</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id} className="group">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="w-9 h-9 shrink-0">
                    <AvatarFallback className="bg-muted text-muted-foreground text-xs font-semibold">
                      {getInitials(patient.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                      {patient.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {patient.age}y, {patient.gender}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                <span className="truncate block max-w-[200px]">
                  {patient.diagnosis}
                </span>
              </TableCell>
              <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                {patient.doctorName}
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={conditionColors[patient.condition] || ""}
                >
                  {patient.condition}
                </Badge>
              </TableCell>
              <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                {formatDate(patient.createdAt)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Link href={`/patients/${patient.id}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Edit
                    </Button>
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete patient?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete {patient.name}? This
                          action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deletePatient.mutate(patient.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
