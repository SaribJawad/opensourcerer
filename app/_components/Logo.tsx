import Image from "next/image";
import Link from "next/link";

interface ILogoProps {
  width?: number;
  height?: number;
}

function Logo({ height = 30, width = 30 }: ILogoProps) {
  return (
    <Link href="/">
      <div className="flex items-center gap-3">
        <Image src={"/logo.svg"} alt="logo" width={width} height={height} />
        <h1 className="font-medium capitalize text-lg md:block hidden">
          opensourcerer
        </h1>
      </div>
    </Link>
  );
}

export default Logo;
