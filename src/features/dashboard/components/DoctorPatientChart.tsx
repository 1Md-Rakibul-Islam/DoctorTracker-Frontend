'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface DoctorPatientChartProps {
  data: { doctorName: string; patientCount: number }[];
}

export function DoctorPatientChart({ data }: DoctorPatientChartProps) {
  const chartData = data.map((item) => ({
    ...item,
    shortName: item.doctorName.replace('Dr. ', '').split(' ').slice(-1)[0],
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Patients per Doctor</CardTitle>
        <CardDescription>Distribution of patients across doctors</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
            <XAxis
              type="number"
              tick={{ fontSize: 12, fill: 'hsl(215 16% 47%)' }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <YAxis
              type="category"
              dataKey="shortName"
              tick={{ fontSize: 11, fill: 'hsl(215 16% 47%)' }}
              tickLine={false}
              axisLine={false}
              width={80}
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
            <Bar
              dataKey="patientCount"
              name="Patients"
              fill="hsl(199 89% 48%)"
              radius={[0, 6, 6, 0]}
              maxBarSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
