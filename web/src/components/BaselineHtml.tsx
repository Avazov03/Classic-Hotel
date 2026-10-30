import { getLocale } from "@/i18n/get-locale";
import { translateHtml } from "@/i18n/translate";

type Props = {
  html: string;
  className?: string;
  as?: "div" | "main" | "section";
  /**
   * Flatten this wrapper for layout (display:contents) so sticky chapters
   * (e.g. home hero) stick within <main> instead of a short parent box.
   */
  passthrough?: boolean;
};

export async function BaselineHtml({
  html,
  className,
  as: Tag = "div",
  passthrough = false,
}: Props) {
  const locale = await getLocale();
  return (
    <Tag
      className={className}
      style={passthrough ? { display: "contents" } : undefined}
      dangerouslySetInnerHTML={{ __html: translateHtml(html, locale) }}
    />
  );
}