import { Card } from '../../components/card';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface MonthlyData {
  month: string;
  sales: number;
  revenue: number;
  users: number;
}

interface CategoryData {
  [key: string]: number | string;
  name: string;
  value: number;
}

interface GrowthData {
  month: string;
  growth: number;
}

const monthlyData: MonthlyData[] = [
  { month: 'Jan', sales: 4000, revenue: 2400, users: 240 },
  { month: 'Feb', sales: 3000, revenue: 1398, users: 221 },
  { month: 'Mar', sales: 2000, revenue: 9800, users: 329 },
  { month: 'Apr', sales: 2780, revenue: 3908, users: 200 },
  { month: 'May', sales: 1890, revenue: 4800, users: 181 },
  { month: 'Jun', sales: 2390, revenue: 3800, users: 250 },
];

const categoryData: CategoryData[] = [
  { name: 'Electronics', value: 400 },
  { name: 'Clothing', value: 300 },
  { name: 'Food', value: 300 },
  { name: 'Books', value: 200 },
  { name: 'Sports', value: 150 },
];

const growthData: GrowthData[] = [
  { month: 'Jan', growth: 10 },
  { month: 'Feb', growth: 15 },
  { month: 'Mar', growth: 25 },
  { month: 'Apr', growth: 22 },
  { month: 'May', growth: 30 },
  { month: 'Jun', growth: 35 },
];

const COLORS = ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'];

export function Charts() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-700">Analytics & Charts</h1>
        <p className="text-gray-500">Visual representation of your business data</p>
      </div>
      <Card className="p-6 bg-white/50 backdrop-blur-sm border border-gray-200/50">
        <h3 className="text-lg font-semibold text-gray-600 mb-6">Monthly Sales & Revenue</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backdropFilter: 'blur(8px)'
              }}
            />
            <Legend />
            <Bar dataKey="sales" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            <Bar dataKey="revenue" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white/50 backdrop-blur-sm border border-gray-200/50">
          <h3 className="text-lg font-semibold text-gray-600 mb-6">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }: { name: string; percent: number }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  backdropFilter: 'blur(8px)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {categoryData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm text-gray-500">{item.name}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6 bg-white/50 backdrop-blur-sm border border-gray-200/50">
          <h3 className="text-lg font-semibold text-gray-600 mb-6">Growth Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  backdropFilter: 'blur(8px)'
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="growth"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ fill: '#10B981', r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <Card className="p-6 bg-white/50 backdrop-blur-sm border border-gray-200/50">
        <h3 className="text-lg font-semibold text-gray-600 mb-6">User Growth Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backdropFilter: 'blur(8px)'
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#EC4899"
              strokeWidth={3}
              dot={{ fill: '#EC4899', r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

export default Charts;