import { makeRouteHandler } from "@keystatic/next/route-handler";

import config from "../../../../keystatic.config";

// Handles the GitHub sign-in exchange and the read/write calls the editor makes.
export const { POST, GET } = makeRouteHandler({ config });
