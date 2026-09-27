const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

// const BASE_URL = "https://doctor-tracker-backend-sandy.vercel.app/api/v1";

const Constants = {
    API_BASE_URL: BASE_URL,

    // Auth Module
    LOGIN: `${BASE_URL}/auth/login`,
    REGISTER: `${BASE_URL}/auth/register`,

    // Dashboard Module
    DASHBOARD_STATS: `${BASE_URL}/dashboard/stats`,

    // Doctors Module
    GET_DOCTORS: (queryString?: string) => `${BASE_URL}/doctors${queryString ? `?${queryString}` : ''}`,
    CREATE_DOCTOR: `${BASE_URL}/doctors`,
    DOCTOR_DETAILS: (id: string) => `${BASE_URL}/doctors/${id}`,
    DOCTOR_PATIENTS: (doctorId: string) => `${BASE_URL}/doctors/${doctorId}/patients`,

    // Patients Module
    GET_PATIENTS: (queryString?: string) => `${BASE_URL}/patients${queryString ? `?${queryString}` : ''}`,
    PATIENT_DETAILS: (id: string) => `${BASE_URL}/patients/${id}`,
};

export default Constants;