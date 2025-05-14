"use client";

import { useParams } from "next/navigation";
import RepoInfo from "./RepoInfo";
import RepositoryBreadcrumb from "./RepositoryBreadcrumb";
import RepositoryHeader from "./RepositoryHeader";
import RepositoryNavigationSection from "./RepositoryNavigationSection";
import RepositorySkeleton from "./RepositorySkeleton";
import { useRepoStore } from "@/app/_providers/repoStoreProvider";
import React, { useEffect, useState } from "react";

function RepoDetailSection() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const { detailedRepo, setDetailedRepo } = useRepoStore((state) => state);

  useEffect(() => {
    async function fetchRepo() {
      try {
        const resp = await fetch(`/api/github/get-repo/${id}`, {
          next: { revalidate: 1000 },
        });
        const data = await resp.json();
        setDetailedRepo(data.data);
      } catch (error) {
        console.error("Failed to fetch repo:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRepo();
  }, [id, setDetailedRepo]);

  return loading ? (
    <RepositorySkeleton />
  ) : (
    detailedRepo && (
      <div className="max-w-[1400px] mx-auto flex flex-col gap-5">
        <RepositoryBreadcrumb
          projName={detailedRepo.name}
          projOwner={detailedRepo.fullname}
        />
        <RepositoryHeader
          image={detailedRepo.image}
          id={detailedRepo.id}
          desc={detailedRepo.description}
          name={detailedRepo.name}
          link={detailedRepo.githubLink}
        />
        <RepoInfo
          language={detailedRepo.language}
          errors={detailedRepo.totalIssues}
          forks={detailedRepo.forks}
          stars={detailedRepo.stars}
          updatedAt={detailedRepo.updatedAt}
        />
        <RepositoryNavigationSection
          githubLink={detailedRepo.githubLink}
          issues={detailedRepo.issues}
          contributors={detailedRepo.contributors}
          readMe={detailedRepo.readme}
          tags={detailedRepo.topics}
        />
      </div>
    )
  );
}

export default RepoDetailSection;
