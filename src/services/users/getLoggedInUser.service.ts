import { QueryConfig, QueryResult } from "pg"
import { client } from "../../database"
import { TUser } from "../../interfaces/users.interfaces"
import format from "pg-format"


export const getLoggedInUserService = async (id: number) =>{


    const queryString: string = `
    SELECT
        "id",
        "name",
        "email",
        "admin",
        "active"
    FROM
        users
    WHERE
        id = $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }
    
    const queryResult: QueryResult<TUser> = await client.query(queryConfig)
    
    return  queryResult.rows[0]
}

