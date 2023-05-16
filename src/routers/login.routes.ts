import {  Router } from 'express'
import { createSessionController } from '../controllers/login.controllers';
import ensureBodyIsValidMiddlewares from '../middlewares/esureBodyValid.middleware';
import { requestLoginSchema } from '../schemas/login.schemas';


const loginRouter: Router = Router();

loginRouter.post('', 
ensureBodyIsValidMiddlewares(requestLoginSchema),
createSessionController)

export default loginRouter