"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label, LabelList, ReferenceLine } from 'recharts';


export default function BarchartDynamic({ chartData, className }) {
  return <>
    <ResponsiveContainer width="100%" height={400} className={className}>
      <BarChart
        width={600}
        height={300}
        data={chartData.data}
        margin={{ top: 20, right: 30, left: 20, bottom: 25 }}
        maxBarSize={60}
      >
        <XAxis
          dataKey="name"
          angle={-20}
          textAnchor="end"
        />
        <YAxis domain={[0, parseFloat(chartData.maximum)]} tickCount={7} />
        <Tooltip />
        <Legend
          wrapperStyle={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
        <CartesianGrid strokeDasharray="1" />
        <ReferenceLine y={0} stroke="#242424" />
        {chartData.config.map((bar, index) => (
          <Bar
            key={index}
            dataKey={bar.dataKey}
            // fill={bar.fill || `#${Math.floor(Math.random() * 16777215).toString(16)}`}
            fill={bar.fill || `#088d3d`}
            name={bar.name || bar.dataKey}
          >
            <LabelList dataKey={bar.dataKey} position="insideTop" offset="-10" />
          </Bar>
        ))}
      </BarChart>
    </ResponsiveContainer>
  </>
}