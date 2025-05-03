import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

interface User {
  name: string;
  email: string;
  profileImage?: string;
  provider: "credentials" | "github" | "google";
  bookmarkedRepos?: string[];
  bio?: string;
}

export type UserState = {
  user: User | null;
  loading: boolean;
};

export type UserActions = {
  setUser: (arg: User | null) => void;
  removeUser: () => void;
  setLoading: (arg: boolean) => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  user: null,
  loading: true,
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()(
    persist(
      (set) => ({
        ...initState,
        removeUser: () => set(() => ({ user: null })),
        setUser: (arg) => set(() => ({ user: arg })),
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
