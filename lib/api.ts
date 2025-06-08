// api/conversationsApi.ts
import { Conversation } from "@/app/(dashboard)/components/conversations";

const BASE_API_URL = "/api/chat/conversations";

export const fetchConversations = async (
  isArchived: boolean
): Promise<Conversation[]> => {
  const response = await fetch(`${BASE_API_URL}?archived=${isArchived}`);
  if (!response.ok) throw new Error("Failed to fetch conversations");
  const data = await response.json();
  return data.conversations || [];
};

export const updateConversationArchiveStatus = async (
  id: string,
  isArchived: boolean
): Promise<void> => {
  const response = await fetch(`${BASE_API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isArchived }),
  });
  if (!response.ok) throw new Error("Failed to update conversation");
};

export const deleteConversation = async (id: string): Promise<void> => {
  const response = await fetch(`${BASE_API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete conversation");
};

// api/footerApi.ts
import { IFooter } from "@/app/(dashboard)/components/footer";

export const getFooter = async (): Promise<IFooter | null> => {
  const response = await fetch("/api/footer");
  if (!response.ok) {
    console.error("Failed to fetch footer data");
    return null;
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
  if (!response.ok)
    throw new Error(responseData.message || "Failed to update footer");
  return responseData;
};

// api/headerApi.ts
import { IHeader } from "@/app/(dashboard)/components/header";

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
  if (!response.ok)
    throw new Error(responseData.message || "Failed to update header");
  return responseData;
};

// api/uploadApi.ts
export const uploadProfileImage = async (
  formData: FormData
): Promise<{ url: string }> => {
  const response = await fetch("/api/upload/profile-image", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) throw new Error("Image upload failed");
  return response.json();
};

export const uploadProjectFile = async (
  file: File,
  onUploadProgress: (progress: number) => void
): Promise<{ filePath: string }> => {
  const formData = new FormData();
  formData.append("file", file);

  const progressInterval = setInterval(() => {
    onUploadProgress(Math.floor(Math.random() * 10) + 85);
  }, 500);

  try {
    const response = await fetch("/api/projects/upload/project-image", {
      method: "POST",
      body: formData,
    });

    clearInterval(progressInterval);
    onUploadProgress(100);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Upload failed");
    }

    return response.json();
  } catch (error) {
    clearInterval(progressInterval);
    onUploadProgress(0);
    throw error;
  }
};

// api/projectsApi.ts
import {
  Project,
  ProjectFormData,
} from "@/app/(dashboard)/components/projects";

const transformProjectFormData = (formData: ProjectFormData) => {
  return {
    ...formData,
    tags: formData.tags.split(",").map((tag) => tag.trim()),
    features: formData.features.split("\n").filter((f) => f.trim() !== ""),
  };
};

async function handleProjectResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Project API error");
  }
  return response.json();
}

export const getProjects = (): Promise<Project[]> => {
  return fetch("/api/projects").then(handleProjectResponse);
};

export const createProject = (data: ProjectFormData): Promise<Project> => {
  return fetch("/api/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transformProjectFormData(data)),
  }).then(handleProjectResponse);
};

export const updateProject = (
  id: string,
  data: ProjectFormData
): Promise<Project> => {
  return fetch(`/api/projects/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transformProjectFormData(data)),
  }).then(handleProjectResponse);
};

export const deleteProject = (id: string): Promise<{ message: string }> => {
  return fetch(`/api/projects/${id}`, {
    method: "DELETE",
  }).then(handleProjectResponse);
};

// api/servicesApi.ts
import {
  IService,
  ServiceFormData,
} from "@/app/(dashboard)/components/services";

const transformServiceFormData = (formData: ServiceFormData) => {
  return {
    ...formData,
    features: formData.features.split("\n").filter((f) => f.trim() !== ""),
  };
};

async function handleServiceResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Service API error");
  }
  return response.json();
}

export const getServices = (): Promise<IService[]> => {
  return fetch("/api/services").then(handleServiceResponse);
};

export const createService = (data: ServiceFormData): Promise<IService> => {
  return fetch("/api/services", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transformServiceFormData(data)),
  }).then(handleServiceResponse);
};

export const updateService = (
  id: string,
  data: Partial<ServiceFormData> | { order: number }
): Promise<IService> => {
  const body =
    "features" in data
      ? transformServiceFormData(data as ServiceFormData)
      : data;
  return fetch(`/api/services/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then(handleServiceResponse);
};

export const deleteService = (id: string): Promise<{ message: string }> => {
  return fetch(`/api/services/${id}`, {
    method: "DELETE",
  }).then(handleServiceResponse);
};

export const swapServiceOrder = async (
  service1: IService,
  service2: IService
): Promise<void> => {
  await Promise.all([
    updateService(service1._id, { order: service2.order }),
    updateService(service2._id, { order: service1.order }),
  ]);
};
