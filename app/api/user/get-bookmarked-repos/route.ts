import { authOptions } from "@/lib/auth";
import { BookmarkRepo } from "@/models/bookmarkRepo.model";
import { User } from "@/models/user.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(
      JSON.stringify({
        message: "Unauthorized",
      }),
      {
        status: 401,
      }
    );
  }

  const email = session?.user?.email;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse(
        JSON.stringify({
          message: "User not found",
        }),
        {
          status: 404,
        }
      );
    }

    const userBookmarks = await BookmarkRepo.find({
      _id: { $in: user.bookmarkedRepos },
    });

    const bookmarkedRepos = userBookmarks;

    return new NextResponse(
      JSON.stringify({
        message: "Successfully fetched bookmarks",
        bookmarkedRepos,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user data:", error);
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong while fetching user bookmarks",
      }),
      {
        status: 500,
      }
    );
  }
}
