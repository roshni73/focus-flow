import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getCookie } from "../../../utils/cookies";

const data = [
  { name: "Website Projects", value: 420 },
  { name: "SEO Campaigns", value: 280 },
  { name: "Game Development", value: 200 },
  { name: "Cloud Services", value: 160 },
];

export const userProjectTypeData = [
  { name: "Web Development", value: 45 },
  { name: "SEO Optimization", value: 25 },
  { name: "Game Design", value: 15 },
  { name: "Cloud Services", value: 15 },
];

const COLORS = ["#6C63FF", "#FF6584", "#FFB347", "#4ECDC4"];

export default function ClientSourceBreakdown({
  isAnimationActive = true,
}: {
  isAnimationActive?: boolean;
}) {
  const userRole = getCookie("auth_role");
  const isUser = userRole === "user";
  const chartData = isUser ? userProjectTypeData : data;
  return (
    <div className='flex flex-col items-center w-full h-full'>
      <ResponsiveContainer
        width='100%'
        height={340}
      >
        <PieChart>
          <Pie
            data={chartData}
            dataKey='value'
            nameKey='name'
            innerRadius='65%'
            outerRadius='90%'
            paddingAngle={4}
            cornerRadius={10}
            isAnimationActive={isAnimationActive}
          >
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke='#fff'
                strokeWidth={3}
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
            labelStyle={{ color: "#374151", fontWeight: 600 }}
          />

          <Legend
            layout='horizontal'
            verticalAlign='bottom'
            align='center'
            iconType='circle'
            wrapperStyle={{
              paddingTop: "10px",
              fontSize: "14px",
              color: "#374151",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
