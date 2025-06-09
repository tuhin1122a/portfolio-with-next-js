// src/features/admin/projects/types/index.ts

export interface Project {
  _id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  createdAt: string;
  features?: string[];
  screenshots?: string[];
}

export interface ProjectFormData {
  title: string;
  description: string;
  longDescription: string;
  tags: string;
  demoUrl: string;
  githubUrl: string;
  features: string;
  featured: boolean;
  image: string;
  screenshots: string[];
}
