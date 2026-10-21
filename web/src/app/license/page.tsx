import type { Metadata } from "next";
import { BaselineHtml } from "@/components/BaselineHtml";
import { html } from "@/baseline/html/license";

export const metadata: Metadata = { title: "Litsenziya" };

export default function LitsenziyaPage() {
  return <BaselineHtml html={html} />;
}
