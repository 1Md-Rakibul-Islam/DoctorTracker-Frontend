'use client';

import doctorsData from '@/data/doctors.json';
import patientsData from '@/data/patients.json';
import type {
  IPatientFilters,
  IPatientWithDoctor,
  IUpdatePatientInput,
} from './types';
import type { IDoctor } from '@/types/doctor.interface';
import { IPatient } from '../doctors/types';

const doctors: IDoctor[] = [...doctorsData] as IDoctor[];
let patients: IPatient[] = [...patientsData] as IPatient[];

export function fetchPatients(
  page: number,
  pageSize: number,
  filters: IPatientFilters
): { data: IPatientWithDoctor[]; total: number; totalPages: number } {
  let filtered = [...patients];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q) ||
        p.phone.includes(q) ||
        p.diagnosis.toLowerCase().includes(q)
    );
  }

  if (filters.condition && filters.condition !== 'all') {
    filtered = filtered.filter((p) => p.condition === filters.condition);
  }

  if (filters.gender && filters.gender !== 'all') {
    filtered = filtered.filter((p) => p.gender === filters.gender);
  }

  if (filters.doctorId && filters.doctorId !== 'all') {
    filtered = filtered.filter((p) => p.doctorId === filters.doctorId);
  }

  if (filters.dateFrom) {
    const from = new Date(filters.dateFrom);
    filtered = filtered.filter((p) => new Date(p.createdAt) >= from);
  }

  if (filters.dateTo) {
    const to = new Date(filters.dateTo);
    to.setHours(23, 59, 59, 999);
    filtered = filtered.filter((p) => new Date(p.createdAt) <= to);
  }

  filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const data = filtered.slice(start, start + pageSize).map((p) => {
    const doctor = doctors.find((d) => d.id === p.doctorId);
    return {
      ...p,
      doctorName: doctor?.name || 'Unknown',
      doctorSpecialization: doctor?.specialization || 'Unknown',
    };
  });

  return { data, total, totalPages };
}

export function fetchPatientById(id: string): IPatient | undefined {
  return patients.find((p) => p.id === id);
}

export function updatePatient(id: string, input: IUpdatePatientInput): IPatient | undefined {
  patients = patients.map((p) => (p.id === id ? { ...p, ...input } : p));
  return patients.find((p) => p.id === id);
}

export function deletePatientGlobal(patientId: string): void {
  patients = patients.filter((p) => p.id !== patientId);
}

export function getDoctorName(doctorId: string): string {
  const doc = doctors.find((d) => d.id === doctorId);
  return doc?.name || 'Unknown';
}
