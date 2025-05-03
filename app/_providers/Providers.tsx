"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import React from "react";
import { UserStoreProvider } from "./userStoreProvider";
import LoadingOverlay from "./LoadingOverlay";
import { ToasterWithMax } from "./ToasterWithMax";

interface ProvidersProps {
  session: Session;
  children: React.ReactNode;
}

function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <UserStoreProvider>
          <LoadingOverlay>
            <ToasterWithMax />
            {children}
          </LoadingOverlay>
        </UserStoreProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default Providers;
