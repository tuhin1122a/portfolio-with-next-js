import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { authOptions } from "./auth-options";

export async function getDashboardData() {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  // ✅ Await headers() to follow App Router rules
  const headerList = await headers();
  const cookie = headerList.get("cookie") || "";

  const fetchOptions = {
    headers: {
      cookie,
    },
    cache: "no-store" as const,
  };

  const session = await getServerSession(authOptions);

  const [projectsRes, blogsRes, messagesRes, usersRes] = await Promise.all([
    fetch(`${baseUrl}/api/projects`, fetchOptions),
    fetch(`${baseUrl}/api/blogs`, fetchOptions),
    fetch(`${baseUrl}/api/contact`, fetchOptions),
    fetch(`${baseUrl}/api/users`, fetchOptions),
  ]);

  const [projects, blogs, messages, users] = await Promise.all([
    projectsRes.json(),
    blogsRes.json(),
    messagesRes.json(),
    usersRes.json(),
  ]);

  return {
    chartData: [
      {
        name: "Projects",
        value: Array.isArray(projects) ? projects.length : 0,
      },
      { name: "Blogs", value: Array.isArray(blogs) ? blogs.length : 0 },
      {
        name: "Messages",
        value: Array.isArray(messages) ? messages.length : 0,
      },
      { name: "Users", value: Array.isArray(users) ? users.length : 0 },
    ],
    counts: {
      projects: Array.isArray(projects) ? projects.length : 0,
      blogs: Array.isArray(blogs) ? blogs.length : 0,
      messages: Array.isArray(messages) ? messages.length : 0,
      users: Array.isArray(users) ? users.length : 0,
    },
  };
}
