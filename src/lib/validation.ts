
import {z} from 'zod'

export const jobFilterSchema = z.object({
    q:z.string().optional(),
    type:z.string().optional(),
    location:z.string().optional(),
    remote:z.coerce.boolean().default(false)
})

export type JobFilterValues = z.infer<typeof jobFilterSchema>