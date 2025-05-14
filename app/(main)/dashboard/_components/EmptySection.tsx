import React from "react";

interface IEmptySectionProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

function EmptySection({ description, title, children }: IEmptySectionProps) {
  return (
    <section className="col-span-2 my-28 flex flex-col items-center justify-center gap-10 ">
      <div className="flex flex-col items-center justify-center h-full gap-4 w-80 text-center mx-auto">
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </section>
  );
}

export default EmptySection;
