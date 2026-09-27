'use client';

import { getSession } from 'next-auth/react';
import type { IDoctor as Doctor, DoctorFilters, IDoctorWithPatientCount as DoctorWithPatientCount, ICreateDoctorInput as CreateDoctorInput } from './types';
import type { IPatient as Patient } from '@/types/patient.interface';
import Constants from '@/constants/API_CONSTANT';

const getHeaders = async () => {
  const session = await getSession();
  const token = (session as any)?.accessToken;
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export async function fetchDoctors(
  page: number,
  pageSize: number,
  filters: DoctorFilters
): Promise<{ data: DoctorWithPatientCount[]; total: number; totalPages: number }> {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(pageSize),
  });

  if (filters.search) query.append('searchTerm', filters.search);
  if (filters.specialization && filters.specialization !== 'all') query.append('specialization', filters.specialization);
  if (filters.hospital && filters.hospital !== 'all') query.append('hospital', filters.hospital);
  if (filters.dateFrom) query.append('createdAt[$gte]', new Date(filters.dateFrom).toISOString());
  if (filters.dateTo) {
    const to = new Date(filters.dateTo);
    to.setHours(23, 59, 59, 999);
    query.append('createdAt[$lte]', to.toISOString());
  }

  const res = await fetch(Constants.GET_DOCTORS(query.toString()), { headers: await getHeaders() });
  const json = await res.json();

  if (!json.success) throw new Error(json.message);

  // Map backend _id to id for frontend compatibility
  const data = json.data.map((d: any) => ({
    ...d,
    id: d._id,
    patientCount: 0, // In backend, we would need to join or fetch this. For now, it might be 0 unless backend returns it. Wait, the backend doesn't return patientCount in the list? We can fetch it or just display it.
  }));

  return {
    data,
    total: json.meta.total,
    totalPages: json.meta.totalPage,
  };
}

export async function fetchDoctorById(id: string): Promise<Doctor> {
  const res = await fetch(Constants.DOCTOR_DETAILS(id), { headers: await getHeaders() });
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return { ...json.data, id: json.data._id };
}

export async function fetchPatientsByDoctorId(doctorId: string): Promise<Patient[]> {
  const res = await fetch(Constants.DOCTOR_PATIENTS(doctorId), { headers: await getHeaders() });
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data.map((p: any) => ({ ...p, id: p._id }));
}

export async function createDoctor(input: CreateDoctorInput): Promise<Doctor> {
  const res = await fetch(Constants.CREATE_DOCTOR, {
    method: 'POST',
    headers: await getHeaders(),
    body: JSON.stringify(input),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return { ...json.data, id: json.data._id };
}

export async function deletePatient(patientId: string): Promise<void> {
  const res = await fetch(Constants.PATIENT_DETAILS(patientId), {
    method: 'DELETE',
    headers: await getHeaders(),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
}

export async function addPatientToDoctor(
  doctorId: string,
  patient: Omit<Patient, 'id' | 'doctorId' | 'createdAt'>
): Promise<Patient> {
  const res = await fetch(Constants.DOCTOR_PATIENTS(doctorId), {
    method: 'POST',
    headers: await getHeaders(),
    body: JSON.stringify(patient),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return { ...json.data, id: json.data._id };
}

export async function getSpecializations(): Promise<string[]> {
  // Mock implementations for filters since backend might not have dedicated distinct routes yet
  const res = await fetch(Constants.GET_DOCTORS('limit=1000'), { headers: await getHeaders() });
  const json = await res.json();
  if (!json.success) return [];
  const specs = new Set<string>();
  json.data.forEach((d: any) => specs.add(d.specialization));
  return Array.from(specs).sort();
}

export async function getHospitals(): Promise<string[]> {
  const res = await fetch(Constants.GET_DOCTORS('limit=1000'), { headers: await getHeaders() });
  const json = await res.json();
  if (!json.success) return [];
  const hosp = new Set<string>();
  json.data.forEach((d: any) => hosp.add(d.hospital));
  return Array.from(hosp).sort();
}
