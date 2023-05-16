import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { AppError } from "../error";


export const checkUserTypeByTokenMiddlewares = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> =>{
    let token: string  = req.headers.authorization!
    token = token.split(" ")[1]

    const decoded = jwt.verify(token, process.env.SECRET_KEY!)
    const idUserToken  = decoded.sub


    res.locals.idUserToken = idUserToken

    const idUserToBeUpdate = req.params.id
    const  isadm: boolean  = res.locals.isadm

    if(isadm ===  true){
        return next()
    }


    if(idUserToken === idUserToBeUpdate){
        return next()
    }

    throw new AppError("Insufficient Permission", 403)

        
}