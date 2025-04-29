import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { RiTwitterXLine } from "react-icons/ri";
import { BsBookmarkCheck } from "react-icons/bs";

import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { LuGithub } from "react-icons/lu";

function ProfileSection() {
  return (
    <section className="border flex-1  border-border bg-secondary/30 p-5 lg:w-full md:w-1/2 w-full rounded-custom max-h-fit flex flex-col gap-3">
      <div className="self-end">
        <Button variant="outline">
          <FaRegEdit />
          Edit
        </Button>
      </div>

      <div className="flex flex-col items-center   gap-5">
        <Avatar className="w-20 h-20">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-3">
          <div>
            <h1 className="text-2xl font-semibold">John Doe</h1>
            <p className="text-muted-foreground text-sm">
              Senior Software Engineer
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href=""
              className="flex items-center text-sm text-muted-foreground gap-1"
            >
              <LuGithub />
              Github
            </Link>
            <Link
              href=""
              className="flex items-center text-sm text-muted-foreground gap-1"
            >
              <RiTwitterXLine />
              Twitter
            </Link>
          </div>

          <div className="text-muted-foreground flex items-center gap-1 text-sm">
            <BsBookmarkCheck />
            <p>2 saved repositories</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileSection;
