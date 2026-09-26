import { IPatient, IPatientCondition } from '@/types/patient.interface';
export type { IPatient, IPatientCondition };

export interface IPatientFilters {
  search: string;
  condition: string;
  gender: string;
  doctorId: string;
  dateFrom: string;
  dateTo: string;
}

export interface IPatientWithDoctor extends IPatient {
  doctorName: string;
  doctorSpecialization: string;
}

export interface IUpdatePatientInput {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email: string;
  address: string;
  condition: IPatientCondition;
  diagnosis: string;
}
