import { createTRPCRouter } from "~/server/api/trpc";
import { serviceRouter } from "~/server/api/routers/service";
import { addonRouter } from "./routers/addon";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  service: serviceRouter,
  addon: addonRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
