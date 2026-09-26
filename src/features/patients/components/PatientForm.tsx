"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IPatient } from "../types";
import { useUpdatePatient } from "../hooks";
import { PatientFormData, patientSchema } from "../schema";

interface PatientFormProps {
  patient: IPatient;
}

export function PatientForm({ patient }: PatientFormProps) {
  const router = useRouter();
  const updatePatient = useUpdatePatient();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PatientFormData>({
    resolver: zodResolver(
      patientSchema,
    ) as unknown as import("react-hook-form").Resolver<PatientFormData>,
    defaultValues: {
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      phone: patient.phone,
      email: patient.email,
      address: patient.address,
      condition: patient.condition,
      diagnosis: patient.diagnosis,
    },
  });

  const gender = watch("gender");
  const condition = watch("condition");

  const onSubmit = (data: PatientFormData) => {
    updatePatient.mutate(
      { id: patient.id, input: data },
      {
        onSuccess: () => {
          router.push("/patients");
        },
      },
    );
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary">
            <User className="w-5 h-5" />
          </div>
          <div>
            <CardTitle>Edit Patient</CardTitle>
            <CardDescription>Update patient information below</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pat-name">Full Name</Label>
              <Input
                id="pat-name"
                placeholder="John Smith"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="pat-age">Age</Label>
              <Input
                id="pat-age"
                type="number"
                placeholder="35"
                {...register("age", { valueAsNumber: true })}
              />
              {errors.age && (
                <p className="text-xs text-destructive">{errors.age.message}</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select
                value={gender}
                onValueChange={(v) =>
                  setValue("gender", v as PatientFormData["gender"])
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Condition</Label>
              <Select
                value={condition}
                onValueChange={(v) =>
                  setValue("condition", v as PatientFormData["condition"])
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Critical">Critical</SelectItem>
                  <SelectItem value="Serious">Serious</SelectItem>
                  <SelectItem value="Fair">Fair</SelectItem>
                  <SelectItem value="Stable">Stable</SelectItem>
                  <SelectItem value="Good">Good</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pat-phone">Phone</Label>
              <Input
                id="pat-phone"
                placeholder="+1 (555) 000-0000"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-xs text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="pat-email">Email</Label>
              <Input
                id="pat-email"
                type="email"
                placeholder="patient@email.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pat-address">Address</Label>
            <Input
              id="pat-address"
              placeholder="123 Main St, City, State"
              {...register("address")}
            />
            {errors.address && (
              <p className="text-xs text-destructive">
                {errors.address.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pat-diagnosis">Diagnosis</Label>
            <Input
              id="pat-diagnosis"
              placeholder="e.g. Hypertension"
              {...register("diagnosis")}
            />
            {errors.diagnosis && (
              <p className="text-xs text-destructive">
                {errors.diagnosis.message}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/patients")}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || updatePatient.isPending}
              className="flex-1 gap-2"
            >
              <Save className="w-4 h-4" />
              {isSubmitting || updatePatient.isPending
                ? "Saving..."
                : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
