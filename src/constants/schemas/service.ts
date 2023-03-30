import z from 'zod'

export const serviceSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  price: z.number().min(1),
  serviceId: z.string().min(1),
  description: z.string().min(1),
  whatToExpect: z.string().min(1),
  instructions: z.string().min(1),
  duration: z.number().min(1),
  isActive: z.boolean(),
  isBestSeller: z.boolean(),
  isFeatured: z.boolean(),
})

export type Service = z.TypeOf<typeof serviceSchema>
