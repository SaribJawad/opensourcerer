import { Slider } from "@/app/_components/ui/slider";
import { Dispatch, SetStateAction } from "react";

interface IFilerByStarsSectionProps {
  stars: number[];
  setStars: Dispatch<SetStateAction<number[]>>;
}

function FilterByStarsSection({ setStars, stars }: IFilerByStarsSectionProps) {
  return (
    <div className="flex flex-col gap-2 ">
      <h3 className="font-semibold mb-2">Minimum Stars</h3>

      <Slider
        value={stars}
        max={10000}
        step={1}
        onValueChange={(value) => setStars(value)}
      />
      <p className="text-sm">{stars} stars</p>
    </div>
  );
}

export default FilterByStarsSection;
