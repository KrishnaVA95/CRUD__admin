import  format  from "pg-format";
import { TUserReponse, TUserUpdateRequest } from "../../interfaces/users.interfaces";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";


const updateUsersServices = async (userId: number, userData: TUserUpdateRequest): Promise<TUserReponse> =>{

    const queryString: string = format(`
        UPDATE users
            SET(%I) = ROW(%L)
        WHERE
            id=$1
        RETURNING
            "id", "name", "email", "admin", "active";
    `,
    Object.keys(userData),
    Object.values(userData)
    )

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId]
    }

    const queryResult: QueryResult<TUserReponse> = await client.query(queryConfig)

    return queryResult.rows[0]
}

export default updateUsersServices