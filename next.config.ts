import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The editor at /keystatic is entirely client-rendered, so it needs its JS to
  // actually load. Next blocks /_next/* dev requests from hosts it doesn't
  // recognise, which silently produces a blank page rather than an error.
  allowedDevOrigins: ["127.0.0.1", "localhost", "192.168.0.118"],

  async redirects() {
    // This section was called Insights until 2026-08-13. Anything already
    // linked or indexed under the old path keeps working.
    return [
      { source: "/insights", destination: "/blog", permanent: true },
      { source: "/insights/:slug", destination: "/blog/:slug", permanent: true },
    ];
  },
};

// No MDX loader, and no .mdx in pageExtensions: article bodies are compiled
// from source at build time in lib/blog/posts.ts rather than imported as
// modules. That is deliberate. A dynamic import of a path built from a slug
// forces the bundler to scan content/blog up front, so an empty directory fails
// the whole build — with an error naming posts.ts rather than the missing
// content. Compiling from disk lets an empty directory mean "no posts yet".
export default nextConfig;
