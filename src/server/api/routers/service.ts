import { TRPCError } from '@trpc/server';

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

import { serviceSchema } from "../../../constants/schemas/service";

export const serviceRouter = createTRPCRouter({
  getAll: publicProcedure
    .query(({ ctx }) => {
      return ctx.prisma.service.findMany()
    }),
  add: protectedProcedure
    .input(serviceSchema)
    .mutation(async ({ ctx, input }) => {
      if (ctx?.session?.user.role !== "SUPER") throw new TRPCError({ code: 'UNAUTHORIZED', message: "You don't have permission to create a service" })

      const { serviceId } = input

      const found = serviceId && (await ctx.prisma.service.findUnique({
        where: {
          serviceId,
        }
      }))

      if (found) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Service already exists with id: ${serviceId}`
        })
      }

      const service = await ctx.prisma.service.create({
        data: {
          ...input
        }
      })

      return service
    }),
});
