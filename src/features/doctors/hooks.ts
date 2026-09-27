'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchDoctors,
  fetchDoctorById,
  fetchPatientsByDoctorId,
  createDoctor,
  deletePatient,
  addPatientToDoctor,
  getSpecializations,
  getHospitals,
} from './api';
import type { IDoctor as Doctor, DoctorFilters, ICreateDoctorInput as CreateDoctorInput } from './types';
import type { IPatient as Patient } from '@/types/patient.interface';
import { toast } from 'sonner';

export function useDoctors(page: number, pageSize: number, filters: DoctorFilters) {
  return useQuery({
    queryKey: ['doctors', page, pageSize, filters],
    queryFn: () => fetchDoctors(page, pageSize, filters),
  });
}

export function useDoctor(id: string) {
  return useQuery({
    queryKey: ['doctor', id],
    queryFn: () => fetchDoctorById(id),
    enabled: !!id,
  });
}

export function useDoctorPatients(doctorId: string) {
  return useQuery({
    queryKey: ['doctor-patients', doctorId],
    queryFn: () => fetchPatientsByDoctorId(doctorId),
    enabled: !!doctorId,
  });
}

export function useCreateDoctor() {
  const queryClient = useQueryClient();
  return useMutation<Doctor, Error, CreateDoctorInput>({
    mutationFn: async (input) => createDoctor(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      toast.success('Doctor created successfully');
    },
    onError: () => {
      toast.error('Failed to create doctor');
    },
  });
}

export function useDeletePatient() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (patientId) => deletePatient(patientId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctor-patients'] });
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      toast.success('Patient removed successfully');
    },
  });
}

export function useAddPatientToDoctor() {
  const queryClient = useQueryClient();
  return useMutation<Patient, Error, { doctorId: string; patient: Omit<Patient, 'id' | 'doctorId' | 'createdAt'> }>({
    mutationFn: async ({ doctorId, patient }) => addPatientToDoctor(doctorId, patient),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctor-patients'] });
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      toast.success('Patient added successfully');
    },
  });
}

export function useSpecializations() {
  return useQuery({
    queryKey: ['specializations'],
    queryFn: getSpecializations,
    staleTime: Infinity,
  });
}

export function useHospitals() {
  return useQuery({
    queryKey: ['hospitals'],
    queryFn: getHospitals,
    staleTime: Infinity,
  });
}
