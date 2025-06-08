import { Conversation } from "@/app/(dashboard)/components/conversations";
import { IFooter } from "@/app/(dashboard)/components/footer";
import { IHeader } from "@/app/(dashboard)/components/header";
import {
  Project,
  ProjectFormData,
} from "@/app/(dashboard)/components/projects";

const API_BASE_URL = "/api/chat/conversations";

export const fetchConversations = async (
  isArchived: boolean
): Promise<Conversation[]> => {
  const response = await fetch(`${API_BASE_URL}?archived=${isArchived}`);
  if (!response.ok) {
    throw new Error("Failed to fetch conversations");
  }
  const data = await response.json();
  return data.conversations || [];
};

export const updateConversationArchiveStatus = async (
  id: string,
  isArchived: boolean
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isArchived }),
  });

  if (!response.ok) {
    throw new Error("Failed to update conversation");
  }
};

export const deleteConversation = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete conversation");
  }
};

// ... existing functions for conversations

export const getFooter = async (): Promise<IFooter | null> => {
  const response = await fetch("/api/footer");
  if (!response.ok) {
    console.error("Failed to fetch footer data");
    return null; // Return null to indicate failure
  }
  return response.json();
};

export const updateFooter = async (
  footerData: Partial<IFooter>
): Promise<IFooter> => {
  const response = await fetch("/api/footer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(footerData),
  });

  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.message || "Failed to update footer");
  }

  return responseData;
};

export const getHeader = async (): Promise<IHeader | null> => {
  const response = await fetch("/api/header");
  if (!response.ok) {
    console.error("Failed to fetch header data");
    return null;
  }
  return response.json();
};

export const updateHeader = async (
  headerData: Partial<IHeader>
): Promise<IHeader> => {
  const response = await fetch("/api/header", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(headerData),
  });
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.message || "Failed to update header");
  }
  return responseData;
};

export const uploadProfileImage = async (
  formData: FormData
): Promise<{ url: string }> => {
  const response = await fetch("/api/upload/profile-image", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Image upload failed");
  }
  return response.json();
};

// src/features/admin/projects/utils/api.ts

// Helper to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "An API error occurred");
  }
  return response.json();
}

// Transform form data to the required project structure for the API
const transformFormData = (formData: ProjectFormData) => {
  const tagsArray = formData.tags.split(",").map((tag) => tag.trim());
  const featuresArray = formData.features
    .split("\n")
    .filter((feature) => feature.trim() !== "");

  return {
    ...formData,
    tags: tagsArray,
    features: featuresArray,
  };
};

export const getProjects = (): Promise<Project[]> => {
  return fetch("/api/projects").then(handleResponse<Project[]>);
};

export const createProject = (
  projectData: ProjectFormData
): Promise<Project> => {
  const transformedData = transformFormData(projectData);
  return fetch(`${API_BASE_URL}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transformedData),
  }).then(handleResponse<Project>);
};

export const updateProject = (
  id: string,
  projectData: ProjectFormData
): Promise<Project> => {
  const transformedData = transformFormData(projectData);
  return fetch(`${API_BASE_URL}/projects/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transformedData),
  }).then(handleResponse<Project>);
};

export const deleteProject = (id: string): Promise<{ message: string }> => {
  return fetch(`${API_BASE_URL}/projects/${id}`, {
    method: "DELETE",
  }).then(handleResponse<{ message: string }>);
};

export const uploadFile = async (
  file: File,
  onUploadProgress: (progress: number) => void
): Promise<{ filePath: string }> => {
  const formData = new FormData();
  formData.append("file", file);

  // Simulate progress for a better user experience
  const progressInterval = setInterval(() => {
    onUploadProgress(Math.floor(Math.random() * 10) + 85); // Simulate 85-95% progress
  }, 500);

  try {
    const response = await fetch(`${API_BASE_URL}/upload/project-image`, {
      method: "POST",
      body: formData,
    });

    clearInterval(progressInterval);
    onUploadProgress(100);

    return handleResponse<{ filePath: string }>(response);
  } catch (error) {
    clearInterval(progressInterval);
    onUploadProgress(0); // Reset on error
    throw error;
  }
};
