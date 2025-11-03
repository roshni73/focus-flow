import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// #region SEO Keyword Trend Data
export const seoKeywordTrendData = [
  { month: "Jan", Rank: 48 },
  { month: "Feb", Rank: 42 },
  { month: "Mar", Rank: 36 },
  { month: "Apr", Rank: 30 },
  { month: "May", Rank: 25 },
  { month: "Jun", Rank: 22 },
  { month: "Jul", Rank: 18 },
  { month: "Aug", Rank: 15 },
  { month: "Sep", Rank: 14 },
  { month: "Oct", Rank: 12 },
  { month: "Nov", Rank: 10 },
  { month: "Dec", Rank: 9 },
];
// #endregion

const SEOKeywordTrendChart = () => {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ResponsiveContainer
        width='100%'
        height='100%'
      >
        <BarChart
          data={seoKeywordTrendData}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='month' />
          <YAxis />
          <Tooltip formatter={(value) => `${value}`} />
          <Legend />
          <Bar
            dataKey='Rank'
            fill='#4e42d9'
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SEOKeywordTrendChart;
