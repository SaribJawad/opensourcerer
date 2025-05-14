import { getUpdatedAgoTime } from "@/utils/getUpdatedAgoTime";
import { NextRequest, NextResponse } from "next/server";

export interface GitHubContributor {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  contributions: number;
  user_view_type?: string; // not standard from GitHub, added as optional
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ repoId: string }> }
) {
  const { repoId } = await params;

  // REPO DETAILS
  let repoDetails;

  try {
    const repoDetailsResponse = await fetch(
      `https://api.github.com/repositories/${repoId}`,
      {
        headers: {
          Authorization: `token ${process.env.PUBLIC_GITHUB_CLIENT}`,
        },
      }
    );

    if (!repoDetailsResponse.ok) {
      return new NextResponse(JSON.stringify({ message: "Repo not found" }), {
        status: 404,
      });
    }
    repoDetails = await repoDetailsResponse.json();
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong while fetching repo",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  //   REPO CONTRIBUTORS
  const repoContributors = await fetch(
    `https://api.github.com/repos/${repoDetails.owner.login}/${repoDetails.name}/contributors?per_page=5`,
    {
      headers: {
        Authorization: `token ${process.env.PUBLIC_GITHUB_CLIENT}`,
      },
    }
  );

  const repoContributorsData = await repoContributors
    .json()
    .then((contributors) =>
      contributors.map((cont: GitHubContributor) => cont.avatar_url)
    );

  //  REPO README
  let readme;

  try {
    const readMeResponse = await fetch(
      `https://raw.githubusercontent.com/${repoDetails.owner.login}/${repoDetails.name}/master/README.md`,
      {
        headers: {
          Authorization: `token ${process.env.PUBLIC_GITHUB_CLIENT}`,
        },
      }
    );

    if (readMeResponse.ok) {
      readme = await readMeResponse.text();
    } else {
      readme = "README not found.";
    }
  } catch (error) {
    console.log(error);
    readme = "README not found.";
  }

  // REPO ISSUES
  const repoIssuesResponse = await fetch(
    `https://api.github.com/search/issues?q=repo:${repoDetails.owner.login}/${repoDetails.name}+is:issue+state:open&per_page=3`,
    {
      headers: {
        Authorization: `token ${process.env.PUBLIC_GITHUB_CLIENT}`,
      },
    }
  );
  const issuesJson = await repoIssuesResponse.json();
  const repoIssues = issuesJson.items.map((issue: any) => ({
    issuesUrl: issue.html_url,
    title: issue.title,

    labels: issue.labels.map((label: any) => ({
      name: label.name,
      color: label.color,
    })),
  }));

  const repo = {
    id: repoDetails.id,
    name: repoDetails.name,
    fullname: repoDetails.owner.login,
    description: repoDetails.description,
    image: repoDetails.owner.avatar_url,
    githubLink: repoDetails.html_url,
    updatedAt: getUpdatedAgoTime(repoDetails.updated_at),
    stars: repoDetails.stargazers_count.toLocaleString(),
    language: repoDetails.language,
    forks: repoDetails.forks_count.toLocaleString(),
    topics: repoDetails.topics,
    totalIssues: repoDetails.open_issues_count.toLocaleString(),
    contributors: repoContributorsData,
    readme: readme,
    issues: repoIssues,
  };

  return new NextResponse(
    JSON.stringify({
      message: "Fetched Repo Info Successfully",
      data: repo,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
