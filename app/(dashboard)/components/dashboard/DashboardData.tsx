import { getCounts } from "@/lib/dashboard";
import DashboardOverviewClient from "./DashboardOverviewClient";

export default async function DashboardData() {
  const counts = await getCounts(); // server-side fetch

  return <DashboardOverviewClient counts={counts} />;
}
