import {
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// #region Sample data
export const conversionRateData = [
  { name: "Web", value: 24, fill: "#007bff" },
  { name: "SEO", value: 64, fill: "#28a745" },
  { name: "Game", value: 58, fill: "#ffc107" },
  { name: "Cloud", value: 69, fill: "#17a2b8" },
  { name: "Other", value: 50, fill: "#d3d3d3" },
];
// #endregion

const legendStyle = {
  bottom: 0,
  left: "50%",
  transform: "translateX(-50%) translateY(-90%)",
  lineHeight: "24px",
};

export const AnalyticsRadialBarChart = () => {
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <ResponsiveContainer
        width='100%'
        height='100%'
      >
        <RadialBarChart
          cx='50%'
          cy='40%'
          innerRadius='10%'
          outerRadius='90%'
          barSize={25} // increased bar thickness
          data={conversionRateData}
        >
          <RadialBar
            background
            dataKey='value'
            cornerRadius={12} // rounded bars
          />
          <Tooltip
            cursor={true}
            formatter={(value: number, name: string) => [`${value}%`, name]}
          />
          <Legend
            iconSize={12}
            layout='horizontal'
            verticalAlign='bottom'
            wrapperStyle={legendStyle}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};
