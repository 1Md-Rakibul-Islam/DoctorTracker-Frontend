import { useAuthStore } from '@/store/auth/auth.store';
import type { DashboardStats } from './types';

const API_URL = 'http://localhost:5000/api/v1';

const getHeaders = () => {
  const token = useAuthStore.getState().token;
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const res = await fetch(`${API_URL}/dashboard/stats`, { headers: getHeaders() });
  const json = await res.json();
  if (!json.success) throw new Error(json.message);

  return json.data;
}
