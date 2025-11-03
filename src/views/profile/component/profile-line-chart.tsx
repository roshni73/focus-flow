import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", visits: 120, actions: 85, tasks: 5 },
  { name: "Tue", visits: 150, actions: 100, tasks: 7 },
  { name: "Wed", visits: 180, actions: 130, tasks: 9 },
  { name: "Thu", visits: 160, actions: 120, tasks: 8 },
  { name: "Fri", visits: 210, actions: 160, tasks: 11 },
  { name: "Sat", visits: 0, actions: 0, tasks: 0 },
  { name: "Sun", visits: 100, actions: 70, tasks: 4 },
];

export default function WeeklyActivityChart() {
  return (
    <div className='w-full h-[40vh]'>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
        >
          <CartesianGrid
            strokeDasharray='3 3'
            stroke='#ccc'
          />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type='monotone'
            dataKey='visits'
            stroke='#4F46E5'
            strokeWidth={2}
            activeDot={{ r: 7 }}
            name='Visits'
          />
          <Line
            type='monotone'
            dataKey='actions'
            stroke='#22C55E'
            strokeWidth={2}
            name='Actions'
          />
          <Line
            type='monotone'
            dataKey='tasks'
            stroke='#F97316'
            strokeWidth={2}
            name='Tasks'
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
