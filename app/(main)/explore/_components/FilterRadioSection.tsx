import { Label } from "@/app/_components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/_components/ui/radio-group";
import { SortBy } from "./FilterSideBar";
import { Dispatch, SetStateAction } from "react";

interface IFilterRadioSection {
  sortBy: SortBy;
  setSortBy: Dispatch<SetStateAction<SortBy>>;
}

function FilterRadioSection({ setSortBy, sortBy }: IFilterRadioSection) {
  return (
    <div className=" ">
      <h3 className="font-semibold mb-2">Sort By</h3>
      <RadioGroup
        value={sortBy}
        onValueChange={(value) => setSortBy(value as SortBy)}
        className="flex flex-col gap-2 "
      >
        <div className="flex items-center space-x-2 mb-2">
          <RadioGroupItem value="stars" id="stars" />
          <Label htmlFor="stars">Stars</Label>
        </div>
        <div className="flex items-center space-x-2 mb-2">
          <RadioGroupItem value="updated" id="updated" />
          <Label htmlFor="updated">Recently Updated</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="issues" id="issues" />
          <Label htmlFor="issues">Open Issues</Label>
        </div>
      </RadioGroup>
    </div>
  );
}

export default FilterRadioSection;
