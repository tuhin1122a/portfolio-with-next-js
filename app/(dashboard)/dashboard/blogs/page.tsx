// src/app/admin/blogs/page.tsx

"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";

import { useBlogs } from "@/hooks/useBlogs";
import { Blog } from "../../components/blogs";
import BlogFormDialog from "../../components/blogs/BlogFormDialog";
import BlogTable from "../../components/blogs/BlogTable";

export default function AdminBlogsPage() {
  const { blogs, loading, addBlog, updateBlog, deleteBlog } = useBlogs();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  const handleAddNew = () => {
    setEditingBlog(null);
    setDialogOpen(true);
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setDialogOpen(true);
  };

  const handleSubmit = async (data: any) => {
    if (editingBlog) {
      await updateBlog(editingBlog._id, data);
    } else {
      await addBlog(data);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Blog Posts</CardTitle>
              <CardDescription>Manage your blog content here.</CardDescription>
            </div>
            <Button className="gap-1" onClick={handleAddNew}>
              <Plus className="h-4 w-4" /> Add New Post
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : blogs.length > 0 ? (
            <BlogTable
              blogs={blogs}
              onEdit={handleEdit}
              onDelete={deleteBlog}
            />
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No blog posts found. Create your first post!</p>
            </div>
          )}
        </CardContent>
      </Card>

      <BlogFormDialog
        isOpen={isDialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        initialData={editingBlog}
      />
    </>
  );
}
