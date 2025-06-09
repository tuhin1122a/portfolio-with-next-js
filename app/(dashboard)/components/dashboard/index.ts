// types/dashboard.ts

export interface DashboardCounts {
  projects: number;
  blogs: number;
  messages: number;
  users: number;
}

export interface ChartItem {
  name: string;
  value: number;
}

export interface DashboardData {
  chartData: ChartItem[];
  counts: DashboardCounts;
}
