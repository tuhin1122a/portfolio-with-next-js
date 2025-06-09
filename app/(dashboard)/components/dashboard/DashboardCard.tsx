"use client";

import { ArrowRight } from "lucide-react";

const Card = ({
  title,
  count,
  icon,
}: {
  title: string;
  count: number;
  icon: string;
}) => (
  <div className="relative rounded-2xl shadow-lg p-6 bg-white text-gray-800 dark:bg-slate-800 dark:text-white border border-gray-200 dark:border-slate-700 flex items-center justify-between min-h-[140px] overflow-hidden transition-colors duration-300">
    <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-gray-100 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 opacity-90" />
    <div className="relative z-10 flex items-center justify-between w-full">
      <div className="flex flex-col justify-center">
        <h4 className="text-sm font-medium text-gray-500 dark:text-slate-300 mb-2">
          {title}
        </h4>
        <p className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {count}
        </p>
        <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-500 dark:hover:text-blue-300 transition-colors cursor-pointer">
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

export default function DashboardCard({
  counts,
}: {
  counts: { projects: number; blogs: number; messages: number; users: number };
}) {
  return (
    <>
      <Card title="Projects" count={counts.projects} icon="📁" />
      <Card title="Blogs" count={counts.blogs} icon="📝" />
      <Card title="Messages" count={counts.messages} icon="📬" />
      <Card title="Users" count={counts.users} icon="👤" />
    </>
  );
}
