'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ConditionChartProps {
  data: { condition: string; count: number }[];
}

const COLORS: Record<string, string> = {
  Critical: 'hsl(0 84% 60%)',
  Serious: 'hsl(25 95% 53%)',
  Fair: 'hsl(38 92% 50%)',
  Stable: 'hsl(199 89% 48%)',
  Good: 'hsl(142 71% 45%)',
};

export function ConditionChart({ data }: ConditionChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Patients by Condition</CardTitle>
        <CardDescription>Distribution of patient conditions</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="condition"
              cx="50%"
              cy="50%"
              outerRadius={90}
              innerRadius={50}
              paddingAngle={3}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.condition}
                  fill={COLORS[entry.condition] || 'hsl(199 89% 48%)'}
                />
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
