import { BiMessageSquareDetail } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";

function FeaturesSection() {
  const features = [
    {
      icon: <FaSearch size={23} />,
      title: "Smart Search",
      desc: "Find the perfect project with powerful filters for language, stars, and activity level.",
    },
    {
      icon: <FiHeart size={23} />,
      title: "Track Projects",
      desc: "Save interesting projects.",
    },
    {
      icon: <BiMessageSquareDetail size={23} />,
      title: "Detailed Insights",
      desc: "Get comprehensive analytics about project activity and maintainer responsiveness.",
    },
  ];

  return (
    <section className="w-full p-5 bg-background py-20">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-14">
        <div className="w-full flex flex-col items-center justify-center gap-3">
          <h1 className="text-3xl font-semibold">
            Everything you need to{" "}
            <span className="text-accent">contribute</span>
          </h1>
          <p className="text-muted-foreground ">
            Our platform provides all the tools and insights you need to make
            meaningful contributions to open source projects.
          </p>
        </div>
        <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-8">
          {/* feature card */}
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 flex flex-col gap-3 items-start bg-secondary/20 rounded-custom  hover:bg-accent/10 transition-all hover:-translate-y-1 duration-300 shadow-sm hover:shadow-md"
            >
              <div className="text-accent/90 bg-accent/10 p-3 rounded-full">
                {feature.icon}
              </div>
              <h1 className="text-xl font-semibold">{feature.title}</h1>
              <p className="text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
