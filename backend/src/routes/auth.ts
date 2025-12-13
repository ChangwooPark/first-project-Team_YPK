/** routerはRequestをもらってからService階層と連携する */

import { Router, Request, Response } from "express";
import { authService } from '../services/AuthService';

const router = Router()

// Post /auth/signup Endpoint
router.post('/signup', async (req: Request, res: Response) => {
    const { userAccount, firstName, lastName, password } = req.body;

    // 1. 入力データの有効性検査
    if(!userAccount || !password){
        return res.status(400).send({ message: 'User account and password are required.' });
    }

    try{
        // 2. Service階層呼び出し
        const newUser = await authService.signup({
            userAccount,
            firstName,
            lastName,
            password
        }); 

        // 3. Success Response (passwordはセキュリティの為、除外する)
        return res.status(201).send({
            message: "User Registered Successfully",
            user : {
                id : newUser.id,
                userAccount : newUser.userAccount,
                firstName : newUser.firstName,
                lastName : newUser.lastName
            }
        })

    }catch(error: any){
        // 4. Service階層でthrowしたエラーの処理
        if(error.message === "UserAccountAlreadyExist"){
            return res.status(409).send({ // HTTP status code 409 => Client Error (4xx), Clientの要請がサーバーの現在リソース状態と矛盾していることで完了不可
                message: "User Account Already Exist."
            })
        }

        console.error('Signup Error:',error);
        return res.status(500).send({ message: "Failed to register user"})
    }
})

export default router