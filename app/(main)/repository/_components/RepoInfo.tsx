import RepositoryTag from "@/app/_components/RepositoryTag";
import { FaRegFileAlt } from "react-icons/fa";
import {
  MdAccessTime,
  MdErrorOutline,
  MdOutlineStarBorder,
} from "react-icons/md";
import { PiGitForkLight } from "react-icons/pi";

function RepoInfo() {
  return (
    <div className="flex items-center flex-wrap gap-8 md:text-sm text-xs font-light">
      <RepositoryTag tag="Typescript" />
      {/*stars */}
      <span className="flex items-center gap-1">
        <MdOutlineStarBorder />
        {/* {props.stars.toLocaleString()} */}
        12,212
      </span>
      {/* forks */}
      <span className="flex items-center gap-1">
        <PiGitForkLight />
        {/* {props.forks.toLocaleString()} */}
        12,353
      </span>
      {/* issues */}
      <span className="flex items-center gap-1">
        <MdErrorOutline />
        {/* {props.forks.toLocaleString()} */}
        12,353
      </span>
      {/* MIT */}
      <span className="flex items-center gap-1">
        <FaRegFileAlt />
        {/* {props.forks.toLocaleString()} */}
        MIT license
      </span>
      {/* updated at */}
      <span className="flex items-center gap-1">
        <MdAccessTime />
        {/* {props.forks.toLocaleString()} */}
        Updated 2 days ago
      </span>
    </div>
  );
}

export default RepoInfo;
