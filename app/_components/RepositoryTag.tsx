function RepositoryTag({ tag }: { tag: string }) {
  return (
    <span className="text-xs py-0.5 px-2 border bg-secondary/80 border-border rounded-custom">
      {tag}
    </span>
  );
}

export default RepositoryTag;
