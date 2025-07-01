import { Skill } from "@/lib/models/skill";
import { connectToDB } from "@/lib/mongodb";

export async function getSkills() {
  await connectToDB();
  const skills = await Skill.find().lean();

  // Convert _id (ObjectId) to string manually
  return skills.map((skill) => ({
    ...skill,
    _id: skill._id.toString(), // ✅ Important
  }));
}
