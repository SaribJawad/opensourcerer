import Image from "next/image";
import { Button } from "./ui/button";

function HeroSection() {
  return (
    <section className="  py-44  w-full  bg-gradient-to-br from-primary/10 via-accent/10 to-transparent p-5 ">
      <div className=" grid md:grid-cols-2 grid-cols-1 max-w-[1400px] mx-auto ">
        <div className="flex flex-col gap-5">
          <h1 className="md:text-7xl sm:text-5xl text-4xl font-bold animate-fade-in">
            Discover Your Next <span className="text-accent">Open Source</span>{" "}
            <br /> Journey
          </h1>
          <p className=" text-muted-foreground md:text-lg text-md animate-fade-in">
            Join thousands of developers making an impact in the open source
            community. Find projects that match your skills and interests.
          </p>
          <div className="flex gap-3 items-center">
            <Button size="lg" className="rounded-full animate-fade-in-delay-1">
              Start Exploring
            </Button>
            <Button
              size="lg"
              className="rounded-full animate-fade-in-delay-2"
              variant="outline"
            >
              Join Community
            </Button>
          </div>
        </div>
        <div className="hidden md:flex items-center justify-center ">
          {/* <HeroIllustration /> */}
          <Image
            src={"/hero-section1.svg"}
            alt="programmer"
            width={300}
            height={300}
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
