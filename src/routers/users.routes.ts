import {  Router } from 'express'
import { createUsersController, deleteUsersController, getLoggedInUserController, listUsersController, retrievingUserUsingAdminTokenController, updateUsersController } from '../controllers/users.controllers'
import { ensureEmailNotExistsMiddleware } from '../middlewares/ensureEmailNotExists.middlewares'
import ensureUserExistsMiddleware from '../middlewares/ensureUserExists.middleware'
import ensureBodyIsValidMiddlewares from '../middlewares/esureBodyValid.middleware'
import { requestUserSchema, updateUserPatchSchema } from '../schemas/users.schemas'
import ensureTokenIsValidMiddleware from '../middlewares/ensureTokenIsValid.middleware'
import { ensureUserIsAdmByTokenMiddlewares } from '../middlewares/ensureUserIsAdmByToken.middlewares'
import { checkUserTypeByTokenMiddlewares } from '../middlewares/checkUserType.middlewares'
import { ensureUserIsActiveMiddleware } from '../middlewares/ensureUserIsActive.middlewares'

const userRoutes: Router = Router()


userRoutes.post('', 
ensureEmailNotExistsMiddleware, 
ensureBodyIsValidMiddlewares(requestUserSchema),
createUsersController)

userRoutes.get('', 
ensureTokenIsValidMiddleware,
ensureUserIsAdmByTokenMiddlewares,
listUsersController)


userRoutes.get('/profile',
ensureTokenIsValidMiddleware,
getLoggedInUserController
)

userRoutes.patch('/:id',
ensureTokenIsValidMiddleware,
ensureBodyIsValidMiddlewares(updateUserPatchSchema),
ensureUserExistsMiddleware,
checkUserTypeByTokenMiddlewares,
ensureEmailNotExistsMiddleware,
updateUsersController)


userRoutes.put('/:id/recover',
ensureTokenIsValidMiddleware,
ensureUserIsAdmByTokenMiddlewares,
ensureUserExistsMiddleware,
ensureUserIsActiveMiddleware,
retrievingUserUsingAdminTokenController
)

userRoutes.delete('/:id',
ensureTokenIsValidMiddleware,
checkUserTypeByTokenMiddlewares,
ensureUserExistsMiddleware,
deleteUsersController)

export default userRoutes



