"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const Card = ({ title, count, icon }) => (
  <div className="relative rounded-2xl shadow-lg p-6 bg-slate-800 text-white border border-slate-700 flex items-center justify-between min-h-[140px] overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 opacity-90" />
    <div className="relative z-10 flex items-center justify-between w-full">
      <div className="flex flex-col justify-center">
        <h4 className="text-sm font-medium text-slate-300 mb-2">{title}</h4>
        <p className="text-4xl font-bold text-white mb-4">{count}</p>
        <div className="flex items-center text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors cursor-pointer">
          <span>View</span>
          <ArrowRight className="ml-1 w-4 h-4" />
        </div>
      </div>
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  </div>
);

export default function DashboardCard() {
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
        console.error("Failed to fetch dashboard counts:", error);
      }
    }

    fetchCounts();
  }, []);

  return (
    <>
      <Card title="Projects" count={counts.projects} icon="📁" />
      <Card title="Blogs" count={counts.blogs} icon="📝" />
      <Card title="Messages" count={counts.messages} icon="📬" />
      <Card title="Users" count={counts.users} icon="👤" />
    </>
  );
}
