import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useLanguage } from '../../context/LanguageContext';

interface ChartData {
  name: string;
  value: number;
}

interface StrokeRiskChartProps {
  data: ChartData[];
}

const COLORS = ['#ef4444', '#3b82f6'];

const StrokeRiskChart = ({ data }: StrokeRiskChartProps) => {
  const { t } = useLanguage();

  const customLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize="12"
        fontWeight="600"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={customLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [
              `${value}`,
              name === 'High Risk' ? t('risk.high') : t('risk.low'),
            ]}
          />
          <Legend
            formatter={(value: string) => {
              return value === 'High Risk' ? t('risk.high') : t('risk.low');
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StrokeRiskChart;