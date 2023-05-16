

import { z } from 'zod'

const userSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(4),
    admin: z.optional(z.boolean()),
    active: z.boolean()
})

const requestUserSchema = userSchema.omit({id: true, active: true})

const requestUserUpdatePatchSchema = userSchema.omit({id: true, active: true, admin: true})




const responseUserSchema = userSchema.omit({ password: true})

// const userSchemaMaisDados =userSchema.extend({
//     dadoAMais: z.string()
// })


//transforma os dados em opcionais
const updateUserPatchSchema = requestUserUpdatePatchSchema.partial()



export { userSchema, requestUserSchema, responseUserSchema, updateUserPatchSchema}