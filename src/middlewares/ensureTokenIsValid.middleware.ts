import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import jwt from "jsonwebtoken"



export const ensureTokenIsValidMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> =>{

    //captura do token
    let token = req.headers.authorization
    //token exemple ==> "Bearing usbd91wlemsm9a$lkdnmajs7çmdfsi%$#..."
    //( garanta que token exista "IF")_
    //split método para string 
    //split ==> o (" ") separa  [Bearing, token]
    //split exemple ==> ["Bearing", "usbd91wlemsm9a$lkdnmajs7çmdfsi%$#..."]
    //posição [1] ==> segundo elemento do array = token
    if(!token){
        throw new AppError("Missing Bearer Token", 401)
    }

    token = token.split(" ")[1]

    //comparar se o token é valido
    jwt.verify(token, process.env.SECRET_KEY! , (err: any, decoded: any)=>{
        if(err){
           throw new AppError(err.message, 401)
        }
        res.locals.isadm = decoded.admin
    } )

    return next()
        
}

export default ensureTokenIsValidMiddleware