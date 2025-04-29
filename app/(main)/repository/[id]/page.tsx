import RepositoryBreadcrumb from "../_components/RepositoryBreadcrumb";
import RepositoryHeader from "../_components/RepositoryHeader";
import RepoInfo from "../_components/RepoInfo";
import RepositoryNavigationSection from "../_components/RepositoryNavigationSection";

export default function RepositoryPage({ params }: { params: { id: string } }) {
  const projectData = {
    id: "1",
    name: "next.js",
    desc: "The React Framework for the Web",
    owner: "vercel",
    stars: 108934,
    forks: 24023,
    language: "TypeScript",
    issues: 1987,
    updatedAt: "2 days ago",
    tags: ["framework", "react", "javascript", "good-first-issue"],
    license: "MIT",
    watchersCount: 3421,
    contributors: [
      { username: "johndoe", avatarUrl: "https://github.com/johndoe.png" },
      { username: "janedoe", avatarUrl: "https://github.com/janedoe.png" },
      { username: "bobsmith", avatarUrl: "https://github.com/bobsmith.png" },
      {
        username: "sarahjones",
        avatarUrl: "https://github.com/sarahjones.png",
      },
      { username: "mikebrown", avatarUrl: "https://github.com/mikebrown.png" },
    ],
    openIssues: [
      {
        id: "101",
        title: "Bug: Server component props not working",
        labels: ["bug", "help wanted"],
        commentsCount: 5,
        createdAt: "3 days ago",
      },
      {
        id: "102",
        title: "Feature request: Better error handling",
        labels: ["enhancement", "good first issue"],
        commentsCount: 2,
        createdAt: "5 days ago",
      },
      {
        id: "103",
        title: "Documentation: Update migration guide for v12",
        labels: ["documentation", "good first issue"],
        commentsCount: 1,
        createdAt: "1 week ago",
      },
    ],
    readme: `# Next.js
      
        The React Framework for the Web
      
        ## Getting Started
        
        Visit [nextjs.org/docs](https://nextjs.org/docs) to get started with Next.js.
        
        ## Documentation
        
        Find in-depth information about Next.js features and API.
        
        ## Examples
        
        Discover and deploy example Next.js projects.
        
        ## Deploy
        
        Deploy your Next.js site to a public URL with Vercel.`,
    activityStats: {
      issueResponseTime: 3.2, // days
      prMergeTime: 5.8, // days
      commitFrequency: 18.3, // per week
      lastRelease: "2 weeks ago",
      activityScore: 87, // out of 100
    },
  };
  console.log(params.id);
  return (
    <section className="pt-20 h-full  w-full p-5 bg-background">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-5">
        <RepositoryBreadcrumb
          projName={projectData.name}
          projOwner={projectData.owner}
        />
        <RepositoryHeader desc={projectData.desc} name={projectData.name} />
        <RepoInfo />

        <RepositoryNavigationSection
          issues={projectData.openIssues}
          contributors={projectData.contributors}
          readMe={projectData.readme}
          tags={projectData.tags}
        />
      </div>
    </section>
  );
}
