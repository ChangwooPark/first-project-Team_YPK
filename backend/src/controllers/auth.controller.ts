import { Request, Response } from 'express';
import { authService } from '../services/AuthService';
import { User } from '../entity/User';

/**
 * [AU-02] ログイン処理
 * Post /auth/login
 */
export const login = async ( req: Request, res: Response) => {
    const { userAccount, password } = req.body;

    if(!userAccount || !password){
        return res.status(400).json({ message: "IDとPasswordを入力してください。"});
    }

    try{
        // 1. AuthServiceのログインロジック呼び出し
        const { token, user } = await authService.login(userAccount, password);

        // 2. 応答（Success）
        return res.status(200).json({
            message: "ログイン成功",
            token: token,
            user: {
                id: user.id,
                userAccount: user.userAccount,
                firstName: user.firstName,
                lastName: user.lastName
            }
        })


    }catch(error: any){
        // 3. Service階層から発生したエラーの処理
        if(error.message == "InvalidCredentials"){
            return res.status(401).json({ message: "IDまたはPasswordが不一致しています。"})
        }
        else if(error.message == "InvalidJWTSECRET"){
            return res.status(500).json({ message: "ログイン処理中エラーが発生しました。"})
        }

        console.error('Login Error: ', error)
        return res.status(500).json({ message: "ログイン処理中エラーが発生しました。" })
    }
}