import { BaselineHtml } from "@/components/BaselineHtml";
import { BaselineInteractions } from "@/components/BaselineInteractions";
import { html as chromeHtml } from "@/baseline/html/chrome";
import { html as footerHtml } from "@/baseline/html/footer";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="baseline-root">
      <BaselineInteractions />
      <BaselineHtml html={chromeHtml} />
      <main>{children}</main>
      <BaselineHtml html={footerHtml} />
    </div>
  );
}