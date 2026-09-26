"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserPlus } from "lucide-react";
import { useAddPatientToDoctor } from "@/features/doctors/hooks";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const addPatientSchema = z.object({
  name: z.string().min(2, "Name is required"),
  age: z.coerce.number().min(0).max(150, "Enter a valid age"),
  gender: z.enum(["Male", "Female", "Other"]),
  phone: z.string().min(10, "Valid phone required"),
  email: z.string().email("Valid email required"),
  address: z.string().min(5, "Address is required"),
  condition: z.enum(["Critical", "Serious", "Fair", "Stable", "Good"]),
  diagnosis: z.string().min(2, "Diagnosis is required"),
});

type AddPatientFormInput = z.input<typeof addPatientSchema>;
type AddPatientFormData = z.output<typeof addPatientSchema>;

interface AddPatientFormProps {
  doctorId: string;
  children?: React.ReactNode;
}

export function AddPatientForm({ doctorId, children }: AddPatientFormProps) {
  const addPatient = useAddPatientToDoctor();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddPatientFormData>({
    resolver: zodResolver(
      addPatientSchema,
    ) as unknown as import("react-hook-form").Resolver<AddPatientFormData>,
    defaultValues: {
      name: "",
      age: 0,
      gender: "Male",
      phone: "",
      email: "",
      address: "",
      condition: "Stable",
      diagnosis: "",
    },
  });

  const gender = watch("gender");
  const condition = watch("condition");

  const onSubmit = (data: AddPatientFormData) => {
    addPatient.mutate(
      { doctorId, patient: data },
      {
        onSuccess: () => {
          reset();
        },
      },
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button className="gap-2">
            <UserPlus className="w-4 h-4" />
            Add Patient
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-thin">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-primary" />
            Add New Patient
          </DialogTitle>
          <DialogDescription>
            Register a new patient under this doctor
          </DialogDescription>
        </DialogHeader>
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
                  setValue("gender", v as AddPatientFormData["gender"])
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
                  setValue("condition", v as AddPatientFormData["condition"])
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
              placeholder="e.g. Hypertension, Diabetes..."
              {...register("diagnosis")}
            />
            {errors.diagnosis && (
              <p className="text-xs text-destructive">
                {errors.diagnosis.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={addPatient.isPending}
              className="gap-2"
            >
              {addPatient.isPending ? "Adding..." : "Add Patient"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
