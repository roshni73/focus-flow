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
import { getCookie } from "../../../utils/cookies";
import { monthlyRevenueData, userTaskTrendData } from "./mock-data";

export default function MonthlyRevenueChart() {
  const userRole = getCookie("auth_role");
  const isUser = userRole === "user";
  const chartData = isUser ? userTaskTrendData : monthlyRevenueData;

  return (
    <div className='w-full h-[40vh]'>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
        >
          <CartesianGrid
            strokeDasharray='3 3'
            stroke='#ccc'
          />
          <XAxis dataKey='month' />
          <YAxis />
          <Tooltip />
          <Legend />
          {isUser ? (
            <>
              <Line
                type='monotone'
                dataKey='Completed'
                stroke='#22c55e'
                strokeWidth={3}
                dot={{ r: 5 }}
              />
              <Line
                type='monotone'
                dataKey='Pending'
                stroke='#ef4444'
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </>
          ) : (
            <Line
              type='monotone'
              dataKey='Revenue'
              stroke='#007bff'
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
