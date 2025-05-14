import { GoPeople } from "react-icons/go";
import RepositoryTag from "@/app/_components/RepositoryTag";
import Image from "next/image";

interface RepositoryOverviewProps {
  readMe: string;
  contributors: string[];
  tags: string[];
}

function RepositoryOverview({ contributors, tags }: RepositoryOverviewProps) {
  return (
    <div className=" ">
      {" "}
      <div className="flex flex-col gap-5">
        {/* top contributors */}
        <div className="border rounded-custom border-border bg-secondary/30 p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <GoPeople size={20} />
            <h2>Top Contributors</h2>
          </div>
          <div className="flex items-center gap-3">
            {contributors.map((contributor, index) => (
              <Image
                key={index + 1}
                src={contributor}
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
            <div className="flex items-center gap-2 flex-wrap">
              {tags.map((tag) => (
                <RepositoryTag key={tag} tag={tag} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RepositoryOverview;
