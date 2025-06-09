"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

export default function ChartSection() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [projects, blogs, messages, users] = await Promise.all([
          fetch("/api/projects").then((res) => res.json()),
          fetch("/api/blogs").then((res) => res.json()),
          fetch("/api/contact").then((res) => res.json()),
          fetch("/api/users").then((res) => res.json()),
        ]);

        setChartData([
          { name: "Projects", value: projects?.length || 0 },
          { name: "Blogs", value: blogs?.length || 0 },
          { name: "Messages", value: messages?.length || 0 },
          { name: "Users", value: users?.length || 0 },
        ]);
      } catch (err) {
        console.error("Failed to load chart data:", err);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Bar Chart */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-5">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">
          Overview (Bar Chart)
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#888" />
            <YAxis allowDecimals={false} stroke="#888" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                borderRadius: "8px",
                border: "none",
                color: "#fff",
              }}
              cursor={{ fill: "rgba(156, 163, 175, 0.1)" }}
            />
            <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-5">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">
          Distribution (Pie Chart)
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              label
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend wrapperStyle={{ color: "white" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                borderRadius: "8px",
                border: "none",
                color: "#fff",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
