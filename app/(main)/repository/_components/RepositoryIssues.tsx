import RepositoryTag from "@/app/_components/RepositoryTag";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";

interface RepositoryIssuesProps {
  githubLink: string;
  issues: {
    issuesUrl: string;
    title: string;
    labels: { name: string; color: string }[];
  }[];
}

function RepositoryIssues({ issues, githubLink }: RepositoryIssuesProps) {
  return (
    <section className=" border border-border lg:col-span-2  bg-secondary/30 rounded-custom">
      {/* header */}

      {issues.length < 1 ? (
        <div className="flex items-center flex-col justify-center h-full gap-3  p-4 text-center">
          <h1 className="text-xl">No Issues Found</h1>
          <p className="text-muted-foreground text-sm">
            There are currently no issues in this repository. Check back later.
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-1 p-4 border-b border-border">
            <h1 className="text-lg font-semibold">Open Issues</h1>
            <p className="text-muted-foreground text-sm">
              Find issues that need help, including good first issues for new
              contributors.
            </p>
          </div>

          {issues.map((issue, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 p-4 border-b border-border hover:bg-secondary/50"
            >
              <Link
                href={issue.issuesUrl}
                target="_blank"
                className="hover:text-accent hover:underline text-wrap w-full"
              >
                {issue.title}
              </Link>

              <div className="flex items-center gap-2 flex-wrap">
                {issue.labels.map((label) => (
                  <RepositoryTag key={label.name} tag={label.name} />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">2 days ago</p>
            </div>
          ))}

          {/* footer */}
          <div className="p-4 ">
            <Link href={`${githubLink}/issues`} target="_blank">
              <Button variant="outline" size="sm">
                View All Issues
              </Button>
            </Link>
          </div>
        </>
      )}
    </section>
  );
}

export default RepositoryIssues;
