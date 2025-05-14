import { createContext, useContext, useEffect, useRef } from "react";
import { createRepoStore, RepoStore } from "../_stores/repo-store";
import { useStore } from "zustand";

export type RepoStoreApi = ReturnType<typeof createRepoStore>;

export const RepoStoreContext = createContext<RepoStoreApi | undefined>(
  undefined
);

interface IRepoStoreProviderProps {
  children: React.ReactNode;
}

export const RepoStoreProvider = ({ children }: IRepoStoreProviderProps) => {
  const storeRef = useRef<RepoStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createRepoStore();
  }

  const store = storeRef.current;

  useEffect(() => {
    async function fetchRepos() {
      store.getState().setIsExploreRepoLoading(true);
      try {
        const response = await fetch("/api/github/explore", {
          next: { revalidate: 5 },
        });

        const data = await response.json();

        store.getState().setExploreRepos(data.repos);
      } catch (error) {
        console.error("Error fetching explore repos:", error);
      } finally {
        store.getState().setIsExploreRepoLoading(false);
      }
    }

    fetchRepos();
  }, [store]);

  return (
    <RepoStoreContext.Provider value={store}>
      {children}
    </RepoStoreContext.Provider>
  );
};

export const useRepoStore = <T,>(selector: (state: RepoStore) => T): T => {
  const store = useContext(RepoStoreContext);

  if (!store) {
    throw new Error("UserStoreContext must be used within UserStoreProvider");
  }

  return useStore(store, selector);
};
