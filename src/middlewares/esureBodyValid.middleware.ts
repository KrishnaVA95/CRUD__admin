import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";


const ensureBodyIsValidMiddlewares = (schema: ZodTypeAny) => (
    req: Request,
    res: Response,
    next: NextFunction
) =>{

    const validateBody = schema.parse(req.body)

    req.body =  validateBody

    return next()
}

export default ensureBodyIsValidMiddlewares