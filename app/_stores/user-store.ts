import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

interface User {
  name: string;
  email: string;
  profileImage?: string;
  provider: "credentials" | "github" | "google";
  bookmarkedReposId: string[];
  bio?: string;
}

interface IBookmarkedRepo {
  owner: string;
  githubLink: string;
  repoId: string;
  image: string;
  name: string;
  description: string;
  topics?: string[];
  stars: string;
  forks: string;
  issues: string;
}

export type UserState = {
  user: User | null;
  bookmarkedRepos: IBookmarkedRepo[];
  searchNextPageUrl: string | null;
  loading: boolean;
};

export type UserActions = {
  setUser: (arg: User | null) => void;
  removeUser: () => void;
  setLoading: (arg: boolean) => void;
  setBookmarkedRepos: (arg: IBookmarkedRepo[]) => void;
  setSearchNextPageUrl: (url: string | null) => void;
  updateUserBookmarksId: (arg: string) => void;
  updateBookmarkedRepos: (arg: string) => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  user: null,
  bookmarkedRepos: [],
  loading: true,
  searchNextPageUrl: null,
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()(
    persist(
      (set) => ({
        ...initState,
        removeUser: () => set(() => ({ user: null })),
        setUser: (arg) => set(() => ({ user: arg })),
        setBookmarkedRepos: (arg) =>
          set(() => ({
            bookmarkedRepos: arg,
          })),
        setSearchNextPageUrl: (url) =>
          set(() => ({
            searchNextPageUrl: url,
          })),
        updateUserBookmarksId: (arg) =>
          set((state) => {
            if (!state.user) return state;

            const alreadyBookmarked =
              state.user.bookmarkedReposId.includes(arg);

            return {
              user: {
                ...state.user,
                bookmarkedReposId: alreadyBookmarked
                  ? state.user.bookmarkedReposId.filter((id) => id !== arg)
                  : [...state.user.bookmarkedReposId, arg],
              },
            };
          }),
        updateBookmarkedRepos: (arg) =>
          set((state) => ({
            bookmarkedRepos: state.bookmarkedRepos.filter(
              (repo) => repo.repoId !== arg
            ),
          })),
        setLoading: (arg) => set(() => ({ loading: arg })),
      }),
      {
        name: "user",
        partialize: (state) => ({
          user: state.user,
        }),
      }
    )
  );
};
