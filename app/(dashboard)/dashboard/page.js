"use client";

import { useSession } from "next-auth/react";
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

// Card Component with Dark Mode
const DashboardCard = ({
  title,
  count,
  icon,
  bgColor,
  textColor,
  darkBgColor,
}) => (
  <div
    className={`rounded-2xl shadow-md p-5 ${bgColor} text-${textColor} dark:${darkBgColor} dark:text-white flex items-center justify-between`}
  >
    <div>
      <h4 className="text-sm font-medium">{title}</h4>
      <p className="text-3xl font-bold mt-1">{count}</p>
    </div>
    <div className="text-4xl">{icon}</div>
  </div>
);

export default function AdminDashboardHome() {
  const { data: session } = useSession();
  const [counts, setCounts] = useState({
    projects: 0,
    blogs: 0,
    messages: 0,
    users: 0,
  });

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [projectsRes, blogsRes, messagesRes, usersRes] =
          await Promise.all([
            fetch("/api/projects"),
            fetch("/api/blogs"),
            fetch("/api/contact"),
            fetch("/api/users"),
          ]);

        const [projects, blogs, messages, users] = await Promise.all([
          projectsRes.json(),
          blogsRes.json(),
          messagesRes.json(),
          usersRes.json(),
        ]);

        setCounts({
          projects: Array.isArray(projects) ? projects.length : 0,
          blogs: Array.isArray(blogs) ? blogs.length : 0,
          messages: Array.isArray(messages) ? messages.length : 0,
          users: Array.isArray(users) ? users.length : 0,
        });
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    }

    if (session?.user?.isAdmin) {
      fetchCounts();
    }
  }, [session]);

  const chartData = [
    { name: "Projects", value: counts.projects },
    { name: "Blogs", value: counts.blogs },
    { name: "Messages", value: counts.messages },
    { name: "Users", value: counts.users },
  ];

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

  if (!session?.user?.isAdmin) {
    return (
      <p className="text-center text-red-500 mt-10">
        You are not authorized to view this page.
      </p>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        👋 Welcome back, Admin
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <DashboardCard
          title="Projects"
          count={counts.projects}
          icon="📁"
          bgColor="bg-blue-100"
          textColor="blue-800"
          darkBgColor="bg-blue-800"
        />
        <DashboardCard
          title="Blogs"
          count={counts.blogs}
          icon="📝"
          bgColor="bg-green-100"
          textColor="green-800"
          darkBgColor="bg-green-800"
        />
        <DashboardCard
          title="Messages"
          count={counts.messages}
          icon="📬"
          bgColor="bg-yellow-100"
          textColor="yellow-800"
          darkBgColor="bg-yellow-700"
        />
        <DashboardCard
          title="Users"
          count={counts.users}
          icon="👤"
          bgColor="bg-red-100"
          textColor="red-800"
          darkBgColor="bg-red-800"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-5">
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
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-5">
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
                {chartData.map((entry, index) => (
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
    </div>
  );
}
