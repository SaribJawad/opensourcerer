import Image from "next/image";

interface ILogoProps {
  width?: number;
  height?: number;
}

function Logo({ height = 30, width = 30 }: ILogoProps) {
  return (
    <div className="flex items-center gap-3">
      <Image src={"/logo.svg"} alt="logo" width={width} height={height} />
      <h1 className="font-medium capitalize text-lg md:block hidden">
        opensourcerer
      </h1>
    </div>
  );
}

export default Logo;
