import {
  RiBarChart2Line,
  RiCheckLine,
  RiFolderLine,
  RiUserLine,
} from "react-icons/ri";

export const KPI = [
  {
    id: 1,
    title: "Active Clients",
    icon: <RiUserLine />,
    value: 400,
    metrics: 2,
    stats: "Client",
  },
  {
    id: 2,
    title: "Projects in Progress",
    icon: <RiFolderLine />,
    value: 18,
    metrics: 5,
    stats: "Project",
  },
  {
    id: 3,
    title: "Revenue This Month",
    icon: <RiBarChart2Line />,
    value: "$12,450",
    metrics: 8,
    stats: "Revenue",
  },
];

export const USER_KPI = [
  {
    id: 1,
    title: "Active Projects",
    icon: <RiFolderLine />,
    value: 5,
    metrics: 2,
    stats: "Ongoing",
  },
  {
    id: 2,
    title: "Tasks in Progress",
    icon: <RiCheckLine />,
    value: 18,
    metrics: 6,
    stats: "Tasks",
  },
  {
    id: 3,
    title: "Performance Score",
    icon: <RiBarChart2Line />,
    value: "92%",
    metrics: 3,
    stats: "Improved",
  },
];

export const TOP_CLIENTS = [
  {
    id: 1,
    name: "Prashanna Lohani",
    company: "Nepal Bank Limited",
    revenue: "$12,450",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    company: "Tech Solutions Inc",
    revenue: "$9,800",
  },
  {
    id: 3,
    name: "Michael Chen",
    company: "Global Industries",
    revenue: "$8,200",
  },
];

export const RECENT_ACTIVITIES = [
  {
    id: 1,
    title: "E-commerce Website Launch",
    project: "Awwwsome Digital",
    status: "Completed",
    date: "Oct 29, 2025",
  },
  {
    id: 2,
    title: "SEO Optimization – TechVision",
    project: "TechVision Global",
    status: "In Progress",
    date: "Oct 31, 2025",
  },
  {
    id: 3,
    title: "Game Asset Design Update",
    project: "Pixelverse Studio",
    status: "Pending Review",
    date: "Nov 2, 2025",
  },
];

export const monthlyRevenueData = [
  { month: "Jan", Revenue: 8200 },
  { month: "Feb", Revenue: 9100 },
  { month: "Mar", Revenue: 10400 },
  { month: "Apr", Revenue: 9700 },
  { month: "May", Revenue: 11200 },
  { month: "Jun", Revenue: 12500 },
  { month: "Jul", Revenue: 11900 },
  { month: "Aug", Revenue: 13800 },
  { month: "Sep", Revenue: 14400 },
  { month: "Oct", Revenue: 15800 },
  { month: "Nov", Revenue: 17100 },
  { month: "Dec", Revenue: 18600 },
];

export const userTaskTrendData = [
  { month: "Jan", Completed: 32, Pending: 8 },
  { month: "Feb", Completed: 40, Pending: 6 },
  { month: "Mar", Completed: 45, Pending: 5 },
  { month: "Apr", Completed: 42, Pending: 9 },
  { month: "May", Completed: 50, Pending: 4 },
  { month: "Jun", Completed: 53, Pending: 6 },
  { month: "Jul", Completed: 58, Pending: 5 },
  { month: "Aug", Completed: 60, Pending: 3 },
  { month: "Sep", Completed: 62, Pending: 4 },
  { month: "Oct", Completed: 65, Pending: 2 },
  { month: "Nov", Completed: 69, Pending: 3 },
  { month: "Dec", Completed: 72, Pending: 1 },
];
