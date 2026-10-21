import { BaselineHtml } from "@/components/BaselineHtml";
import { HomeAboutScroll } from "@/components/home/HomeAboutScroll";
import { html as heroHtml } from "@/baseline/html/home-0";
import { html as restHtml } from "@/baseline/html/home-rest";

export default function HomePage() {
  return (
    <>
      <BaselineHtml html={heroHtml} />
      <HomeAboutScroll />
      <BaselineHtml html={restHtml} />
    </>
  );
}