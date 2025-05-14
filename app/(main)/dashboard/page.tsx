import React from "react";
import ProfileSection from "./_components/ProfileSection";
import BookmarkedReposSection from "./_components/BookmarkedReposSection";

export const metadata = {
  title: "Dashboard | OpenSourcerer",
  description: "Your personalized dashboard with saved repositories.",
};

function page() {
  return (
    <main className="pt-20  w-full p-5 h-full bg-background  ">
      <div className="max-w-[1400px] mx-auto flex  gap-10 h-full lg:flex-row flex-col-reverse">
        <div className="flex-3 flex flex-col text-xl font-semibold gap-6  ">
          Bookmarked Repositories
          <BookmarkedReposSection />
        </div>
        <ProfileSection />
      </div>
    </main>
  );
}

export default page;
