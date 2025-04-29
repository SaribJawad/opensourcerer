"use client";

import { useState } from "react";
import RepositoryOverview from "./RepositoryOverview";
import RepositoryIssues from "./RepositoryIssues";

const tabs = [
  {
    label: "Overview",
    id: "overview",
  },
  {
    label: "Issues",
    id: "issues",
  },
] as const;

type Tabs = (typeof tabs)[number]["id"];

interface RepostoryNavigationSectionProps {
  readMe: string;
  contributors: { username: string; avatarUrl: string }[];
  tags: string[];
  issues: {
    id: string;
    title: string;
    labels: string[];
    commentsCount: number;
    createdAt: string;
  }[];
}

function RepositoryNavigationSection({
  contributors,
  readMe,
  issues,
  tags,
}: RepostoryNavigationSectionProps) {
  const [activeTab, setActiveTab] = useState<Tabs>("overview");

  return (
    <section className="flex flex-col gap-6">
      <div className="bg-secondary  rounded-custom text-sm p-1.5 flex items-center w-fit">
        {tabs.map((tab) => (
          <button
            onClick={() => setActiveTab(tab.id)}
            className={`p-2  rounded-lg cursor-pointer transition-colors duration-200 ${
              activeTab === tab.id ? "bg-background shadow-md" : ""
            }`}
            key={tab.id}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {activeTab === "overview" && (
        <RepositoryOverview
          contributors={contributors}
          readMe={readMe}
          tags={tags}
        />
      )}
      {activeTab === "issues" && <RepositoryIssues issues={issues} />}
    </section>
  );
}

export default RepositoryNavigationSection;
