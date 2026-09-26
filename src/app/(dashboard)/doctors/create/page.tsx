"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DoctorForm } from "@/features/doctors/components/DoctorForm";

export default function CreateDoctorPage() {
  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <Button variant="ghost" size="sm" asChild className="gap-2">
        <Link href="/doctors">
          <ArrowLeft className="w-4 h-4" />
          Back to Doctors
        </Link>
      </Button>
      <DoctorForm />
    </div>
  );
}
