import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../error";


export const ensureEmailNotExistsMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> =>{
  
        const { email } = req.body
        const queryString: string = `
            SELECT
                *
            FROM
                users
            WHERE
                email = $1
        `
    
        const queryConfig: QueryConfig = {
            text: queryString,
            values: [email]
        }
    
        const queryResult: QueryResult = await client.query(queryConfig)
    
        if(queryResult.rowCount !== 0 ){
            throw new AppError('E-mail already registered', 409)
        }
    
        return next()
        
}


