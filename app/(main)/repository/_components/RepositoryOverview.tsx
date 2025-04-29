import { PiNotepad } from "react-icons/pi";
import { Fira_Code } from "next/font/google";
import { GoPeople } from "react-icons/go";
import RepositoryTag from "@/app/_components/RepositoryTag";
import Image from "next/image";

const fireCode = Fira_Code({
  variable: "--font-fire-code",
  subsets: ["latin"],
});

interface RepositoryOverviewProps {
  readMe: string;
  contributors: { username: string; avatarUrl: string }[];
  tags: string[];
}

function RepositoryOverview({
  readMe,
  contributors,
  tags,
}: RepositoryOverviewProps) {
  return (
    <div className="grid lg:grid-cols-3 grid-col-1 gap-5">
      {" "}
      <div className="flex flex-col gap-5">
        {/* top contributors */}
        <div className="border rounded-custom border-border bg-secondary/30 p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <GoPeople size={20} />
            <h2>Top Contributors</h2>
          </div>
          <div className="flex items-center gap-3">
            {contributors.map((contributor) => (
              <Image
                key={contributor.username}
                src={contributor.avatarUrl}
                alt="contributers"
                width={30}
                height={30}
                className="rounded-full"
              />
            ))}
          </div>
        </div>
        {/* tags */}
        <div className="border rounded-custom border-border bg-secondary/30 p-5">
          <div className="flex flex-col items-start gap-2 text-lg font-semibold">
            <h2>Tag</h2>
            <div className="flex items-center gap-2">
              {tags.map((tag) => (
                <RepositoryTag key={tag} tag={tag} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Readme */}
      <div className="border border-border bg-secondary/30 p-5 rounded-custom flex flex-col gap-3 lg:col-span-2">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <PiNotepad size={20} />
          <h2>README</h2>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none">
          <pre
            className={`whitespace-pre-wrap ${fireCode.className} text-sm p-4 bg-secondary/50 rounded-md`}
          >
            {readMe}
          </pre>
        </div>

        {/* <div
          className={`bg-secondary p-3 rounded-custom flex-1 ${fireCode.className}`}
        >
          {readMe}
        </div> */}
      </div>
    </div>
  );
}

export default RepositoryOverview;
