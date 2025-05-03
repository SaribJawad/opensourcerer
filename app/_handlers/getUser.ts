"use server";

import { authOptions } from "@/lib/auth";
import { User } from "@/models/user.model";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth/next";

export async function getUser() {
  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session) {
    return { user: null, message: "Unauthorized", success: false };
  }

  const userEmail = session.user.email;

  let user;
  try {
    const userFromDb = (user = await User.findOne({ email: userEmail }));

    if (!userFromDb) {
      return {
        user: null,
        message: "User not found",
        success: false,
      };
    }

    user = {
      name: userFromDb.name,
      email: userFromDb.email,
      profileImage: userFromDb.profileImage,
      bookmarkedRepos: userFromDb.bookmarkedRepos,
      provider: userFromDb.provider,
      bio: userFromDb.bio,
    };
  } catch (error) {
    console.log("Error while fetching user from DB:", error);

    throw new Error("Something went wrong while fetching User.");
  }

  return {
    user: user,
    message: "User fetched successfully",
    success: true,
  };
}
