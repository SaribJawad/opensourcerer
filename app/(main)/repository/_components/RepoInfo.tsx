import RepositoryTag from "@/app/_components/RepositoryTag";
import {
  MdAccessTime,
  MdErrorOutline,
  MdOutlineStarBorder,
} from "react-icons/md";
import { PiGitForkLight } from "react-icons/pi";

interface RepoInfoProps {
  stars: string;
  forks: string;
  errors: string;
  language: string | null;
  updatedAt: string;
}

function RepoInfo({
  errors,
  forks,
  stars,
  updatedAt,
  language,
}: RepoInfoProps) {
  return (
    <div className="flex items-center flex-wrap gap-8 md:text-sm text-xs font-light">
      {language && <RepositoryTag tag={language} />}
      {/*stars */}
      <span className="flex items-center gap-1">
        <MdOutlineStarBorder />
        {stars}
      </span>
      {/* forks */}
      <span className="flex items-center gap-1">
        <PiGitForkLight />
        {forks}
      </span>
      {/* issues */}
      <span className="flex items-center gap-1">
        <MdErrorOutline />
        {errors}
      </span>

      {/* updated at */}
      <span className="flex items-center gap-1">
        <MdAccessTime />
        {updatedAt}
      </span>
    </div>
  );
}

export default RepoInfo;
