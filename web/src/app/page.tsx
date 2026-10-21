import { BaselineHtml } from "@/components/BaselineHtml";
import { HomeAboutScroll } from "@/components/home/HomeAboutScroll";
import { html as heroHtml } from "@/baseline/html/home-0";
import { html as restHtml } from "@/baseline/html/home-rest";

export default function HomePage() {
  return (
    <>
      {/*
        Constrain sticky hero to this stage only. If hero is a direct child
        of <main>, it sticks for the whole page and later sections pile
        on top of the beach video (the big “buzilish”).
        Passthrough keeps hero sticky under the stage (About radius slide-over).
      */}
      <div className="home-hero-about-stage">
        <BaselineHtml html={heroHtml} passthrough />
        {/* React IX2-port About — not baseline home-1 (avoids double IX2) */}
        <HomeAboutScroll />
      </div>
      <BaselineHtml html={restHtml} />
    </>
  );
}
