"use server";

import { authOptions } from "@/lib/auth";
import { BookmarkRepo } from "@/models/bookmarkRepo.model";
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

  try {
    const userFromDb = await User.findOne({ email: userEmail });

    if (!userFromDb) {
      return {
        user: null,
        message: "User not found",
        success: false,
      };
    }

    const userBookmarks = await BookmarkRepo.find({
      _id: { $in: userFromDb.bookmarkedRepos },
    });

    const serializedUser = {
      name: userFromDb.name,
      email: userFromDb.email,
      profileImage: userFromDb.profileImage,
      provider: userFromDb.provider,
      bookmarkedReposId: userBookmarks.map((repo) => repo.repoId),
      bio: userFromDb.bio,
    };

    return {
      user: serializedUser,
      message: "User fetched successfully",
      success: true,
    };
  } catch (error) {
    console.log("Error while fetching user from DB:", error);

    throw new Error("Something went wrong while fetching User.");
  }
}
