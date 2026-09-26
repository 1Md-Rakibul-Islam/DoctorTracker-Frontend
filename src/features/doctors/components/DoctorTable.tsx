"use client";

import Link from "next/link";
import { Eye, Stethoscope, Mail, Phone } from "lucide-react";
import type { IDoctorWithPatientCount } from "@/features/doctors/types";
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

interface IDoctorTableProps {
  doctors: IDoctorWithPatientCount[];
}

export function DoctorTable({ doctors }: IDoctorTableProps) {
  if (doctors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
          <Stethoscope className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">No doctors found</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Try adjusting your filters or add a new doctor
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto scrollbar-thin">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[280px]">Doctor</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead className="hidden md:table-cell">Hospital</TableHead>
            <TableHead className="hidden lg:table-cell">Contact</TableHead>
            <TableHead className="text-center">Patients</TableHead>
            <TableHead className="hidden sm:table-cell">Registered</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors.map((doctor) => (
            <TableRow key={doctor.id} className="group">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 border">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                      {getInitials(doctor.name.replace("Dr. ", ""))}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">
                      {doctor.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate md:hidden">
                      {doctor.hospital}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="font-normal">
                  {doctor.specialization}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                {doctor.hospital}
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3 h-3" />
                    {doctor.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3 h-3" />
                    {doctor.phone}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Badge
                  variant="outline"
                  className={
                    doctor.patientCount > 0
                      ? "border-primary/30 text-primary"
                      : "text-muted-foreground"
                  }
                >
                  {doctor.patientCount}
                </Badge>
              </TableCell>
              <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                {formatDate(doctor.createdAt)}
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/doctors/${doctor.id}`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
