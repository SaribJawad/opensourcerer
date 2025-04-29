function Divider({
  children,
  textSize = "xs",
}: {
  children: React.ReactNode;
  textSize?: "xs" | "sm" | "md" | "lg";
}) {
  return (
    <div className="flex items-center w-full gap-2">
      <span className="h-px flex-1 border border-border"></span>
      <p className={`shrink-0 text-${textSize} text-muted-foreground`}>
        {children}
      </p>
      <span className="h-px flex-1  border border-border"></span>
    </div>
  );
}

export default Divider;
