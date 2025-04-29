import React from "react";
import ProfileSection from "./_components/ProfileSection";
import RepositoryCard from "@/app/_components/RepositoryCard";

function page() {
  const savedProjects = [
    {
      id: "1",
      repoName: "next.js",
      desc: "The React Framework for the Web",
      owner: "vercel",
      stars: 108934,
      forks: 24023,
      image: "/logo,svg",
      language: "TypeScript",
      issues: 1987,
      updated: 2,
      tags: ["framework", "react", "javascript", "good-first-issue"],
      isBookmarked: true,
    },
    {
      id: "3",
      repoName: "tensorflow",
      desc: "An open source machine learning framework for everyone",
      owner: "tensorflow",
      stars: 178245,
      image: "/logo,svg",
      forks: 88256,
      language: "Python",
      issues: 1845,
      updated: 3,
      tags: ["machine-learning", "ai", "data-science", "help-wanted"],
      isBookmarked: true,
    },
  ];

  return (
    <main className="pt-20  w-full p-5 h-full bg-background  ">
      <div className="max-w-[1400px] mx-auto flex  gap-10 h-full lg:flex-row flex-col-reverse">
        <div className="flex-3 flex flex-col text-xl font-semibold gap-6  ">
          Projects
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 max-h-dvh overflow-auto  ">
            {savedProjects.map((proj) => (
              <RepositoryCard key={proj.id} {...proj} />
            ))}
            {savedProjects.map((proj) => (
              <RepositoryCard key={proj.id} {...proj} />
            ))}
            {savedProjects.map((proj) => (
              <RepositoryCard key={proj.id} {...proj} />
            ))}
            {savedProjects.map((proj) => (
              <RepositoryCard key={proj.id} {...proj} />
            ))}
            {savedProjects.map((proj) => (
              <RepositoryCard key={proj.id} {...proj} />
            ))}
            {savedProjects.map((proj) => (
              <RepositoryCard key={proj.id} {...proj} />
            ))}
            {savedProjects.map((proj) => (
              <RepositoryCard key={proj.id} {...proj} />
            ))}
          </div>
        </div>
        <ProfileSection />
      </div>
    </main>
  );
}

export default page;
