"use client";

import { useIsClient } from "@uidotdev/usehooks";
import { PropsWithChildren } from 'react';

export function ClientOnly({ children }: PropsWithChildren) {
  const isClient = useIsClient();

  return isClient ? <>{children}</> : null;
};