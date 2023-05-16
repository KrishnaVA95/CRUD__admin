import { Request, Response } from 'express'
import createUsersService from '../services/users/createUsers.service'
import { TUserReponse, TUserRequest, TUserUpdateRequest } from '../interfaces/users.interfaces'
import listUsersService from '../services/users/listUsers.service'
import retrieveUserService from '../services/users/retrieveUsers.service'
import updateUsersServices from '../services/users/updateUsers.service'
import deleteUsersService from '../services/users/deleteUsers.service'
import { getLoggedInUserService } from '../services/users/getLoggedInUser.service'
import jwt from "jsonwebtoken"
import retrievingUserUsingAdminTokenSevice from '../services/users/retrievingUserUsingAdminToken.service'


const createUsersController = async (req: Request, res: Response): Promise<Response>  =>{
    const userData: TUserRequest = req.body
    const newUser: TUserReponse = await createUsersService(userData)
    return res.status(201).json(newUser) 
}


const listUsersController = async (req: Request, res: Response): Promise<Response>  =>{
    const users = await listUsersService()
    return res.status(200).json(users) 
}

const retrieveUsersController = async (req: Request, res: Response): Promise<Response>  =>{
    const user = await retrieveUserService(res.locals.user)
    return res.status(200).json(user) 
}

const getLoggedInUserController = async (req: Request, res: Response): Promise<Response>  =>{
    let token = req.headers.authorization
    token = token!.split(" ")[1]
    const decoded = jwt.verify(token, process.env.SECRET_KEY!)
    const idUserToken  = decoded.sub
    const user = await getLoggedInUserService(Number(idUserToken))
    return res.status(200).json(user) 
}


const updateUsersController = async (req: Request, res: Response): Promise<Response>  =>{
    const userId: number = parseInt(req.params.id)
    const userData: TUserUpdateRequest = req.body
    const updateUser = await updateUsersServices(userId, userData)
    return res.status(200).json(updateUser) 
}

const deleteUsersController = async (req: Request, res: Response): Promise<Response>  =>{
    const userId: number = parseInt(req.params.id)
    const deleteUser = await deleteUsersService(userId)
    return res.status(204).json(deleteUser) 
}


const retrievingUserUsingAdminTokenController = async (req: Request, res: Response): Promise<Response>  =>{
    const userId: number = parseInt(req.params.id)
    const updateUser = await retrievingUserUsingAdminTokenSevice(userId)
    return res.status(200).json(updateUser) 
}




export { createUsersController, listUsersController, retrieveUsersController, updateUsersController, deleteUsersController, getLoggedInUserController, retrievingUserUsingAdminTokenController}