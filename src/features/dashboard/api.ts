import { getSession } from 'next-auth/react';
import type { DashboardStats } from './types';
import Constants from '@/constants/API_CONSTANT';

const getHeaders = async () => {
  const session = await getSession();
  const token = (session as { accessToken?: string })?.accessToken;
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const res = await fetch(Constants.DASHBOARD_STATS, { headers: await getHeaders() });
  const json = await res.json();
  if (!json.success) throw new Error(json.message);

  return json.data;
}
