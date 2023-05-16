import { QueryConfig, QueryResult } from "pg";
import "dotenv/config"
import { client } from "../../database";
import { TUserReponse } from "../../interfaces/users.interfaces";




const deleteUsersService = async (id: number) =>{

    
    const queryString = `
        UPDATE
            users
        SET
            active = false
        WHERE
            id = $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    }

    const queryResult: QueryResult<TUserReponse> = await client.query(queryConfig)


    return queryResult.rows[0]



}

export default deleteUsersService