import z from 'zod'

export const serviceSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  price: z.number().min(1),
  serviceId: z.string().min(1),
  description: z.string().min(1),
  whatToExpect: z.string().optional(),
  instructions: z.string().optional(),
  duration: z.number().min(1),
  isActive: z.boolean().optional(),
  isBestSeller: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
})

export type Service = z.TypeOf<typeof serviceSchema>
