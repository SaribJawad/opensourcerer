"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { GoSun } from "react-icons/go";
import { IoMoonOutline } from "react-icons/io5";
import { LoadingSpinner } from "./LoadingSpinner";

function ThemeSwitch() {
  const [mounted, setMoundted] = useState<boolean>(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMoundted(true), []);

  if (!mounted) {
    return <LoadingSpinner />;
  }

  let icon;

  if (resolvedTheme === "dark") {
    icon = <GoSun size={20} className="cursor-pointer " />;
  }

  if (resolvedTheme === "light") {
    icon = <IoMoonOutline size={20} className="cursor-pointer" />;
  }

  const handleThemeChange = () => {
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else if (resolvedTheme === "light") {
      setTheme("dark");
    }
  };

  return (
    <button
      onClick={handleThemeChange}
      className="hover:bg-accent p-2 rounded-full hover:text-white color-hover"
    >
      {icon}
    </button>
  );
}

export default ThemeSwitch;
