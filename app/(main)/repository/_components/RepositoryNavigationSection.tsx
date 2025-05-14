"use client";

import RepositoryOverview from "./RepositoryOverview";
import RepositoryIssues from "./RepositoryIssues";

interface RepostoryNavigationSectionProps {
  githubLink: string;
  readMe: string;
  contributors: string[];
  tags: string[];
  issues: {
    issuesUrl: string;
    title: string;
    labels: { name: string; color: string }[];
  }[];
}

function RepositoryNavigationSection({
  contributors,
  readMe,
  issues,
  tags,
  githubLink,
}: RepostoryNavigationSectionProps) {
  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold">Overview</h1>

      <div className="grid  lg:grid-cols-3 grid-cols-1 gap-5">
        <RepositoryOverview
          contributors={contributors}
          readMe={readMe}
          tags={tags}
        />
        <RepositoryIssues issues={issues} githubLink={githubLink} />
      </div>
    </section>
  );
}

export default RepositoryNavigationSection;
