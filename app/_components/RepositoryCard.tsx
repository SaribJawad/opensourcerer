import Image from "next/image";
import { Button } from "./ui/button";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import RepositoryTag from "./RepositoryTag";
import { MdErrorOutline, MdOutlineStarBorder, MdUpdate } from "react-icons/md";
import { PiGitForkLight } from "react-icons/pi";
import Link from "next/link";
import toast from "react-hot-toast";

import { useUserStore } from "../_providers/userStoreProvider";
import { useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { useQueryClient } from "@tanstack/react-query";

interface IRepositoryCardProps {
  description: string;
  forks: string;
  githubLink: string;
  id: number;
  image: string;
  name: string;
  stars: string;
  topics: string[];
  totalIssues: string;
  updatedAt: string;
  language: string | null;
}

function RepositoryCard(props: IRepositoryCardProps) {
  const [isBookmarkLoading, setIsBookmarkLoading] = useState<boolean>(false);
  const { user, updateUserBookmarksId } = useUserStore((state) => state);
  const limitedTopics = props.topics ? props.topics.slice(0, 5) : null;
  const queryClient = useQueryClient();

  const isBookmarked =
    user?.bookmarkedReposId &&
    user?.bookmarkedReposId?.includes(props.id.toString());

  const handleBookmark = async () => {
    if (!user) {
      toast.error("Login to bookmark repos!");
      return;
    }

    console.log(props.id);

    try {
      setIsBookmarkLoading(true);
      const response = await fetch(`api/user/bookmark-repo/${props.id}`, {
        method: "POST",
      });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
      }

      toast.success(data.message);
      updateUserBookmarksId(props.id.toString());
      queryClient.invalidateQueries({ queryKey: ["bookmarkedRepos"] });
    } catch (error) {
      let errorMessage = "Something went wrong! Try again";

      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    } finally {
      setIsBookmarkLoading(false);
    }
  };

  return (
    <div className="h-56 border border-border bg-secondary/30 rounded-custom p-5 flex flex-col justify-between gap-4 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <Image
            src={props.image}
            alt="repo-img"
            width={35}
            height={35}
            className="rounded-full"
          />
          <div className=" flex-1 ">
            <Link
              href={`/repository/${props.id}`}
              className="hover:text-accent"
            >
              <h2 className="text-lg font-semibold">{props.name}</h2>
            </Link>
            <p className="text-xs h-15 text-muted-foreground  line-clamp-4">
              {props.description}
            </p>
          </div>
          <Button
            disabled={isBookmarkLoading}
            onClick={handleBookmark}
            className={`rounded-full ${
              isBookmarkLoading || isBookmarked ? "bg-accent" : ""
            }`}
            variant="ghost"
            size="icon"
          >
            {isBookmarkLoading ? (
              <LoadingSpinner className="text-white" />
            ) : isBookmarked ? (
              <IoBookmark />
            ) : (
              <IoBookmarkOutline />
            )}
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
            {props.stars}
          </span>
          <span className="flex items-center gap-1">
            <PiGitForkLight />
            {props.forks}
          </span>

          <span className="flex items-center gap-1">
            <MdErrorOutline />
            {props.totalIssues} issues
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <MdUpdate size={15} />

          <p>{props.updatedAt}</p>
        </div>
      </div>
    </div>
  );
}

export default RepositoryCard;
