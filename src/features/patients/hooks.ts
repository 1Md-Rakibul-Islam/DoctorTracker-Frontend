'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchPatients,
  fetchPatientById,
  updatePatient,
  deletePatientGlobal,
} from './api';
import type { IPatient, IPatientFilters } from './types';
import { toast } from 'sonner';
import { IUpdatePatientInput } from './types';

export function usePatients(page: number, pageSize: number, filters: IPatientFilters) {
  return useQuery({
    queryKey: ['patients', page, pageSize, filters],
    queryFn: () => fetchPatients(page, pageSize, filters),
  });
}

export function usePatient(id: string) {
  return useQuery({
    queryKey: ['patient', id],
    queryFn: () => fetchPatientById(id),
    enabled: !!id,
  });
}

export function useUpdatePatient() {
  const queryClient = useQueryClient();
  return useMutation<IPatient | undefined, Error, { id: string; input: IUpdatePatientInput }>({
    mutationFn: async ({ id, input }) => updatePatient(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      queryClient.invalidateQueries({ queryKey: ['patient'] });
      queryClient.invalidateQueries({ queryKey: ['doctor-patients'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      toast.success('Patient updated successfully');
    },
    onError: () => {
      toast.error('Failed to update patient');
    },
  });
}

export function useDeletePatientGlobal() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (patientId) => deletePatientGlobal(patientId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      queryClient.invalidateQueries({ queryKey: ['doctor-patients'] });
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      toast.success('Patient deleted successfully');
    },
  });
}
