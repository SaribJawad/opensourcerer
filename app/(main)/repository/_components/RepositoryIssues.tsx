import RepositoryTag from "@/app/_components/RepositoryTag";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";

interface RepositoryIssuesProps {
  issues: {
    id: string;
    title: string;
    labels: string[];
    commentsCount: number;
    createdAt: string;
  }[];
}

function RepositoryIssues({ issues }: RepositoryIssuesProps) {
  return (
    <section className=" border border-border  bg-secondary/30 rounded-custom">
      {/* header */}
      <div className="flex flex-col gap-1 p-4 border-b border-border">
        <h1 className="text-lg font-semibold">Open Issues</h1>
        <p className="text-muted-foreground text-sm">
          Find issues that need help, including good first issues for new
          contributors.
        </p>
      </div>

      {issues.map((issue) => (
        <div
          key={issue.id}
          className="flex flex-col gap-2 p-4 border-b border-border hover:bg-secondary/50"
        >
          <Link href="/" className="hover:text-accent hover:underline">
            {issue.title}
          </Link>

          <div className="flex items-center gap-2">
            {issue.labels.map((label) => (
              <RepositoryTag key={label} tag={label} />
            ))}
          </div>
          <p className="text-xs text-muted-foreground">{issue.createdAt}</p>
        </div>
      ))}

      {/* footer */}
      <div className="p-4 ">
        <Button variant="outline" size="sm">
          View All Issues
        </Button>
      </div>
    </section>
  );
}

export default RepositoryIssues;
