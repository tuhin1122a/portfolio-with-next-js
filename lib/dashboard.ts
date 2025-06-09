// lib/dashboard.ts
export async function getCounts() {
  const [projectsRes, blogsRes, messagesRes, usersRes] = await Promise.all([
    fetch("/api/projects", { cache: "no-store" }),
    fetch("/api/blogs", { cache: "no-store" }),
    fetch("/api/contact", { cache: "no-store" }),
    fetch("/api/users", { cache: "no-store" }),
  ]);
  const [projects, blogs, messages, users] = await Promise.all([
    projectsRes.json(),
    blogsRes.json(),
    messagesRes.json(),
    usersRes.json(),
  ]);
  return {
    projects: projects.length,
    blogs: blogs.length,
    messages: messages.length,
    users: users.length,
  };
}
