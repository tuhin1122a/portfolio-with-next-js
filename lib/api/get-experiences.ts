// lib/data/get-experiences.ts

import { IExperience } from "../models/experience";

export async function getExperiences(): Promise<IExperience[]> {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/experiences`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch experiences");
  return res.json();
}
