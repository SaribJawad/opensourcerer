"use client";

import { LuAlignJustify } from "react-icons/lu";
import Logo from "./Logo";
import ThemeSwitch from "./ThemeSwitch";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Link from "next/link";

function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);
  const [isNavVisible, setIsNavVisible] = useState<boolean>(false);

  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.style.overflow = "hidden";
      setIsNavVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsNavVisible(false);
        document.body.style.overflow = "";
      }, 300);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isMobileNavOpen]);

  return (
    <header className="w-full border-b border-border/90 fixed backdrop-blur-xl bg-background/20 z-20">
      <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between relative p-3">
        <Logo />
        <nav className="items-center gap-3 flex">
          <div className="md:flex hidden items-center gap-3">
            <Link href="/explore">
              <Button variant="ghost">Explore</Button>
            </Link>

            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
          </div>
          <ThemeSwitch />
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Button className="md:block hidden">Register</Button>
          <Button
            onClick={() => setIsMobileNavOpen((prev) => !prev)}
            className="md:hidden block cursor-pointer"
          >
            <LuAlignJustify />
          </Button>
        </nav>

        {isNavVisible ? (
          <nav
            onClick={() => setIsMobileNavOpen(false)}
            className={`h-dvh w-full absolute top-0 right-0 transition-all duration-300 md:hidden flex justify-end ${
              isMobileNavOpen ? "opacity-100" : "opacity-0"
            }`}
            style={{ background: "rgba(0, 0, 0, 0.6)" }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`p-3 bg-background w-[70%] flex flex-col gap-10 border-l border-border transition-transform duration-300 ${
                isMobileNavOpen ? "top-0 right-0" : "left-0 -right-100"
              }`}
            >
              <div className="flex items-center justify-between self-end">
                <Button
                  onClick={() => setIsMobileNavOpen(false)}
                  className="md:hidden block cursor-pointer"
                >
                  <IoClose />
                </Button>
              </div>
              <div className="flex flex-col gap-5 justify-between flex-1">
                <div className="flex flex-col gap-5">
                  <Link href="/explore" className="">
                    <Button variant="outline" className="w-full">
                      Explore
                    </Button>
                  </Link>
                  <Button variant="outline">Dashboard</Button>
                </div>
                <Button className="">Register</Button>
              </div>
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  );
}

export default Header;
