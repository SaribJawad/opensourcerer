import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import { IoBookmark } from "react-icons/io5";
import { MdErrorOutline, MdOutlineStarBorder } from "react-icons/md";
import { PiGitForkLight } from "react-icons/pi";
import RepositoryTag from "@/app/_components/RepositoryTag";
import { IBookmarkedRepo } from "./BookmarkedReposSection";
import toast from "react-hot-toast";
import { useUserStore } from "@/app/_providers/userStoreProvider";

function SavedRepoCard(repo: IBookmarkedRepo) {
  const limitedTopics = repo.topics && repo.topics.slice(0, 5);
  const { updateUserBookmarksId, updateBookmarkedRepos } = useUserStore(
    (state) => state
  );

  const handleBookmark = async () => {
    try {
      updateBookmarkedRepos(repo.repoId);
      const response = await fetch(`api/user/bookmark-repo/${repo.repoId}`, {
        method: "POST",
      });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
      }

      toast.success(data.message);
      updateUserBookmarksId(repo.repoId);
    } catch (error) {
      let errorMessage = "Something went wrong! Try again";

      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    }
  };

  return (
    <div className="h-56 border border-border bg-secondary/30 rounded-custom p-5 flex flex-col justify-between gap-4 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <Image
            src={repo.image}
            alt="repo-img"
            width={35}
            height={35}
            className="rounded-full"
          />
          <div className=" flex-1 ">
            <Link
              href={`/repository/${repo.repoId}`}
              className="hover:text-accent"
            >
              <h2 className="text-lg font-semibold">{repo.name}</h2>
            </Link>
            <p className="text-xs h-15 text-muted-foreground  line-clamp-4">
              {repo.description}
            </p>
          </div>
          <Button
            onClick={handleBookmark}
            className="rounded-full bg-accent"
            variant="ghost"
            size="icon"
          >
            {/* <IoBookmarkOutline /> */}
            <IoBookmark />
          </Button>
        </div>
        {/* repository tags */}
        {limitedTopics && (
          <div className="flex flex-wrap items-center gap-2">
            {limitedTopics.map((tag, index) => (
              <RepositoryTag key={index} tag={tag} />
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1">
            <MdOutlineStarBorder />
            {Number(repo.stars).toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <PiGitForkLight />
            {Number(repo.forks).toLocaleString()}
          </span>

          <span className="flex items-center gap-1">
            <MdErrorOutline />
            {Number(repo.issues).toLocaleString()} issues
          </span>
        </div>
      </div>
    </div>
  );
}

export default SavedRepoCard;
