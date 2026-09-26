import { ID } from "./common.interface";

export interface IPatient {
    id: ID;
    name: string;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
    phone: string;
    email: string;
    address: string;
    condition: IPatientCondition;
    doctorId: ID;
    diagnosis: string;
    createdAt: string;
}

export type IPatientCondition =
    | 'Critical'
    | 'Serious'
    | 'Fair'
    | 'Stable'
    | 'Good';
