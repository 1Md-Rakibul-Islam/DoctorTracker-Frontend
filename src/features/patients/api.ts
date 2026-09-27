'use client';

import { getSession } from 'next-auth/react';
import type {
  IPatientFilters,
  IPatientWithDoctor,
  IUpdatePatientInput,
} from './types';
import type { IDoctor } from '@/types/doctor.interface';
import { IPatient } from '../doctors/types';
import Constants from '@/constants/API_CONSTANT';

const getHeaders = async () => {
  const session = await getSession();
  const token = (session as any)?.accessToken;
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export async function fetchPatients(
  page: number,
  pageSize: number,
  filters: IPatientFilters
): Promise<{ data: IPatientWithDoctor[]; total: number; totalPages: number }> {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(pageSize),
  });

  if (filters.search) query.append('searchTerm', filters.search);
  if (filters.condition && filters.condition !== 'all') query.append('condition', filters.condition);
  if (filters.gender && filters.gender !== 'all') query.append('gender', filters.gender);
  if (filters.doctorId && filters.doctorId !== 'all') query.append('doctorId', filters.doctorId);

  if (filters.dateFrom) query.append('createdAt[$gte]', new Date(filters.dateFrom).toISOString());
  if (filters.dateTo) {
    const to = new Date(filters.dateTo);
    to.setHours(23, 59, 59, 999);
    query.append('createdAt[$lte]', to.toISOString());
  }

  const res = await fetch(Constants.GET_PATIENTS(query.toString()), { headers: await getHeaders() });
  const json = await res.json();
  if (!json.success) throw new Error(json.message);

  const data = json.data.map((p: any) => ({
    ...p,
    id: p._id,
    doctorName: 'Doctor', // If backend doesn't populate, we can just supply generic or fetch.
    doctorSpecialization: 'Specialization'
  }));

  return {
    data,
    total: json.meta.total,
    totalPages: json.meta.totalPage,
  };
}

export async function fetchPatientById(id: string): Promise<IPatient> {
  const res = await fetch(Constants.PATIENT_DETAILS(id), { headers: await getHeaders() });
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return { ...json.data, id: json.data._id };
}

export async function updatePatient(id: string, input: IUpdatePatientInput): Promise<IPatient> {
  const res = await fetch(Constants.PATIENT_DETAILS(id), {
    method: 'PATCH',
    headers: await getHeaders(),
    body: JSON.stringify(input),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return { ...json.data, id: json.data._id };
}

export async function deletePatientGlobal(patientId: string): Promise<void> {
  const res = await fetch(Constants.PATIENT_DETAILS(patientId), {
    method: 'DELETE',
    headers: await getHeaders(),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
}

export async function getDoctorName(doctorId: string): Promise<string> {
  try {
    const res = await fetch(Constants.DOCTOR_DETAILS(doctorId), { headers: await getHeaders() });
    const json = await res.json();
    return json.data?.name || 'Unknown';
  } catch {
    return 'Unknown';
  }
}
