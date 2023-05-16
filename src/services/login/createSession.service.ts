
import { TLoginRequest, TLoginResponse } from '../../interfaces/login.interfaces'
import  format  from 'pg-format'
import { QueryResult } from 'pg'
import * as bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import "dotenv/config"
import { client } from '../../database'
import { TUser } from '../../interfaces/users.interfaces'
import { AppError } from '../../error'


const createSessionService  = async (payload: TLoginRequest): Promise<TLoginResponse>  =>{
    const queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE
            email = %L;
    `
    const queryFormat: string = format(queryString, payload.email)

    const queryResult: QueryResult<TUser> = await client.query(queryFormat)

    const user = queryResult.rows[0]


    if(queryResult.rowCount === 0 ){
        throw new AppError("Wrong email/password", 401)
    }

    const comparePassword: boolean = await bcrypt.compare(
        payload.password, 
        user.password
    ) 

    if(comparePassword === false){
        throw new AppError("Wrong email/password", 401)
    }


    if(user.active === false){
        throw new AppError("Wrong email/password", 401)
    }

    const token: string =  jwt.sign(
    {
        admin: user.admin,
        active: user.active
    },
    process.env.SECRET_KEY!,
    {
        expiresIn: '1d',
        subject: user.id.toString()
    }
    )

    return { token }

}

export default createSessionService