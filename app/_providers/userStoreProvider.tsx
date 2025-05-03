"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import { createUserStore, type UserStore } from "../_stores/user-store";
import { useStore } from "zustand";
import { useSession } from "next-auth/react";
import { getUser } from "../_handlers/getUser";

export type UserStoreApi = ReturnType<typeof createUserStore>;

export const UserStoreContext = createContext<UserStoreApi | undefined>(
  undefined
);

interface IUserStoreProviderProps {
  children: React.ReactNode;
}

export const UserStoreProvider = ({ children }: IUserStoreProviderProps) => {
  const { status } = useSession();
  const storeRef = useRef<UserStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createUserStore();
  }

  const store = storeRef.current;

  useEffect(() => {
    const fetchUser = async () => {
      if (status === "authenticated") {
        try {
          store.getState().setLoading(true);

          const user = await getUser();

          store.getState().setUser(user.user);

          if (!user) {
            console.log("user not found");
            store.getState().setUser(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          store.getState().setLoading(false);
        }
      } else {
        store.getState().setUser(null);
        store.getState().setLoading(false);
      }
    };

    if (status !== "loading") {
      fetchUser();
    }
  }, [status, store]);

  return (
    <UserStoreContext.Provider value={storeRef.current}>
      {children}
    </UserStoreContext.Provider>
  );
};

export const useUserStore = <T,>(selector: (state: UserStore) => T): T => {
  const store = useContext(UserStoreContext);

  if (!store) {
    throw new Error("UserStoreContext must be used within UserStoreProvider");
  }

  return useStore(store, selector);
};
