import { z } from 'zod'
import { requestUserSchema, responseUserSchema, updateUserPatchSchema, userSchema } from '../schemas/users.schemas';

type TUser = z.infer<typeof userSchema>

type TUserRequest = z.infer<typeof requestUserSchema>

type TUserReponse = z.infer<typeof responseUserSchema>

type TUserUpdateRequest = z.infer<typeof updateUserPatchSchema>

// type TUser = {
//     id: number;
//     name: string;
//     email: string;
//     password: string;
//     admin: boolean;
//     active: boolean;
// }

// type TUserRequest = Omit<TUser, 'id'>

// type TUserReponse = Omit<TUser, 'password'>


export { TUser, TUserRequest, TUserReponse, TUserUpdateRequest  }