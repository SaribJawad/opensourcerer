import { parseUrlHeaders } from "@/lib/parseUrlHeaders";
import { getUpdatedAgoTime } from "@/utils/getUpdatedAgoTime";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const FilterSearchBodySchema = z.object({
  sortBy: z.enum(["stars", "updated", "issues"]).optional(),
  stars: z.number().optional(),
  language: z
    .enum([
      "JavaScript",
      "TypeScript",
      "Python",
      "Java",
      "Go",
      "Rust",
      "C++",
      "Ruby",
      "PHP",
      "C#",
    ])
    .optional(),
  updatedInLast30Days: z.boolean().optional(),
  tags: z
    .array(
      z.enum([
        "good-first-issue",
        "help-wanted",
        "documentation",
        "bug",
        "enhancement",
        "hacktoberfest",
      ])
    )
    .optional(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { inp } = body;

  if (!inp) {
    const parsedBody = FilterSearchBodySchema.safeParse(body);

    if (!parsedBody.success) {
      const errors = parsedBody.error.errors
        .map((err) => err.message)
        .join("| ");
      throw new Error(errors);
    }

    const { language, sortBy, stars, updatedInLast30Days, tags } =
      parsedBody.data;

    const isoDate = updatedInLast30Days
      ? new Date(Date.now() - 1000 * 60 * 60 * 24 * 30)
          .toISOString()
          .split("T")[0]
      : "";

    const queryParts = [
      `stars:>=${stars ?? 0}`,
      `language:${language}`,
      updatedInLast30Days ? `pushed:>=${isoDate}` : null,
    ];

    queryParts.push(tags ? tags.map((tag) => `topic:${tag}`).join("+") : null);
    const finalQuery = queryParts.filter(Boolean).join("+");

    const searchFilterQueryResponse = await fetch(
      `https://api.github.com/search/repositories?q=stars:>=${
        stars ?? 0
      }+language:${finalQuery}&sort=${sortBy}&order=desc&per_page=8`,
      {
        headers: {
          Authorization: process.env.PUBLIC_GITHUB_CLIENT!,
        },
      }
    );
    const linkHeader = searchFilterQueryResponse.headers.get("link");

    let parseUrlLinks;
    if (linkHeader) {
      parseUrlLinks = parseUrlHeaders(linkHeader);
    }

    const searchFilterQueryData = await searchFilterQueryResponse.json();

    const simplifiedResult = searchFilterQueryData.items.map((result: any) => ({
      description: result.description,
      forks: result.forks_count,
      githubLink: result.html_url,
      id: result.id,
      image: result.owner.avatar_url,
      name: result.name,
      stars: result.stargazers_count,
      topics: result.topics,
      totalIssues: result.open_issues,
      updatedAt: getUpdatedAgoTime(result.updated_at),
      language: result.language,
    }));

    return new NextResponse(
      JSON.stringify({
        message: "search filter",
        data: simplifiedResult,
        nextUrl: parseUrlLinks ? parseUrlLinks.next : null,
      }),
      {
        status: 200,
      }
    );
  }

  try {
    const searchRes = await fetch(
      `https://api.github.com/search/repositories?q=${inp}+in:name,description,readme+is:issue+state:open&per_page=8`,
      {
        headers: {
          Authorization: process.env.PUBLIC_GITHUB_CLIENT!,
        },
      }
    );
    const linkHeader = searchRes.headers.get("link");

    // implement pagination
    let parseUrlLinks;
    if (linkHeader) {
      parseUrlLinks = parseUrlHeaders(linkHeader);
    }

    if (!searchRes.ok) {
      const errorData = await searchRes.json();
      return new NextResponse(
        JSON.stringify({ message: errorData.message || "GitHub API error" }),
        { status: searchRes.status }
      );
    }

    const searchResult = await searchRes.json().then((res) => res.items);

    const simplifiedResult = searchResult.map((result: any) => ({
      description: result.description,
      forks: result.forks_count,
      githubLink: result.html_url,
      id: result.id,
      image: result.owner.avatar_url,
      name: result.name,
      stars: result.stargazers_count,
      topics: result.topics,
      totalIssues: result.open_issues,
      updatedAt: getUpdatedAgoTime(result.updated_at),
      language: result.language,
    }));

    return new NextResponse(
      JSON.stringify({
        message: "Successfully fetched repos",
        data: simplifiedResult,
        nextUrl: parseUrlLinks ? parseUrlLinks.next : null,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log("Error while quering repo", error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong getting query repos" }),
      { status: 500 }
    );
  }
}
