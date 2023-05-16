import { z } from 'zod'

export const requestLoginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export const responseLoginSchema = z.object({
    token: z.string()
})

