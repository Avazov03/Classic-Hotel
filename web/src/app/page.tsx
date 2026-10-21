import { BaselineHtml } from "@/components/BaselineHtml";
import { html as heroHtml } from "@/baseline/html/home-0";
import { html as aboutHtml } from "@/baseline/html/home-1";
import { html as restHtml } from "@/baseline/html/home-rest";

export default function HomePage() {
  return (
    <>
      <BaselineHtml html={heroHtml} />
      <BaselineHtml html={aboutHtml} />
      <BaselineHtml html={restHtml} />
    </>
  );
}
