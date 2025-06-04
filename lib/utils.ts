import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Serializes MongoDB documents to plain objects for client components
 */
export function serializeData<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}
