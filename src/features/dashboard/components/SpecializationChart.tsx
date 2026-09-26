'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface SpecializationChartProps {
  data: { specialization: string; count: number }[];
}

const COLORS = [
  'hsl(199 89% 48%)',
  'hsl(142 71% 45%)',
  'hsl(38 92% 50%)',
  'hsl(280 65% 60%)',
  'hsl(340 75% 55%)',
  'hsl(173 58% 39%)',
  'hsl(12 76% 61%)',
];

export function SpecializationChart({ data }: SpecializationChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Doctors by Specialization</CardTitle>
        <CardDescription>Specialization distribution across doctors</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="specialization"
              cx="50%"
              cy="50%"
              outerRadius={95}
              paddingAngle={3}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid hsl(214 32% 91%)',
                fontSize: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              }}
            />
            <Legend
              iconType="circle"
              wrapperStyle={{ fontSize: '12px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
