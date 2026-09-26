'use client';

import doctorsData from '@/data/doctors.json';
import patientsData from '@/data/patients.json';
import type { Doctor, Patient, DoctorFilters, DoctorWithPatientCount, CreateDoctorInput } from './types';

let doctors: Doctor[] = [...doctorsData] as Doctor[];
let patients: Patient[] = [...patientsData] as Patient[];

export function fetchDoctors(
  page: number,
  pageSize: number,
  filters: DoctorFilters
): { data: DoctorWithPatientCount[]; total: number; totalPages: number } {
  let filtered = [...doctors];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    filtered = filtered.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.email.toLowerCase().includes(q) ||
        d.phone.includes(q)
    );
  }

  if (filters.specialization && filters.specialization !== 'all') {
    filtered = filtered.filter((d) => d.specialization === filters.specialization);
  }

  if (filters.hospital && filters.hospital !== 'all') {
    filtered = filtered.filter((d) => d.hospital === filters.hospital);
  }

  if (filters.dateFrom) {
    const from = new Date(filters.dateFrom);
    filtered = filtered.filter((d) => new Date(d.createdAt) >= from);
  }

  if (filters.dateTo) {
    const to = new Date(filters.dateTo);
    to.setHours(23, 59, 59, 999);
    filtered = filtered.filter((d) => new Date(d.createdAt) <= to);
  }

  filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const data = filtered
    .slice(start, start + pageSize)
    .map((d) => ({
      ...d,
      patientCount: patients.filter((p) => p.doctorId === d.id).length,
    }));

  return { data, total, totalPages };
}

export function fetchDoctorById(id: string): Doctor | undefined {
  return doctors.find((d) => d.id === id);
}

export function fetchPatientsByDoctorId(doctorId: string): Patient[] {
  return patients.filter((p) => p.doctorId === doctorId);
}

export function createDoctor(input: CreateDoctorInput): Doctor {
  const newDoctor: Doctor = {
    id: `doc-${String(doctors.length + 1).padStart(3, '0')}-${Date.now()}`,
    ...input,
    createdAt: new Date().toISOString(),
  };
  doctors = [newDoctor, ...doctors];
  return newDoctor;
}

export function deletePatient(patientId: string): void {
  patients = patients.filter((p) => p.id !== patientId);
}

export function addPatientToDoctor(
  doctorId: string,
  patient: Omit<Patient, 'id' | 'doctorId' | 'createdAt'>
): Patient {
  const newPatient: Patient = {
    ...patient,
    id: `pat-${String(patients.length + 1).padStart(3, '0')}-${Date.now()}`,
    doctorId,
    createdAt: new Date().toISOString(),
  };
  patients = [newPatient, ...patients];
  return newPatient;
}

export function getSpecializations(): string[] {
  return Array.from(new Set(doctors.map((d) => d.specialization))).sort();
}

export function getHospitals(): string[] {
  return Array.from(new Set(doctors.map((d) => d.hospital))).sort();
}
