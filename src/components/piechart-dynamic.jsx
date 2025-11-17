"use client"
import { PieChart, Pie, Sector, Tooltip, Cell, ResponsiveContainer, Legend } from 'recharts';

function formatCompactNumber(number) {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(number);
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-primary-700/60 flex flex-col *:py-0.5">
        <div className='font-semibold'>{`${payload[0].name}`}</div>
        <div className='text-sm'>
          {`Sales Volume: ${formatCompactNumber(payload[0].value)}`}
        </div>
      </div>
    );
  }
  return null;
};


export default function PieChartsDynamic({ chartData, className }) {
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    );
  };

  return <> <ResponsiveContainer width="100%" height={400} className={className}>
    <PieChart width={400} height={400}>
      <Pie
        data={chartData.data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={160}
        innerRadius={50}
        // fill={chartData}
        dataKey="value"
      >
        {chartData.config.map((entry, index) => (
          <Cell key={index} fill={entry.color} />
        ))}
      </Pie>
      <Legend verticalAlign="bottom" height={36} />
      {/* <Tooltip content={CustomTooltip} /> */}
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
  </>
}