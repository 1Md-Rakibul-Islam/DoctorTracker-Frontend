import { getSession } from 'next-auth/react';
import type { DashboardStats } from './types';

const API_URL = 'http://localhost:5000/api/v1';

const getHeaders = async () => {
  const session = await getSession();
  const token = (session as any)?.accessToken;
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const res = await fetch(`${API_URL}/dashboard/stats`, { headers: await getHeaders() });
  const json = await res.json();
  if (!json.success) throw new Error(json.message);

  return json.data;
}
