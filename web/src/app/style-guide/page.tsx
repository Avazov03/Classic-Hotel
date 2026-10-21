import type { Metadata } from "next";
import { BaselineHtml } from "@/components/BaselineHtml";
import { html } from "@/baseline/html/style-guide";

export const metadata: Metadata = { title: "Uslub qo‘llanmasi" };

export default function StyleGuidePage() {
  return <BaselineHtml html={html} />;
}
