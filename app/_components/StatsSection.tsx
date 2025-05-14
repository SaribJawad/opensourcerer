import { FaRegStar } from "react-icons/fa";
import { IoCode } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";

function StatsSection() {
  const stats = [
    {
      icon: <LuUsers size={23} />,
      number: "10,000+",
      title: "Active Contributors",
      desc: "Join community of open source developers",
    },
    {
      icon: <FaRegStar size={23} />,
      number: "50,000+",
      title: "Projects Listed",
      desc: "Find the perfect project to contribute to",
    },
    {
      icon: <IoCode size={23} />,
      number: "100+",
      title: "Programming Languages",
      desc: "Discover projects in your preferred tech stack",
    },
  ];

  return (
    <section className="w-full p-5 ">
      <div className="max-w-[1100px] mx-auto py-20 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
        {/* stat card */}
        {stats.map((stat, index) => (
          <div
            key={index}
            className="border border-border p-5 rounded-custom flex flex-col items-center justify-center text-center gap-3 bg-background/30 color-hover hover:bg-gradient-to-br from-primary/10 via-accent/10 to-transparent"
          >
            <div className="text-accent/90 bg-accent/10 p-3 rounded-full">
              {stat.icon}
            </div>
            <h1 className="text-3xl font-bold">{stat.number}</h1>
            <h2>{stat.title}</h2>
            <p className="text-muted-foreground text-sm">{stat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StatsSection;
