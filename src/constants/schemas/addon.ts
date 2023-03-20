import z from 'zod'

export const addonSchema = z.object({
  name: z.string().min(1),
  price: z.number().min(1),
  addonId: z.string().min(1),
  duration: z.number().min(1),
  service: z.string().min(1),
})

export type Addon = z.TypeOf<typeof addonSchema>
