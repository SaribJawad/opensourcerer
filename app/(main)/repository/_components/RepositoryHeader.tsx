import { Button } from "@/app/_components/ui/button";
import { CiBookmark } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";

interface RepositoryHeaderProps {
  name: string;
  desc: string;
}

function RepositoryHeader({ desc, name }: RepositoryHeaderProps) {
  return (
    <div className="flex lg:flex-row flex-col items-start justify-between gap-3">
      <div>
        <h1 className="text-3xl font-semibold">{name}</h1>
        <p className="text-muted-foreground">{desc}</p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline">
          <FaGithub />
          View on Github
        </Button>
        <Button variant="outline">
          <CiBookmark />
          Bookmark
        </Button>
      </div>
    </div>
  );
}

export default RepositoryHeader;
