// src/features/admin/services/types/index.ts

export interface IService {
  _id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price?: string;
  isPopular?: boolean;
  order: number;
}

export type ServiceFormData = Omit<IService, "_id" | "order" | "features"> & {
  features: string; // The form will handle features as a single string.
};
