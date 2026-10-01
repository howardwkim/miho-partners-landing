"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

import { BookForm, type BookSource } from "./BookForm";

/* ---------------------------------------------------------------------------
   The booking modal. Every "Book your audit" button opens it, so the visitor
   fills the form over the page they're on instead of being scrolled away.

   A native <dialog> opened with showModal() does the hard parts: the page
   behind goes inert (focus can't leave the modal) and Esc closes it. On top of
   that: a click on the backdrop closes it, the page behind can't scroll, and
   focus goes back to the button that opened it. Below 640px it's a full-screen
   sheet; above, a Warm Paper card on a Forest Ink scrim.

   Focus opens on the heading, not a field, so no phone keyboard comes up until
   the visitor taps one. Nothing tracks the keyboard: the submit sits in normal
   flow under the last field and the sheet scrolls like a page. The × comes
   after the form in the DOM, so it's the last tab stop, and shows a ring only
   for keyboard focus (the global :focus-visible rule).

   Mounted once in the root layout; buttons reach it through useBookModal().
   --------------------------------------------------------------------------- */

type OpenBookModal = (source?: BookSource) => void;

const BookModalContext = createContext<OpenBookModal | null>(null);

/** Opens the booking modal. Null outside the provider, so callers can fall back to a link. */
export function useBookModal() {
  return useContext(BookModalContext);
}

export function BookModalProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState<BookSource | undefined>();
  // Bumped on every open so the form starts fresh, not on last time's "Got it".
  const [session, setSession] = useState(0);

  const openModal = useCallback<OpenBookModal>((src) => {
    opener.current = document.activeElement as HTMLElement | null;
    // Render the form now, so the heading exists to take focus.
    flushSync(() => {
      setSource(src);
      setSession((n) => n + 1);
      setOpen(true);
    });
    const dialog = ref.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    dialog.querySelector<HTMLElement>("#book-modal-title")?.focus();
  }, []);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !open) return;
    // On <html>, not <body>: the mobile nav locks <body> and would unlock it under us.
    const root = document.documentElement;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = "";
    };
  }, [open]);

  const onClose = () => {
    setOpen(false);
    // The opener can be gone (the mobile menu closes as it opens the modal).
    const el = opener.current;
    if (el && el.isConnected) el.focus();
    opener.current = null;
  };

  return (
    <BookModalContext.Provider value={openModal}>
      {children}
      <dialog
        ref={ref}
        aria-labelledby="book-modal-title"
        onClose={onClose}
        // A click whose target is the <dialog> itself landed on the backdrop: the
        // panel inside fills the dialog box, so clicks within it target the panel.
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
        // The native dialog lets Tab leave for the browser's own UI; wrap instead,
        // from the × (last) back to Name (first), and the reverse on Shift+Tab.
        onKeyDown={(e) => {
          if (e.key !== "Tab") return;
          const first = e.currentTarget.querySelector<HTMLElement>('input[name="name"]');
          const last = e.currentTarget.querySelector<HTMLElement>('button[aria-label="Close"]');
          const target = e.shiftKey
            ? document.activeElement === first && last
            : document.activeElement === last && first;
          if (target) {
            e.preventDefault();
            target.focus();
          }
        }}
        className="m-0 h-full max-h-none w-full max-w-none overflow-y-auto bg-background p-0 text-foreground backdrop:bg-ink/70 sm:m-auto sm:h-fit sm:max-h-[calc(100dvh-4rem)] sm:max-w-lg sm:rounded-3xl"
      >
        {open && (
          <div className="relative min-h-full px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:p-8">
            {/* Title and close share a row so the form fits one phone screen;
                the × is placed there but sits last in the DOM. */}
            <h2
              id="book-modal-title"
              tabIndex={-1}
              className="pt-1 outline-none pr-12 text-3xl font-light tracking-tight"
            >
              Book your <span className="font-accent italic">audit</span>
            </h2>
            <p className="mt-1 text-muted sm:mt-3">
              Tell us who you are and we&rsquo;ll write back to find a time for the 45-minute
              call.
            </p>
            <div className="mt-4 sm:mt-7">
              <BookForm key={session} source={source} />
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={() => ref.current?.close()}
              className="absolute right-3 top-[max(0.75rem,calc(env(safe-area-inset-top)-0.25rem))] flex h-11 w-11 items-center justify-center rounded-md text-2xl leading-none text-muted transition-colors hover:bg-surface hover:text-foreground sm:right-6 sm:top-7"
            >
              &times;
            </button>
          </div>
        )}
      </dialog>
    </BookModalContext.Provider>
  );
}
