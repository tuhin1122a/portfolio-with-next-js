// app/(dashboard)/dashboard/ProfileSection.tsx
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";

import Image from "next/image";

export default async function ProfileSection() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.isAdmin) {
    return (
      <p className="text-center text-red-500 mt-10">
        You are not authorized to view this page.
      </p>
    );
  }

  return (
    <div className="bg-[#0f172a] dark:bg-[#0e1a2c] rounded-2xl px-6 py-8 mb-8 shadow-md">
      <div className="flex items-center gap-6">
        <div className="flex-shrink-0">
          <Image
            src={session?.user?.image || "https://via.placeholder.com/72"}
            alt="Profile"
            width={72}
            height={72}
            className="rounded-xl border border-slate-700 shadow-sm object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-white text-2xl font-semibold mb-1">
            Welcome back,{" "}
            <span className="text-cyan-400">
              {session?.user?.name || "Admin"}
            </span>
          </h1>
          <p className="text-gray-400 text-base">
            {session?.user?.email || "admin@example.com"}
          </p>
        </div>
      </div>
    </div>
  );
}
