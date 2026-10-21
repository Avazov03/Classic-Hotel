type Props = {
  html: string;
  className?: string;
  as?: "div" | "main" | "section";
};

export function BaselineHtml({ html, className, as: Tag = "div" }: Props) {
  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}