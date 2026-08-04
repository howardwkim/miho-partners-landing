import type { AuthorId } from "./types";

export type Author = {
  name: string;
  /**
   * Deliberately just the firm, not a résumé line. The face and the name do the
   * trust work; a credential under every article reads as selling rather than
   * writing. Anyone who wants the background follows the nav to the homepage.
   */
  affiliation: string;
  photo: string;
  email: string;
};

export const AUTHORS: Record<AuthorId, Author> = {
  mike: {
    name: "Mike Grabham",
    affiliation: "MiHo Partners",
    photo: "/founders/mike-closeup.jpg",
    email: "mike@mihopartners.com",
  },
  howard: {
    name: "Howard Kim",
    affiliation: "MiHo Partners",
    photo: "/founders/howard.jpeg",
    email: "howard@mihopartners.com",
  },
};

export const AUTHOR_IDS = Object.keys(AUTHORS) as AuthorId[];
