import type { Metadata } from "next";
import { BaselineHtml } from "@/components/BaselineHtml";
import { html } from "@/baseline/html/restaurant";
import { pageIntros } from "@/data/pages";

export const metadata: Metadata = {
  title: "Restaurant",
  description: pageIntros.restaurant.metaDescription,
};

export default function RestaurantPage() {
  return <BaselineHtml html={html} />;
}