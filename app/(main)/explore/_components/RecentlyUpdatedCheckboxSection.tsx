import { Checkbox } from "@/app/_components/ui/checkbox";
import { Label } from "@/app/_components/ui/label";
import { Dispatch, SetStateAction } from "react";

interface IRecentlyUpdatedCheckboxSectionProps {
  setIsChecked: Dispatch<SetStateAction<boolean>>;
  isChecked: boolean;
}

function RecentlyUpdatedCheckboxSection({
  setIsChecked,
  isChecked,
}: IRecentlyUpdatedCheckboxSectionProps) {
  return (
    <div className="">
      <h3 className="font-semibold mb-2">Recently Updated</h3>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={isChecked}
          onCheckedChange={(checked) => setIsChecked(checked as boolean)}
        />
        <Label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Updated in last 30 days
        </Label>
      </div>
    </div>
  );
}

export default RecentlyUpdatedCheckboxSection;
