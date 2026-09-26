import doctorsData from '@/data/doctors.json';
import patientsData from '@/data/patients.json';
import type { DashboardStats } from './types';

export function fetchDashboardStats(): DashboardStats {
  const totalDoctors = doctorsData.length;
  const totalPatients = patientsData.length;
  const criticalPatients = patientsData.filter((p) => p.condition === 'Critical').length;

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const newPatientsThisMonth = patientsData.filter((p) => {
    const d = new Date(p.createdAt);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  }).length;

  const patientsPerDoctor = doctorsData.map((doc) => ({
    doctorName: doc.name,
    patientCount: patientsData.filter((p) => p.doctorId === doc.id).length,
  }));

  const conditions = ['Critical', 'Serious', 'Fair', 'Stable', 'Good'];
  const patientsByCondition = conditions.map((condition) => ({
    condition,
    count: patientsData.filter((p) => p.condition === condition).length,
  }));

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const patientsByMonth: { month: string; count: number }[] = [];
  for (let i = 0; i < 12; i++) {
    const count = patientsData.filter((p) => {
      const d = new Date(p.createdAt);
      return d.getMonth() === i;
    }).length;
    if (count > 0) {
      patientsByMonth.push({ month: months[i], count });
    }
  }

  const specializations = Array.from(new Set(doctorsData.map((d) => d.specialization)));
  const doctorSpecializationDistribution = specializations.map((spec) => ({
    specialization: spec,
    count: doctorsData.filter((d) => d.specialization === spec).length,
  }));

  return {
    totalDoctors,
    totalPatients,
    criticalPatients,
    newPatientsThisMonth,
    patientsPerDoctor,
    patientsByCondition,
    patientsByMonth,
    doctorSpecializationDistribution,
  };
}
