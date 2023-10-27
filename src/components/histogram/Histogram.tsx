import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import CustomBarShape from './CustomBar';
import CustomTooltip from './CustomTooltip';

const Histogram = ({data, period}) => {
  return (
    <ResponsiveContainer width="100%" height={400} className='bg-[#FF00F5] bg-opacity-5 rounded-[27px]'>
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 40,
        right: 40,
        left: 40,
        bottom: 40,
      }}
    >
        <XAxis
          dataKey={period !== 'month' ? 'month' : 'day'}
          axisLine={false}
          tickLine={false}
          stroke='black'
          tickMargin={17}
          tickFormatter={(tickValue) => {
            const numTickValue = Number(tickValue);
            if (period === 'month') {
              return (numTickValue % 5 === 0 || numTickValue === 1) ? tickValue : '';
            } else {
              return tickValue;
            }
          }}
        />
      <YAxis
        axisLine={false}
        tickLine={false}
        stroke='black'
        />
      <Tooltip content={< CustomTooltip />} cursor={false} />
      <Bar
        dataKey="value"
        barSize={16}
        fill="#000AFF"
        radius={4}
        shape={<CustomBarShape />}
      />
    </BarChart>
  </ResponsiveContainer>
  )
}

export default Histogram;