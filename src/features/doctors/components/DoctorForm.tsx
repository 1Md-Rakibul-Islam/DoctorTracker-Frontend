"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stethoscope, Save } from "lucide-react";
import { doctorSchema, type DoctorFormData } from "@/features/doctors/schema";
import { useCreateDoctor } from "@/features/doctors/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function DoctorForm() {
  const router = useRouter();
  const createDoctor = useCreateDoctor();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DoctorFormData>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      name: "",
      specialization: "",
      hospital: "",
      phone: "",
      email: "",
    },
  });

  const onSubmit = (data: DoctorFormData) => {
    createDoctor.mutate(data, {
      onSuccess: () => {
        router.push("/doctors");
      },
    });
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <CardTitle>Doctor Information</CardTitle>
            <CardDescription>
              Fill in the details below to register a new doctor
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Dr. John Smith"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Input
                id="specialization"
                placeholder="e.g. Cardiology"
                {...register("specialization")}
              />
              {errors.specialization && (
                <p className="text-xs text-destructive">
                  {errors.specialization.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="hospital">Hospital</Label>
              <Input
                id="hospital"
                placeholder="e.g. General Hospital"
                {...register("hospital")}
              />
              {errors.hospital && (
                <p className="text-xs text-destructive">
                  {errors.hospital.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="+1 (555) 123-4567"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-xs text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="doctor@hospital.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/doctors")}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || createDoctor.isPending}
              className="flex-1 gap-2"
            >
              <Save className="w-4 h-4" />
              {isSubmitting || createDoctor.isPending
                ? "Creating..."
                : "Create Doctor"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
