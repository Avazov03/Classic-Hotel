"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type AssistantContextValue = {
  open: boolean;
  expanded: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleExpanded: () => void;
  newChat: () => void;
  chatKey: number;
};

const AssistantContext = createContext<AssistantContextValue | null>(null);

export function AssistantProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [chatKey, setChatKey] = useState(0);

  const openChat = useCallback(() => setOpen(true), []);
  const closeChat = useCallback(() => {
    setOpen(false);
    setExpanded(false);
  }, []);
  const toggleExpanded = useCallback(() => setExpanded((v) => !v), []);
  const newChat = useCallback(() => {
    setChatKey((k) => k + 1);
  }, []);

  const value = useMemo(
    () => ({ open, expanded, openChat, closeChat, toggleExpanded, newChat, chatKey }),
    [open, expanded, openChat, closeChat, toggleExpanded, newChat, chatKey],
  );

  return <AssistantContext.Provider value={value}>{children}</AssistantContext.Provider>;
}

export function useAssistant() {
  const ctx = useContext(AssistantContext);
  if (!ctx) throw new Error("useAssistant must be used within AssistantProvider");
  return ctx;
}
