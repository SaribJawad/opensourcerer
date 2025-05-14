import { getUpdatedAgoTime } from "@/utils/getUpdatedAgoTime";
import { NextResponse } from "next/server";

export async function GET() {
  const currentDate = new Date();
  const oneWeekAgo = new Date(
    currentDate.getTime() - 1000 * 60 * 60 * 24 * 7 * 4
  );
  const oneWeekAgoFormatted = oneWeekAgo.toISOString().split("T")[0];

  let data;
  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=created:>${oneWeekAgoFormatted}&sort=stars&order=desc&per_page=3`
    );
    data = await response.json();
    if (!response.ok) {
      const error = await response.json();
      return new NextResponse(
        JSON.stringify({
          message:
            error.message ??
            "Something went wrong while fetching trending repos! Try again later",
        }),
        {
          status: error.status,
        }
      );
    }
  } catch (error) {
    console.log("Error while fetching trending repos", error);
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong while fetching trending repos",
      }),
      {
        status: 500,
      }
    );
  }

  const simplifiedTrendingRepos = data.items.map((repo: any) => ({
    description: repo.description,
    forks: repo.forks_count,
    githubLink: repo.html_url,
    id: repo.id,
    image: repo.owner.avatar_url,
    name: repo.name,
    stars: repo.stargazers_count,
    topics: repo.topics,
    totalIssues: repo.open_issues,
    updatedAt: getUpdatedAgoTime(repo.updated_at),
    language: repo.language,
  }));

  return new NextResponse(
    JSON.stringify({
      message: "Fetched trending repo succesfully",
      data: simplifiedTrendingRepos,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
