import { BaselineHtml } from "@/components/BaselineHtml";
import { BaselineInteractions } from "@/components/BaselineInteractions";
import { InlineHeaderNav } from "@/components/InlineHeaderNav";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { RouteChrome } from "@/components/RouteChrome";
import { WebflowRuntime } from "@/components/WebflowRuntime";
import { html as chromeHtml } from "@/baseline/html/chrome";
import { html as footerHtml } from "@/baseline/html/footer";
import { getLocale } from "@/i18n/get-locale";

export async function SiteShell({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <div className="baseline-root">
      <RouteChrome />
      <BaselineInteractions />
      <WebflowRuntime />
      <BaselineHtml html={chromeHtml} />
      <InlineHeaderNav locale={locale} />
      <LanguageSwitch locale={locale} />
      <main>{children}</main>
      <BaselineHtml html={footerHtml} />
    </div>
  );
}