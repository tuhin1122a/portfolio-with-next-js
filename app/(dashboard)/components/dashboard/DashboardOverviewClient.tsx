"use client";
import DashboardCard from "@/components/DashboardCard";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

const BarChartClient = dynamic(() => import("./BarChart"), { ssr: false });
const PieChartClient = dynamic(() => import("./PieChart"), { ssr: false });

export default function DashboardOverviewClient({ counts }) {
  const { data: session } = useSession();

  if (!session?.user?.isAdmin) {
    return (
      <p className="text-center text-red-500 mt-10">
        You are not authorized to view this page.
      </p>
    );
  }

  return (
    <>
      {/* welcome */}
      {/* cards */}
      <div className="grid ...">
        <DashboardCard /* as before */ />
        {/* ... */}
      </div>
      {/* lazy-loaded charts */}
      {counts && (
        <div className="grid ...">
          <BarChartClient data={counts} />
          <PieChartClient data={counts} />
        </div>
      )}
    </>
  );
}
