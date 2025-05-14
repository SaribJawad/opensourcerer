"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { BsBookmarkCheck } from "react-icons/bs";
import { useUserStore } from "@/app/_providers/userStoreProvider";

function ProfileSection() {
  const user = useUserStore((state) => state.user);

  return (
    <section className="border flex-1  border-border bg-secondary/30 p-5 lg:w-full  w-full rounded-custom max-h-fit flex flex-col items-center justify-center gap-3">
      {/* <div className="self-end">
        <Button variant="outline">
          <FaRegEdit />
          Edit
        </Button>
      </div> */}

      <div className="flex flex-col items-center   gap-5">
        <Avatar className="w-20 h-20">
          <AvatarImage
            src={
              user?.profileImage !== ""
                ? user?.profileImage
                : "/default-pfp.jpeg"
            }
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-center">{user?.name}</h1>
            {user?.bio && (
              <p className="text-muted-foreground text-sm">{user?.bio}</p>
            )}
          </div>

          <div className="text-muted-foreground flex items-center gap-1 text-sm">
            <BsBookmarkCheck />
            <p>{user?.bookmarkedReposId?.length ?? 0} saved repositories</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileSection;
