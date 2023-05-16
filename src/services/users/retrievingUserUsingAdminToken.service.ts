import { QueryConfig, QueryResult } from "pg";
import "dotenv/config"
import { client } from "../../database";
import { TUserReponse } from "../../interfaces/users.interfaces";




const retrievingUserUsingAdminTokenSevice = async (id: number) =>{
 
    const queryString = `
        UPDATE
            users
        SET
            active = true
        WHERE
            id = $1;
    `


    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    }

   
    const queryResult: QueryResult<TUserReponse> = await client.query(queryConfig)

    const queryStringSelect = `
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

    const queryConfigSelect: QueryConfig = {
        text: queryStringSelect,
        values: [id],
    }

    const queryResultSelect: QueryResult<TUserReponse> = await client.query(queryConfigSelect)

    return queryResultSelect.rows[0]



}

export default retrievingUserUsingAdminTokenSevice