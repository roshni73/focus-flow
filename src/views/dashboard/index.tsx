import { useEffect, useState } from 'react';

import { Users, TrendingUp, DollarSign, ShoppingCart, ArrowUp, ArrowDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/card';


interface StatCard {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
  color: string;
}

interface Activity {
  action: string;
  time: string;
  type: 'user' | 'order' | 'payment' | 'comment';
}

interface Metric {
  label: string;
  value: string;
  progress: number;
}

export function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<StatCard[]>([]);

  useEffect(() => {
    // Simulate fetching dashboard data
    const mockStats: StatCard[] = [
      {
        title: 'Total Users',
        value: '2,543',
        change: 12.5,
        icon: Users,
        color: 'bg-blue-500',
      },
      {
        title: 'Revenue',
        value: '$45,678',
        change: 8.2,
        icon: DollarSign,
        color: 'bg-green-500',
      },
      {
        title: 'Orders',
        value: '1,234',
        change: -3.4,
        icon: ShoppingCart,
        color: 'bg-purple-500',
      },
      {
        title: 'Growth',
        value: '23.5%',
        change: 5.1,
        icon: TrendingUp,
        color: 'bg-orange-500',
      },
    ];

    setStats(mockStats);
  }, []);

  const activities: Activity[] = [
    { action: 'New user registered', time: '2 minutes ago', type: 'user' },
    { action: 'Order #1234 completed', time: '15 minutes ago', type: 'order' },
    { action: 'Payment received', time: '1 hour ago', type: 'payment' },
    { action: 'New comment posted', time: '2 hours ago', type: 'comment' },
  ];

  const metrics: Metric[] = [
    { label: 'Conversion Rate', value: '3.24%', progress: 65 },
    { label: 'Avg. Order Value', value: '$142', progress: 78 },
    { label: 'Customer Satisfaction', value: '4.8/5', progress: 96 },
    { label: 'Active Sessions', value: '147', progress: 45 },
  ];

  const getActivityColor = (type: Activity['type']): string => {
    const colors = {
      user: 'bg-blue-500',
      order: 'bg-purple-500',
      payment: 'bg-green-500',
      comment: 'bg-orange-500',
    };
    return colors[type];
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your business today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.change > 0;

          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</p>
                  <div className="flex items-center gap-1">
                    {isPositive ? (
                      <ArrowUp size={16} className="text-green-500" />
                    ) : (
                      <ArrowDown size={16} className="text-red-500" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        isPositive ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {Math.abs(stat.change)}%
                    </span>
                    <span className="text-sm text-gray-500">vs last month</span>
                  </div>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 pb-3 border-b border-gray-200 last:border-0 last:pb-0">
                <div
                  className={`w-2 h-2 rounded-full ${getActivityColor(activity.type)}`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Stats */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
          <div className="space-y-4">
            {metrics.map((metric, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">{metric.label}</span>
                  <span className="text-sm font-medium text-gray-900">{metric.value}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${metric.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;