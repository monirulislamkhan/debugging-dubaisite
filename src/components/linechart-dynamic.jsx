"use client"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label, LabelList, ReferenceLine } from 'recharts';
export default function LinechartDynamic({ chartData, className }) {
  return <>
    <ResponsiveContainer width="100%" height={400} className={className}>
      <LineChart
        width={500}
        height={300}
        data={chartData.data}
        margin={{
          top: 0,
          right: 0,
          left: -30,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" interval={0} height={60} angle={-35} />
        <YAxis domain={[0, parseFloat(chartData.maximum)]} tickCount={7} />
        <Tooltip />
        <Legend />
        <ReferenceLine y={0} stroke="#242424" />
        {chartData.config.map((line, index) =>
          <Line key={index} type="monotone" dataKey={line.dataKey} stroke={line.fill} activeDot={{ r: 8 }} />
        )}
      </LineChart>
    </ResponsiveContainer>
  </>
}