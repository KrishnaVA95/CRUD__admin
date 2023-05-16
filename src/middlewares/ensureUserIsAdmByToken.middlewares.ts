import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";


export const ensureUserIsAdmByTokenMiddlewares = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> =>{
    const  isadm: boolean  = res.locals.isadm

    if(isadm === false){
        throw new AppError("Insufficient Permission", 403)
    }

    return next()
}