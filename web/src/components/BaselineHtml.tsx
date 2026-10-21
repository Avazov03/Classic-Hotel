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

export function BaselineHtml({
  html,
  className,
  as: Tag = "div",
  passthrough = false,
}: Props) {
  return (
    <Tag
      className={className}
      style={passthrough ? { display: "contents" } : undefined}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}