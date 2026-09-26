export type ID = string;


export interface IAuthUser {
    id: ID;
    name: string;
    email: string;
    role: 'admin';
}

export interface IDashboardStats {
    totalDoctors: number;
    totalPatients: number;
    criticalPatients: number;
    newPatientsThisMonth: number;
    patientsPerDoctor: { doctorName: string; patientCount: number }[];
    patientsByCondition: { condition: string; count: number }[];
    patientsByMonth: { month: string; count: number }[];
    doctorSpecializationDistribution: { specialization: string; count: number }[];
}
