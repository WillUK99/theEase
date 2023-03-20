import { TRPCError } from '@trpc/server';

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

import { addonSchema } from "../../../constants/schemas/addon";

export const addonRouter = createTRPCRouter({
  add: protectedProcedure
    .input(addonSchema)
    .mutation(async ({ ctx, input }) => {
      if (ctx?.session?.user.role !== "SUPER") throw new TRPCError({ code: 'UNAUTHORIZED', message: "You don't have permission to create an addon" })

      const { addonId } = input

      const found = addonId && (await ctx.prisma.addon.findUnique({
        where: {
          addonId,
        }
      }))

      if (found) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Addon already exists with id: ${addonId}`
        })
      }

      const addon = await ctx.prisma.addon.create({
        data: {
          ...input,
          service: {
            connect: {
              id: input.service,
            }
          }
        }
      })

      return addon
    }),
});
