import { createStore } from "zustand";

interface Repo {
  description: string;
  forks: string;
  githubLink: string;
  id: number;
  image: string;
  name: string;
  stars: string;
  topics: string[];
  totalIssues: string;
  updatedAt: string;
  language: string | null;
}

type DetailedRepoType = Repo & {
  fullname: string;
  contributors: string[];
  readme: string;
  issues: {
    issuesUrl: string;
    title: string;
    labels: { name: string; color: string }[];
  }[];
};

export type RepoState = {
  exploreRepos: Repo[];
  detailedRepo: DetailedRepoType | null;
  searchRepoResult: Repo[] | null;
  trendingRepos: Repo[];
  isExploreRepoLoading: boolean;
  isSearchRepoResultLoading: boolean;
  isTrendingReposLoading: boolean;
};

export type RepoActions = {
  setExploreRepos: (arg: Repo[]) => void;
  setDetailedRepo: (arg: DetailedRepoType) => void;
  setSearchRepoResult: (arg: Repo[] | null) => void;
  setTrendingRepos: (arg: Repo[]) => void;
  setIsExploreRepoLoading: (arg: boolean) => void;
  setIsSearchRepoResultLoading: (arg: boolean) => void;
  setIsTrendingReposLoading: (arg: boolean) => void;
};

export type RepoStore = RepoState & RepoActions;

export const defaultInitstate: RepoState = {
  exploreRepos: [],
  searchRepoResult: null,
  trendingRepos: [],
  detailedRepo: null,
  isExploreRepoLoading: true,
  isSearchRepoResultLoading: false,
  isTrendingReposLoading: true,
};

export const createRepoStore = (initState: RepoState = defaultInitstate) => {
  return createStore<RepoStore>()((set) => ({
    ...initState,
    setExploreRepos: (repos) =>
      set((state) => ({
        exploreRepos: [...state.exploreRepos, ...repos],
      })),
    setDetailedRepo: (detailedRepo) =>
      set(() => ({
        detailedRepo,
      })),
    setSearchRepoResult: (searchRepoResult) =>
      set((state) => {
        if (searchRepoResult) {
          if (state.searchRepoResult) {
            return {
              searchRepoResult: [
                ...state.searchRepoResult,
                ...searchRepoResult,
              ],
            };
          }
          return {
            searchRepoResult: [...searchRepoResult],
          };
        } else {
          return { searchRepoResult: null };
        }

        // {
        //   return { searchRepoResult: searchRepoResult };
        // }
      }),
    setTrendingRepos: (trendingRepos) =>
      set(() => ({
        trendingRepos,
      })),
    setIsExploreRepoLoading: (arg) =>
      set(() => ({ isExploreRepoLoading: arg })),
    setIsSearchRepoResultLoading: (arg) =>
      set(() => ({ isSearchRepoResultLoading: arg })),
    setIsTrendingReposLoading: (arg) =>
      set(() => ({
        isTrendingReposLoading: arg,
      })),
  }));
};
