'use client';

import { z } from 'zod';

export const patientSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.coerce.number().min(0, 'Age must be positive').max(150, 'Enter a valid age'),
  gender: z.enum(['Male', 'Female', 'Other']),
  phone: z
    .string()
    .min(10, 'Phone must be at least 10 characters')
    .regex(/^[+\d\s()-]+$/, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  condition: z.enum(['Critical', 'Serious', 'Fair', 'Stable', 'Good']),
  diagnosis: z.string().min(2, 'Diagnosis is required'),
});

export type PatientFormData = z.infer<typeof patientSchema>;
