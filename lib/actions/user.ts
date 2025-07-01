"use server";

import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";
import { authOptions } from "../auth-options";
import { User } from "../models/user";
import { connectToDB } from "../mongodb";

// Get current user data
export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return null;
  }

  try {
    await connectToDB();
    const user = await User.findById(session.user.id).select("-password");

    if (!user) {
      return null;
    }

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}

// Update user profile
export async function updateUserProfile(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("You must be signed in to update your profile");
  }

  try {
    await connectToDB();

    const name = formData.get("name") as string;
    const bio = formData.get("bio") as string;
    const location = formData.get("location") as string;

    if (!name) {
      throw new Error("Name is required");
    }

    const updateData: Record<string, any> = {
      name,
      bio,
      location,
    };

    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw new Error("Failed to update profile");
    }

    revalidatePath("/profile");
    return { success: true };
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}

// Change password
export async function changePassword(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("You must be signed in to change your password");
  }

  try {
    await connectToDB();

    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!currentPassword || !newPassword || !confirmPassword) {
      throw new Error("All fields are required");
    }

    if (newPassword !== confirmPassword) {
      throw new Error("New passwords do not match");
    }

    const user = await User.findById(session.user.id);

    if (!user || !user.password) {
      throw new Error("User not found or no password set");
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error("Current password is incorrect");
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await User.findByIdAndUpdate(session.user.id, {
      $set: { password: hashedPassword },
    });

    revalidatePath("/profile");
    return { success: true };
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
}

// Upload profile image
export async function uploadProfileImage(formData: FormData) {
  const baseUrl =
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      : "";

  const res = await fetch(`${baseUrl}/api/upload/profile-image`, {
    method: "POST",
    body: formData,
    credentials: "include", // Important for cookie-based session
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Upload failed");
  }

  return data; // { success: true, imageUrl }
}

// Get user activity
export async function getUserActivity() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return [];
  }

  try {
    await connectToDB();

    // This is a placeholder for actual activity tracking
    // In a real application, you would have a separate model for user activity
    const mockActivity = [
      {
        type: "login",
        timestamp: new Date(),
        details: "Logged in successfully",
      },
      {
        type: "profile_update",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        details: "Updated profile information",
      },
      {
        type: "password_change",
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        details: "Changed password",
      },
    ];

    return mockActivity;
  } catch (error) {
    console.error("Error fetching user activity:", error);
    return [];
  }
}
