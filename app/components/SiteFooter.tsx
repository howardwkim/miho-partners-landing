export function SiteFooter() {
  return (
    <footer className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-10">
      <span>MiHo Partners &mdash; Mike Grabham &amp; Howard Kim</span>
      <a
        href="mailto:hello@mihopartners.com"
        className="font-medium transition-colors hover:text-link"
      >
        hello@mihopartners.com
      </a>
    </footer>
  );
}
