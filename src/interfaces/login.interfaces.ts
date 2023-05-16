import { TypeOf, z } from 'zod'
import { requestLoginSchema, responseLoginSchema } from '../schemas/login.schemas'

export type TLoginRequest = z.infer<typeof requestLoginSchema>

export type TLoginResponse = z.infer<typeof responseLoginSchema>