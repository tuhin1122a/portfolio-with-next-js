import { ContactApiResponse } from "@/components/home/contact/types";

export async function fetchContactInfo(): Promise<ContactApiResponse | null> {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/footer`, {
      next: { revalidate: 60 * 60 }, // cache for 1 hour
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
