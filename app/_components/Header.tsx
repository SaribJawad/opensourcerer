import Logo from "./Logo";
import ThemeSwitch from "./ThemeSwitch";
import { Button } from "./ui/button";

function Header() {
  return (
    <header className=" w-full p-3 border-b border-border/90 fixed bg-background/80  backdrop-blur-[8px] z-50">
      <div className="w-full max-w-[1400px]  mx-auto flex items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-3 md:flex">
          <Button variant="ghost">Explore</Button>
          <Button variant="ghost">Dashboard</Button>
          <ThemeSwitch />
          <Button variant="outline">Login</Button>
          <Button>Register</Button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
