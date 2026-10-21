import type { Metadata } from "next";
import { BaselineHtml } from "@/components/BaselineHtml";
import { html } from "@/baseline/html/not-found";

export const metadata: Metadata = { title: "Not found" };

export default function NotFoundPage() {
  return <BaselineHtml html={html} />;
}
