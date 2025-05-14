import { getUpdatedAgoTime } from "@/utils/getUpdatedAgoTime";
import { NextResponse } from "next/server";

export async function GET() {
  const languages = [
    "typescript",
    "rust",
    "python",
    "java",
    "go",
    "ruby",
    "php",
  ];
  const randomLang = languages[Math.floor(Math.random() * languages.length)];

  const githubResponse = await fetch(
    // has_issues:true
    `https://api.github.com/search/repositories?q=language:${randomLang}+stars:>0&sort=stars&order=des&page=1&per_page=8`,

    {
      headers: {
        Authorization: `token ${process.env.PUBLIC_GITHUB_CLIENT}`,
      },
    }
  );

  const respData = await githubResponse.json();

  const simplifiedRepos = respData.items.map((repo: any) => ({
    id: repo.id,
    name: repo.name,
    image: repo.owner.avatar_url,
    githubLink: repo.html_url,
    description: repo.description,
    updatedAt: getUpdatedAgoTime(repo.updated_at),
    stars: repo.stargazers_count.toLocaleString(),
    language: repo.language,
    forks: repo.forks_count.toLocaleString(),
    totalIssues: repo.open_issues_count.toLocaleString(),
    topics: repo.topics,
  }));

  return new NextResponse(
    JSON.stringify({
      message: "Fetched repos successfully",
      repos: simplifiedRepos,
    }),
    {
      status: 200,
      headers: {
        "Application-Type": "application/json",
      },
    }
  );
}
