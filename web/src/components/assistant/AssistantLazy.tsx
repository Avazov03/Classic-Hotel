"use client";

import dynamic from "next/dynamic";
import { AssistantProvider } from "./AssistantProvider";

const AssistantFab = dynamic(
  () => import("./AssistantFab").then((m) => m.AssistantFab),
  { ssr: false },
);

const AssistantChatPanel = dynamic(
  () => import("./AssistantChatPanel").then((m) => m.AssistantChatPanel),
  { ssr: false },
);

export function AssistantLazy() {
  return (
    <AssistantProvider>
      <AssistantFab />
      <AssistantChatPanel />
    </AssistantProvider>
  );
}
