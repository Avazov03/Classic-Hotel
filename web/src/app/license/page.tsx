import type { Metadata } from "next";
import { BaselineHtml } from "@/components/BaselineHtml";
import { html } from "@/baseline/html/license";

export const metadata: Metadata = { title: "License" };

export default function LicensePage() {
  return <BaselineHtml html={html} />;
}
