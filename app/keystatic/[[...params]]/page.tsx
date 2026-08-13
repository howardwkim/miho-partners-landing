"use client";

import { makePage } from "@keystatic/next/ui/app";

import config from "../../../keystatic.config";

// The editor is a single client-rendered app; the optional catch-all lets it
// own every path under /keystatic and do its own routing.
export default makePage(config);
