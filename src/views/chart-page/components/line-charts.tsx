import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const trafficOverviewData = [
  { week: "Week 1", Web: 1200, SEO: 800, Game: 500, Cloud: 600 },
  { week: "Week 2", Web: 1450, SEO: 900, Game: 650, Cloud: 720 },
  { week: "Week 3", Web: 1600, SEO: 1050, Game: 700, Cloud: 850 },
  { week: "Week 4", Web: 1780, SEO: 1200, Game: 830, Cloud: 910 },
  { week: "Week 5", Web: 1900, SEO: 1300, Game: 950, Cloud: 990 },
  { week: "Week 6", Web: 2100, SEO: 1500, Game: 1100, Cloud: 1150 },
];

export default function AnalyticsAreaChart() {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ResponsiveContainer
        width='100%'
        height='100%'
      >
        <AreaChart
          data={trafficOverviewData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient
              id='colorWeb'
              x1='0'
              y1='0'
              x2='0'
              y2='1'
            >
              <stop
                offset='5%'
                stopColor='#8884d8'
                stopOpacity={0.8}
              />
              <stop
                offset='95%'
                stopColor='#8884d8'
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient
              id='colorSEO'
              x1='0'
              y1='0'
              x2='0'
              y2='1'
            >
              <stop
                offset='5%'
                stopColor='#82ca9d'
                stopOpacity={0.8}
              />
              <stop
                offset='95%'
                stopColor='#82ca9d'
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient
              id='colorGame'
              x1='0'
              y1='0'
              x2='0'
              y2='1'
            >
              <stop
                offset='5%'
                stopColor='#ffc658'
                stopOpacity={0.8}
              />
              <stop
                offset='95%'
                stopColor='#ffc658'
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient
              id='colorCloud'
              x1='0'
              y1='0'
              x2='0'
              y2='1'
            >
              <stop
                offset='5%'
                stopColor='#ff7300'
                stopOpacity={0.8}
              />
              <stop
                offset='95%'
                stopColor='#ff7300'
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='week' />
          <YAxis />
          <Tooltip />
          <Legend />

          <Area
            type='monotone'
            dataKey='Web'
            stroke='#8884d8'
            fillOpacity={1}
            fill='url(#colorWeb)'
          />
          <Area
            type='monotone'
            dataKey='SEO'
            stroke='#82ca9d'
            fillOpacity={1}
            fill='url(#colorSEO)'
          />
          <Area
            type='monotone'
            dataKey='Game'
            stroke='#ffc658'
            fillOpacity={1}
            fill='url(#colorGame)'
          />
          <Area
            type='monotone'
            dataKey='Cloud'
            stroke='#ff7300'
            fillOpacity={1}
            fill='url(#colorCloud)'
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
