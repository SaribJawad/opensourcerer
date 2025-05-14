import { Checkbox } from "@/app/_components/ui/checkbox";
import { Label } from "@/app/_components/ui/label";
import { ScrollArea } from "@/app/_components/ui/scroll-area";

interface IFilterByLanguageSectionProps {
  handleFilterByLanguages: (lang: string) => void;
  filterLanguages: string | undefined;
}

function FilterByLanguageSection({
  filterLanguages,
  handleFilterByLanguages,
}: IFilterByLanguageSectionProps) {
  const languages = [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "Go",
    "Rust",
    "C++",
    "Ruby",
    "PHP",
    "C#",
  ];

  return (
    <div className="">
      <h3 className="font-semibold mb-2">Languages</h3>
      <ScrollArea className="h-56 w-full rounded-md">
        <div className="flex flex-col gap-4">
          {languages.map((lang) => (
            <div key={lang} className="flex items-center space-x-2">
              <Checkbox
                id={lang}
                checked={filterLanguages === lang}
                onCheckedChange={() => handleFilterByLanguages(lang)}
              />
              <Label
                htmlFor={lang}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {lang}
              </Label>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default FilterByLanguageSection;
