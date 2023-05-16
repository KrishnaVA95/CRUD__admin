import format from "pg-format"
import { TUserReponse, TUserRequest } from "../../interfaces/users.interfaces"
import { QueryResult } from "pg"
import { client } from "../../database"
import { responseUserSchema } from '../../schemas/users.schemas'
import * as bcrypt from 'bcryptjs'

const createUsersService = async (userData: TUserRequest): Promise<TUserReponse> =>{

    userData.password = await bcrypt.hash(userData.password, 10)
    
    const queryString: string = format(
        `
            INSERT INTO
                users(%I)
            VALUES
                (%L)
            RETURNING
                *;
        `,
        Object.keys(userData),
        Object.values(userData)
    )

    const queryResult: QueryResult<TUserReponse> = await client.query(queryString)

    const newUser = responseUserSchema.parse(queryResult.rows[0])

    return newUser
}

export default createUsersService
