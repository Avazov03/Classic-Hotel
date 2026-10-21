import { BaselineHtml } from "@/components/BaselineHtml";
import { BaselineInteractions } from "@/components/BaselineInteractions";
import { RouteChrome } from "@/components/RouteChrome";
import { WebflowRuntime } from "@/components/WebflowRuntime";
import { html as chromeHtml } from "@/baseline/html/chrome";
import { html as footerHtml } from "@/baseline/html/footer";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="baseline-root">
      <RouteChrome />
      <BaselineInteractions />
      <WebflowRuntime />
      <BaselineHtml html={chromeHtml} />
      <main>{children}</main>
      <BaselineHtml html={footerHtml} />
    </div>
  );
}