import "server-only"

import { About } from "@/lib/models/about"
import type { IAbout } from "@/lib/models/about"
import { connectToDB } from "../mongodb"

export async function getAboutData(): Promise<Partial<IAbout>> {
  try {
    // Connect to database
    await connectToDB()

    // Fetch about data
    let about = await About.findOne()

    if (!about) {
      // Create default about data if none exists
      about = await About.create({
        fullName: "",
        email: "",
        bio: "",
        bioExtended:
          "",
        bioConclusion:
          "",
        location: "",
        availability: "",
        resumeUrl: "",
        education: [],
        languages: [],
        interests: [],
      })
    }

    // Convert to plain object and return
    return JSON.parse(JSON.stringify(about))
  } catch (error) {
    console.error("Error fetching about data:", error)
    return {}
  }
}

export async function updateAboutData(data: Partial<IAbout>): Promise<Partial<IAbout>> {
  try {
    // Connect to database
    await connectToDB()

    // Find existing about data
    let about = await About.findOne()

    if (!about) {
      // Create new about data if none exists
      about = await About.create(data)
    } else {
      // Update existing about data
      Object.assign(about, data)
      await about.save()
    }

    // Convert to plain object and return
    return JSON.parse(JSON.stringify(about))
  } catch (error) {
    console.error("Error updating about data:", error)
    throw new Error("Failed to update about data")
  }
}

