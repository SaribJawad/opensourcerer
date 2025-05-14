import RepoDetailSection from "../_components/RepoDetailSection";

export const metadata = {
  title: "Repository | OpenSourcerer",
  description:
    "Detailed view of open-source repositories with helpful insights.",
};

export default function RepositoryPage() {
  return (
    <section className={`pt-20 h-full w-full p-5 bg-background   `}>
      <RepoDetailSection />
    </section>
  );
}
