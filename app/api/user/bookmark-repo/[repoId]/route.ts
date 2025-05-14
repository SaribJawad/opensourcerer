import { authOptions } from "@/lib/auth";
import { BookmarkRepo } from "@/models/bookmarkRepo.model";
import { User } from "@/models/user.model";
import connectDB from "@/utils/connectDB";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  _: NextRequest,
  {
    params,
  }: {
    params: Promise<{ repoId: string }>;
  }
) {
  connectDB();
  const { repoId } = await params;

  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(
      JSON.stringify({
        message: "Login to bookmark a repo",
      }),
      {
        status: 401,
      }
    );
  }

  const existingBookmarkRepo = await BookmarkRepo.findOne({
    repoId,
  });

  if (existingBookmarkRepo) {
    await BookmarkRepo.deleteOne({ repoId });

    return new NextResponse(
      JSON.stringify({
        message: "Bookmark removed",
      }),
      {
        status: 200,
      }
    );
  }

  const sessionUser = session?.user;

  const user = await User.findOne({ email: sessionUser.email });

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

  try {
    const repoResponse = await fetch(
      `https://api.github.com/repositories/${repoId}`,
      {
        headers: {
          Authorization: `token ${process.env.PUBLIC_GITHUB_CLIENT}`,
        },
      }
    );
    const data = await repoResponse.json();

    const simplifiedRepo = {
      image: data.owner.avatar_url,
      repoId: data.id,
      githubLink: data.html_url,
      name: data.name,
      description: data.description,
      topics: data.topics,
      stars: data.stargazers_count,
      forks: data.forks_count,
      issues: data.open_issues_count,
    };

    const bookmarkRepo = await BookmarkRepo.create(simplifiedRepo);

    user.bookmarkedRepos?.push(bookmarkRepo._id as Types.ObjectId);
    await user.save({ validateBeforeSave: false });
  } catch (error) {
    console.log("something went wrong while bookmarking repo", error);
    return new NextResponse(
      JSON.stringify({
        message: "Failed to bookmark! Try again",
      }),
      {
        status: 500,
      }
    );
  }

  return new NextResponse(
    JSON.stringify({
      message: "Bookmarked",
    }),
    {
      status: 201,
    }
  );
}
