import { Button } from "./ui/button";

function ReadyToStartSection() {
  return (
    <section className="w-full bg-accent p-5">
      <div className="max-w-[1400px] mx-auto py-20 flex flex-col gap-8 items-center justify-center">
        <div className="flex flex-col gap-2 items-center text-white text-center">
          <h1 className="text-3xl font-semibold">Ready to Make an Impact?</h1>
          <p className="text-lg font-light">
            Start your open source journey today. Join our community of
            developers and contribute to projects that matter.
          </p>
        </div>
        <div className="flex items-center gap-5">
          <Button
            variant="secondary"
            size="lg"
            className="rounded-full bg-accent-foreground text-accent"
          >
            Create Free Account
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border border-white"
          >
            Browse Projects
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ReadyToStartSection;
