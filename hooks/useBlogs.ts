// src/app/admin/blogs/hooks/useBlogs.ts

"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import type { Blog } from "../types";

export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/blogs");
      if (!response.ok) throw new Error("Failed to fetch blogs");
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Failed to load blog posts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const addBlog = async (
    blogData: Omit<Blog, "_id" | "createdAt" | "author">
  ) => {
    const response = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blogData),
    });
    if (!response.ok) throw new Error("Failed to create blog post");
    await fetchBlogs(); // Refresh the list
  };

  const updateBlog = async (id: string, blogData: Partial<Blog>) => {
    const response = await fetch(`/api/blogs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blogData),
    });
    if (!response.ok) throw new Error("Failed to update blog post");
    await fetchBlogs(); // Refresh the list
  };

  const deleteBlog = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      try {
        const response = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete blog post");
        toast.success("Blog post deleted successfully.");
        await fetchBlogs(); // Refresh the list
      } catch (error) {
        console.error("Error deleting blog post:", error);
        toast.error("Failed to delete blog post.");
      }
    }
  };

  return { blogs, loading, addBlog, updateBlog, deleteBlog };
}
