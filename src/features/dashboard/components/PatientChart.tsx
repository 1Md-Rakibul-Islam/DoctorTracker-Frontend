'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PatientChartProps {
  data: { month: string; count: number }[];
}

export function PatientChart({ data }: PatientChartProps) {
  const chartData = data;
  const colors = [
    'hsl(199 89% 48%)',
    'hsl(199 80% 55%)',
    'hsl(199 70% 60%)',
    'hsl(199 60% 50%)',
    'hsl(199 85% 52%)',
    'hsl(199 75% 58%)',
    'hsl(199 65% 48%)',
    'hsl(199 90% 50%)',
    'hsl(199 78% 56%)',
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Patient Admissions Over Time</CardTitle>
        <CardDescription>Monthly patient registration trends</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: 'hsl(215 16% 47%)' }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: 'hsl(215 16% 47%)' }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid hsl(214 32% 91%)',
                fontSize: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              }}
              cursor={{ fill: 'hsl(210 40% 96%)' }}
            />
            <Bar dataKey="count" name="Patients" radius={[6, 6, 0, 0]} maxBarSize={50}>
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
