import { parseUrlHeaders } from "@/lib/parseUrlHeaders";
import { getUpdatedAgoTime } from "@/utils/getUpdatedAgoTime";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { url } = body;

  try {
    const nextPageResp = await fetch(url);

    const linkHeader = nextPageResp.headers.get("link");

    let parseUrlLinks;
    if (linkHeader) {
      parseUrlLinks = parseUrlHeaders(linkHeader);
    }

    const nextPageData = await nextPageResp.json();

    const simplifiedResult = nextPageData.items.map((rep: any) => ({
      description: rep.description,
      forks: rep.forks_count,
      githubLink: rep.html_url,
      id: rep.id,
      image: rep.owner.avatar_url,
      name: rep.name,
      stars: rep.stargazers_count,
      topics: rep.topics,
      totalIssues: rep.open_issues,
      updatedAt: getUpdatedAgoTime(rep.updated_at),
      language: rep.language,
    }));

    return new NextResponse(
      JSON.stringify({
        message: "Fetched next page result",
        data: simplifiedResult,
        url: parseUrlLinks ? parseUrlLinks.next : null,
      })
    );
  } catch (error) {
    console.log("Error while fetching next page", error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong! Try again" }),
      {
        status: 500,
      }
    );
  }
}
