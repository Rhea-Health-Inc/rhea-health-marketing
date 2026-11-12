import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  // When the site is built for a subpath host (GitHub Pages), Vite's BASE_URL
  // carries the prefix (e.g. "/rhea-health-marketing/"); the router must match
  // it so links and navigation stay under the subpath. Root deploys keep "/".
  const basepath = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    basepath,
  });

  return router;
};
