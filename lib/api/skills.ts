import { ISkill } from "../models/skill";

export async function getSkills(): Promise<ISkill[]> {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/skills`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch skills");
    return res.json();
  } catch (error) {
    console.error("Error loading skills:", error);
    return [];
  }
}
