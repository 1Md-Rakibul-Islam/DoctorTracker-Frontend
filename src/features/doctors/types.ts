import { IDoctor } from "@/types/doctor.interface";
import { IPatient } from "@/types/patient.interface";


export type { IDoctor, IPatient };

export interface DoctorFilters {
  search: string;
  specialization: string;
  hospital: string;
  dateFrom: string;
  dateTo: string;
}

export interface IDoctorWithPatientCount extends IDoctor {
  patientCount: number;
}

export interface ICreateDoctorInput {
  name: string;
  specialization: string;
  hospital: string;
  phone: string;
  email: string;
}
