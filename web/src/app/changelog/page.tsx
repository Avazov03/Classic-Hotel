import type { Metadata } from "next";
import { BaselineHtml } from "@/components/BaselineHtml";
import { html } from "@/baseline/html/changelog";

export const metadata: Metadata = { title: "O‘zgarishlar jurnali" };

export default function ChangelogPage() {
  return <BaselineHtml html={html} />;
}
