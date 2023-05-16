import { QueryConfig, QueryResult } from "pg";
import { TUser, TUserReponse } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { AppError } from "../../error";
import { responseUserSchema } from "../../schemas/users.schemas";


const retrieveUserService = async (user: TUser): Promise<TUserReponse> =>{
    const userResponse = responseUserSchema.parse(user)
    return userResponse
}

export default retrieveUserService