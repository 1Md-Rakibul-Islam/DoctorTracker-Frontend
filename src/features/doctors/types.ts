import { IDoctor } from "@/types/doctor.interface";
import { IPatient } from "@/types/patient.interface";
import { ReactNode } from "react";


export type { IDoctor, IPatient };

export interface DoctorFilters {
  search: string;
  specialization: string;
  hospital: string;
  dateFrom: string;
  dateTo: string;
}

export interface IDoctorWithPatientCount extends IDoctor {
  createdAt(createdAt: unknown): import("react").ReactNode;
  phone: ReactNode;
  email: ReactNode;
  specialization: ReactNode;
  id: Key | null | undefined;
  hospital: ReactNode;
  name: any;
  patientCount: number;
}

export interface ICreateDoctorInput {
  name: string;
  specialization: string;
  hospital: string;
  phone: string;
  email: string;
}
