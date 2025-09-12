"use client";
import { HeroUIProvider } from "@heroui/react";
import type { Wrapper } from "@/types/general";

const CombinedProviders: React.FC<Wrapper> = ({ children }) => {
  return (
    <HeroUIProvider>
      { children }
    </HeroUIProvider>
  )
};

export default CombinedProviders