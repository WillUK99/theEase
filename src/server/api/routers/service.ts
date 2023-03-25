import { UserRoleEnum } from './../../../types/user.types';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import {
  createTRPCRouter, protectedProcedure, publicProcedure
} from "~/server/api/trpc";

import { serviceSchema } from "../../../constants/schemas/service";

export const serviceRouter = createTRPCRouter({
  getAll: publicProcedure
    .query(({ ctx }) => {
      return ctx.prisma.service.findMany()
    }),
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input

      const service = await ctx.prisma.service.findUnique({
        where: {
          id
        }
      })

      if (!service) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Service not found with id: ${id}`
        })
      }

      return service
    }),
  add: protectedProcedure
    .input(serviceSchema)
    .mutation(async ({ ctx, input }) => {
      if (ctx?.session?.user.role !== UserRoleEnum.SUPER) throw new TRPCError({ code: 'UNAUTHORIZED', message: "You don't have permission to create a service" })

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
  update: protectedProcedure
    .input(serviceSchema)
    .mutation(async ({ ctx, input }) => {
      if (ctx?.session?.user.role !== UserRoleEnum.SUPER) throw new TRPCError({ code: 'UNAUTHORIZED', message: "You don't have permission to update a service" })

      const { serviceId } = input

      const found = serviceId && (await ctx.prisma.service.findUnique({
        where: {
          serviceId,
        }
      }))

      if (!found) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Service not found with id: ${serviceId}`
        })
      }

      const service = await ctx.prisma.service.update({
        where: {
          serviceId
        },
        data: {
          ...input
        }
      })

      return service
    }),
});
