import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../../context/LanguageContext';

interface StrokeByWorkTypeChartProps {
  data: Record<string, number>;
}

const WORK_TYPE_MAP = {
  '0': 'Govt_job',
  '1': 'children',
  '2': 'Private',
  '3': 'Self-employed',
};

const StrokeByWorkTypeChart = ({ data }: StrokeByWorkTypeChartProps) => {
  const { t } = useLanguage();

  const chartData = Object.entries(data).map(([key, value]) => ({
    name: WORK_TYPE_MAP[key] || 'Inconnu',
    value,
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            formatter={(value: number, name: string) => [
              `${value}`,
              name,
            ]}
          />
          <Bar dataKey="value" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StrokeByWorkTypeChart;