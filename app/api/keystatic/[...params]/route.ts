import { makeRouteHandler } from "@keystatic/next/route-handler";

import config from "../../../../keystatic.config";

type RouteHandler = (request: Request) => Promise<Response>;

const SECRETS = [
  "KEYSTATIC_GITHUB_CLIENT_ID",
  "KEYSTATIC_GITHUB_CLIENT_SECRET",
  "KEYSTATIC_SECRET",
] as const;

/**
 * Keystatic builds its handler eagerly, and throws when the GitHub storage
 * secrets are absent and NODE_ENV is not "development" — which is what
 * `next build` is. Left alone, a contributor with no .env cannot build the site
 * at all: a missing CMS secret fails the whole public build.
 *
 * So the editor route degrades and the site still builds. Only the missing-
 * secrets case is swallowed, and only after confirming that is the actual
 * cause — any other failure still breaks the build loudly. `next dev` never
 * reaches here, so Keystatic's own /keystatic/setup onboarding is untouched.
 */
let GET: RouteHandler;
let POST: RouteHandler;

try {
  ({ GET, POST } = makeRouteHandler({ config }));
} catch (error) {
  const missing = SECRETS.filter((name) => !process.env[name]);
  if (missing.length === 0) throw error;

  console.warn(
    `[keystatic] ${missing.join(", ")} not set — /api/keystatic will answer 503. The public site is unaffected.`,
  );

  const unavailable: RouteHandler = async () =>
    new Response("Keystatic editor unavailable — secrets not configured", {
      status: 503,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  GET = unavailable;
  POST = unavailable;
}

export { GET, POST };
