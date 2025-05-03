"use client";

import React from "react";
import { useUserStore } from "./userStoreProvider";
import { LoadingSpinner } from "../_components/LoadingSpinner";

interface ILoadingOveralyProps {
  children: React.ReactNode;
}

function LoadingOverlay({ children }: ILoadingOveralyProps) {
  const loading = useUserStore((state) => state.loading);

  if (loading) {
    return (
      <div className="w-full h-dvh flex items-center justify-center bg-background">
        <LoadingSpinner size={40} className="text-[var(--color-accent)]" />
      </div>
    );
  }

  return <>{children}</>;
}

export default LoadingOverlay;
