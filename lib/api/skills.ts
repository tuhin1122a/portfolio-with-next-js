import { Skill } from "@/lib/models/skill";
import { connectToDB } from "@/lib/mongodb";

export async function getSkills() {
  await connectToDB(); // DB connection ensure
  return await Skill.find(); // Direct MongoDB থেকে fetch
}
