import type { Metadata } from "next";
import { BaselineHtml } from "@/components/BaselineHtml";
import { html } from "@/baseline/html/password-protected";

export const metadata: Metadata = { title: "Parol bilan himoyalangan" };

export default function PasswordProtectedPage() {
  return <BaselineHtml html={html} />;
}
