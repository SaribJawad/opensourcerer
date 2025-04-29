import Image from "next/image";
import { Button } from "./ui/button";
import { IoBookmarkOutline } from "react-icons/io5";
import RepositoryTag from "./RepositoryTag";
import { MdOutlineStarBorder } from "react-icons/md";
import { PiGitForkLight } from "react-icons/pi";
import Link from "next/link";

interface IRepositoryCardProps {
  id: string;
  image: string;
  repoName: string;
  desc: string;
  tags: string[];
  stars: number;
  forks: number;
  issues: number;
  updated: number;
}

function RepositoryCard(props: IRepositoryCardProps) {
  return (
    <div className="border border-border bg-background/50 rounded-custom p-5 flex flex-col justify-between gap-4 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Image src={"/logo.svg"} alt="repo-img" width={25} height={25} />
          <div className="flex-1">
            <Link href={`/repository/${props.id}`}>
              <h2 className="text-lg font-semibold">{props.repoName}</h2>
            </Link>
            <p className="text-sm text-muted-foreground">{props.desc}</p>
          </div>
          <Button className="rounded-full" variant="ghost" size="icon">
            <IoBookmarkOutline />
          </Button>
        </div>
        {/* repository tags */}
        <div className="flex flex-wrap items-center gap-2">
          {props.tags.map((tag, index) => (
            <RepositoryTag key={index} tag={tag} />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1">
            <MdOutlineStarBorder />
            {props.stars.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <PiGitForkLight />
            {props.forks.toLocaleString()}
          </span>

          <span>{props.forks.toLocaleString()} issues</span>
        </div>
        <p>Updated {props.updated} days ago</p>
      </div>
    </div>
  );
}

export default RepositoryCard;
