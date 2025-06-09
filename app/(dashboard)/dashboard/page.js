import { authOptions } from "@/lib/auth-options";
import { getDashboardData } from "@/lib/dashboard";
import { getServerSession } from "next-auth";
import ChartSection from "../components/dashboard/ChartSection";
import DashboardCard from "../components/dashboard/DashboardCard";
import ProfileSection from "../components/dashboard/ProfileSection";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  const { chartData, counts } = await getDashboardData();
  return (
    <div className="p-6 flex flex-col gap-6">
      <ProfileSection />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <DashboardCard />
      </div>
      <ChartSection />
    </div>
  );
}
