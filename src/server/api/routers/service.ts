import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const serviceRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.service.findMany();
  }),
  addService: publicProcedure
    .input(serviceSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.service.create({ data: input });
    }
  getSecretMessage: protectedProcedure.query(() => {
      return "you can now see this secret message!";
    }),
});
