import Link from "next/link";
import Logo from "./Logo";

function Footer() {
  const navigation = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Explore",
      link: "/explore",
    },
    {
      title: "Dashboard",
      link: "/dashboard",
    },
  ];

  const resources = [
    {
      title: "About",
      link: "/",
    },
    {
      title: "Blog",
      link: "/",
    },
    {
      title: "Documentation",
      link: "/",
    },
  ];

  const legal = [
    {
      title: "Privacy Policy",
      link: "/",
    },
    {
      title: "Terms of Service",
      link: "/",
    },
  ];

  return (
    <footer className="w-full bg-background p-3 border-t border-border">
      <div className="max-w-[1400px]  py-16 mx-auto grid lg:grid-cols-4 grid-cols-1 gap-4 border-b border-border">
        <div className="flex flex-col gap-2">
          <Logo />
          <p className="text-muted-foreground text-sm">
            Discover and contribute to amazing open source projects with ease.
          </p>
        </div>
        {/* navigation */}
        <div className="flex flex-col gap-3 ">
          <h1>Navigation</h1>
          <ul className="flex flex-col gap-2 text-muted-foreground text-sm">
            {navigation.map((nav) => (
              <Link
                href={nav.link}
                key={nav.title}
                className="hover:text-foreground color-hover"
              >
                <li>{nav.title}</li>
              </Link>
            ))}
          </ul>
        </div>
        {/* legal */}
        <div className="flex flex-col gap-3 ">
          <h1>Resources</h1>
          <ul className="flex flex-col gap-2 text-muted-foreground text-sm">
            {resources.map((resource) => (
              <Link
                href={resource.link}
                key={resource.title}
                className="hover:text-foreground color-hover"
              >
                <li>{resource.title}</li>
              </Link>
            ))}
          </ul>
        </div>
        {/* legal */}
        <div className="flex flex-col gap-3 ">
          <h1>Legal</h1>
          <ul className="flex flex-col gap-2 text-muted-foreground text-sm">
            {legal.map((legal) => (
              <Link
                href={legal.link}
                key={legal.title}
                className="hover:text-foreground color-hover"
              >
                <li>{legal.title}</li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
      <div className="py-12 text-sm text-muted-foreground flex items-center justify-center">
        <span>© 2025 OpenSourcerer. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;
