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
    <div className="bg-white dark:bg-[#0e1a2c] rounded-2xl px-6 py-8 mb-8 shadow-md border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <div className="flex items-center gap-6">
        <div className="flex-shrink-0">
          <Image
            src={session.user.image || "https://via.placeholder.com/72"}
            alt="Profile"
            width={72}
            height={72}
            className="rounded-xl border border-gray-300 dark:border-slate-700 shadow-sm object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-gray-900 dark:text-white text-2xl font-semibold mb-1">
            Welcome back,{" "}
            <span className="text-cyan-600 dark:text-cyan-400">
              {session.user.name || "Admin"}
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-base">
            {session.user.email || "admin@example.com"}
          </p>
        </div>
      </div>
    </div>
  );
}
