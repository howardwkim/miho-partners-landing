/**
 * The one bespoke component in the insights section, and the reason the article
 * template is designed rather than lifted.
 *
 * MiHo sells prescription, not diagnosis — the audit's promise is "here is what
 * to do," and an article that ends on a platitude contradicts the thing being
 * sold. Every article carries one of these, holding the concrete two or three
 * actions a reader can take. It is a structural slot that has to be filled with
 * something specific.
 *
 * Deliberately NOT marked `not-prose`: the typography plugin excludes anything
 * under `.not-prose` with a `:not(.not-prose *)` guard on every rule, and a
 * nested `.prose` can't win that back — lists inside would lose their markers.
 * So this inherits the article's prose styling, and the style guide wraps its
 * demo in a prose container to match.
 */
export function Takeaway({
  title = "What to do about it",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <aside className="my-12 rounded-3xl bg-surface p-7 [&>:first-child]:mt-0 [&>:last-child]:mb-0 sm:p-9">
      <div className="mb-2 font-accent text-2xl italic text-deep sm:text-3xl">{title}</div>
      {children}
    </aside>
  );
}
