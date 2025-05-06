import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useLanguage } from '../../context/LanguageContext';

interface StrokeByMarriedChartProps {
  data: Record<string, number>;
}

const MARRIED_MAP = {
  '0': 'Célibataire',
  '1': 'Marié(e)',
};

const COLORS = ['#ef4444', '#3b82f6'];

const StrokeByMarriedChart = ({ data }: StrokeByMarriedChartProps) => {
  const { t } = useLanguage();

  const chartData = Object.entries(data).map(([key, value]) => ({
    name: MARRIED_MAP[key] || 'Inconnu',
    value,
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [
              `${value}`,
              name,
            ]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StrokeByMarriedChart;