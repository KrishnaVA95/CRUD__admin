import { QueryResult } from "pg";
import "dotenv/config"
import { TUserReponse } from "../../interfaces/users.interfaces";
import { client } from "../../database";




const listUsersService = async (): Promise<Array<TUserReponse>> =>{

    const queryString: string = `
        SELECT 
            "id",
            "name",
            "email",
            "admin",
            "active"
        FROM
            users;
    `

    const queryResult: QueryResult<TUserReponse> = await client.query(queryString)

    return queryResult.rows
}

export default listUsersService