import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { IoIosSearch } from "react-icons/io";

function ExploreSearchSection() {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-3xl font-semibold">Explore Open Source Projects</h1>
      <div className="max-w-[500px] flex items-center gap-2">
        <div className="flex-1 relative">
          <span className="absolute top-2.5 left-2 text-muted-foreground">
            <IoIosSearch />
          </span>
          <Input placeholder="Search projects..." className="pl-7" />
        </div>
        <Button className="shrink-0">Search</Button>
      </div>
    </section>
  );
}

export default ExploreSearchSection;
