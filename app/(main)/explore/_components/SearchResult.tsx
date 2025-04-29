import RepositoryCard from "@/app/_components/RepositoryCard";
import { Button } from "@/app/_components/ui/button";
import { CiFilter } from "react-icons/ci";

interface SearchResultProps {
  setIsSideBarOpen: (arg: boolean) => void;
  isSideBarOpen: boolean;
}

function SearchResult({ setIsSideBarOpen, isSideBarOpen }: SearchResultProps) {
  const mockProjects = [
    {
      id: "1",
      repoName: "next.js",
      desc: "The React Framework for the Web",
      image: "/logo.svg",
      owner: "vercel",
      stars: 108934,
      forks: 24023,
      language: "TypeScript",
      issues: 1987,
      updated: 2,
      tags: ["framework", "react", "javascript", "good-first-issue"],
    },
    {
      id: "2",
      repoName: "react",
      desc: "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
      owner: "facebook",
      stars: 207528,
      forks: 42915,
      language: "JavaScript",
      image: "/logo.svg",
      issues: 1056,
      updated: 1,
      tags: ["library", "javascript", "ui"],
    },
    {
      id: "3",
      repoName: "tensorflow",
      desc: "An open source machine learning framework for everyone",
      owner: "tensorflow",
      stars: 178245,
      forks: 88256,
      language: "Python",
      issues: 1845,
      updated: 3,
      image: "/logo.svg",
      tags: ["machine-learning", "ai", "data-science", "help-wanted"],
    },
    {
      id: "4",
      repoName: "vscode",
      desc: "Visual Studio Code",
      owner: "microsoft",
      stars: 147589,
      forks: 25687,
      language: "TypeScript",
      issues: 7823,
      updated: 4,
      tags: ["editor", "tool", "developer-tools", "good-first-issue"],
      image: "/logo.svg",
    },
    {
      id: "5",
      repoName: "rust",
      desc: "Empowering everyone to build reliable and efficient software.",
      owner: "rust-lang",
      stars: 83456,
      forks: 11234,
      language: "Rust",
      issues: 5678,
      updated: 5,
      image: "/logo.svg",
      tags: ["language", "systems", "performance"],
    },
    {
      id: "6",
      repoName: "vue",
      desc: "Progressive JavaScript framework for building user interfaces.",
      owner: "vuejs",
      stars: 203467,
      forks: 33458,
      language: "JavaScript",
      issues: 567,
      image: "/logo.svg",
      updated: 2,
      tags: ["framework", "javascript", "ui"],
    },
  ];

  return (
    <section className="flex-1 flex flex-col gap-14">
      <Button
        onClick={() => setIsSideBarOpen(!isSideBarOpen)}
        variant="outline"
        size="lg"
        className="self-start  xl:hidden"
      >
        <CiFilter />
        Filters
      </Button>
      <div className="grid md:grid-cols-2 grid-col-1 gap-6 max-h-dvh overflow-auto pb-2">
        {mockProjects.map((proj) => (
          <RepositoryCard key={proj.id} {...proj} />
        ))}
      </div>
    </section>
  );
}

export default SearchResult;
