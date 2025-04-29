import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import RepositoryCard from "./RepositoryCard";

function TrendingSection() {
  const trendingRepos = [
    {
      image: "/logo.svg",
      repoName: "vercel/next.js",
      desc: "The React Framework for the Web",
      tags: ["Typescript", "React", "Rust"],
      stars: 108945,
      forks: 23000,
      issues: 12300,
      updated: 2,
    },
    {
      image: "/logo.svg",
      repoName: "facebook/react",
      desc: "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
      tags: ["library", "javascript", "ui"],
      stars: 207528,
      forks: 49123,
      issues: 1002,
      updated: 1,
    },
    {
      image: "/logo.svg",
      repoName: "tensorflow/tensorflow",
      desc: "An open source machine learning framework for everyone",
      tags: ["machine-learning", "ai", "data-science"],
      stars: 108945,
      forks: 23000,
      issues: 12300,
      updated: 3,
    },
  ];

  return (
    <section className="w-full p-5">
      <div className="max-w-[1400px] mx-auto py-20 flex flex-col gap-10">
        <div className="flex items-center justify-between">
          <h1 className="md:text-3xl text-2xl font-semibold">
            Trending <span className="text-accent">Projects</span>
          </h1>
          <Link
            href="/"
            className="text-accent flex items-center gap-1 hover:underline hover:text-accent/90 color-hover md:text-base text-sm"
          >
            View all
            <GoArrowUpRight />
          </Link>
        </div>
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
          {trendingRepos.map((repo, index) => (
            <RepositoryCard key={index} {...repo} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrendingSection;
