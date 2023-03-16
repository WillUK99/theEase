import { TRPCError } from '@trpc/server';

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

import { serviceSchema } from "../../../constants/schemas/service";

export const serviceRouter = createTRPCRouter({
  addService: protectedProcedure
    .input(serviceSchema)
    .mutation(async ({ ctx, input }) => {
      if (ctx?.session?.user.role !== "SUPER") throw new TRPCError({ code: 'UNAUTHORIZED', message: "You don't have permission to add a service" })

      const { serviceId } = input
      try {
        const found = serviceId && (await ctx.prisma.service.findUnique({
          where: {
            serviceId,
          }
        }))

        if (found) {
          throw new TRPCError({
            code: 'BAD_USER_INPUT',
            message: 'Service already exists'
          })
        }

        const service = await ctx.prisma.service.create({
          data: input
        })

        return service
      } catch (error) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: error.message
        })
      }
    }),
  // addAddon:
});
