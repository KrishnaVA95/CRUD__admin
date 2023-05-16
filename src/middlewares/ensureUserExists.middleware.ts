import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { TUser } from "../interfaces/users.interfaces";
import { AppError } from "../error";
import { client } from "../database";


const ensureUserExistsMiddleware = async(req: Request, res:Response, next: NextFunction): Promise<Response | void> =>{
    const userId = parseInt(req.params.id)

    // if(req.route.path === '/users/profile' && req.method === 'GET'){
    //     id = 
    // }

    const queryString: string = `
    SELECT 
        *
    FROM
        users
    WHERE
        id= $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId],
    }

    const queryResult: QueryResult<TUser> = await client.query(queryConfig)

    if(queryResult.rowCount === 0){
        throw new AppError('User not found', 404 )
    }

    res.locals.users = queryResult.rows[0]
    return next()
}

export default ensureUserExistsMiddleware