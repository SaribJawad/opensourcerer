"use client";

import { Button } from "@/app/_components/ui/button";
import { useUserStore } from "@/app/_providers/userStoreProvider";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { CiBookmark } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { IoBookmark } from "react-icons/io5";

interface RepositoryHeaderProps {
  id: number;
  image: string;
  name: string;
  desc: string;
  link: string;
}

function RepositoryHeader({
  desc,
  name,
  link,
  image,
  id,
}: RepositoryHeaderProps) {
  const [isBookmarkLoading, setIsBookmarkLoading] = useState<boolean>(false);
  const { user, updateUserBookmarksId } = useUserStore((state) => state);
  const queryClient = useQueryClient();

  const isBookmarked =
    user?.bookmarkedReposId && user?.bookmarkedReposId.includes(id.toString());

  const handleBookmark = async () => {
    if (!user) {
      toast.error("Login to bookmark repos!");
      return;
    }

    try {
      setIsBookmarkLoading(true);
      const response = await fetch(`/api/user/bookmark-repo/${id}`, {
        method: "POST",
      });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
      }

      toast.success(data.message);
      updateUserBookmarksId(id.toString());
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
    <div className="flex lg:flex-row flex-col items-start justify-between gap-3">
      <div className="flex items-start gap-4">
        <Image
          src={image}
          alt="repo-image"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">{name}</h1>
          <p className="text-muted-foreground">{desc}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Link href={link} target="_blank">
          <Button variant="outline">
            <FaGithub />
            View on Github
          </Button>
        </Link>
        <Button
          disabled={isBookmarkLoading}
          onClick={handleBookmark}
          variant="outline"
          className={`${
            isBookmarked ? "bg-accent text-accent-foreground" : ""
          }`}
        >
          {isBookmarked ? <IoBookmark /> : <CiBookmark />}
          {isBookmarked ? "Bookmarked" : "Bookmark"}
        </Button>
      </div>
    </div>
  );
}

export default RepositoryHeader;
