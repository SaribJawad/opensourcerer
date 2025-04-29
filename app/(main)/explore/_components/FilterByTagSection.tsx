import { Checkbox } from "@/app/_components/ui/checkbox";
import { Label } from "@/app/_components/ui/label";
import { ScrollArea } from "@/app/_components/ui/scroll-area";

interface IFilterByTagSection {
  handleFilterByTags: (tag: string) => void;
  tags: string[];
}

function FilterByTagSection({
  tags: filteredTags,
  handleFilterByTags,
}: IFilterByTagSection) {
  const tags = [
    "good-first-issue",
    "help-wanted",
    "documentation",
    "bug",
    "enhancement",
    "hacktoberfest",
  ];

  return (
    <div className="">
      <h3 className="font-semibold mb-2">Tags</h3>
      <ScrollArea className="h-56 w-full rounded-md ">
        <div className="flex flex-col gap-4">
          {tags.map((tag) => (
            <div key={tag} className="flex items-center space-x-2">
              <Checkbox
                id={tag}
                checked={filteredTags.includes(tag)}
                onCheckedChange={() => handleFilterByTags(tag)}
              />
              <Label
                htmlFor={tag}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {tag}
              </Label>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default FilterByTagSection;
