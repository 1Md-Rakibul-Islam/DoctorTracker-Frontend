'use client';

import { z } from 'zod';

export const doctorSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .refine((val) => val.trim().length > 0, 'Name is required'),
  specialization: z.string().min(1, 'Specialization is required'),
  hospital: z.string().min(1, 'Hospital is required'),
  phone: z
    .string()
    .min(10, 'Phone must be at least 10 characters')
    .regex(/^[+\d\s()-]+$/, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
});

export type DoctorFormData = z.infer<typeof doctorSchema>;
