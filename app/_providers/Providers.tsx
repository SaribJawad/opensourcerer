"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import React from "react";
import { UserStoreProvider } from "./userStoreProvider";
import LoadingOverlay from "./LoadingOverlay";
import { ToasterWithMax } from "./ToasterWithMax";
import { RepoStoreProvider } from "./repoStoreProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ProvidersProps {
  session: Session;
  children: React.ReactNode;
}

function Providers({ children, session }: ProvidersProps) {
  const queryClient = new QueryClient();
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <QueryClientProvider client={queryClient}>
          <UserStoreProvider>
            <RepoStoreProvider>
              <LoadingOverlay>
                <ToasterWithMax />
                {children}
              </LoadingOverlay>
            </RepoStoreProvider>
          </UserStoreProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default Providers;
