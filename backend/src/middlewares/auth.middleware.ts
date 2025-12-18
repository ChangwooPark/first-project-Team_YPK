import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken'


// Request Objに利用者の情報を含めるためにインターネットを拡張
// ExpressのRequestは基本的に'userId'フィルドを持っていない
interface AuthenticatedRequest extends Request {
    userId?: number
}

interface myTokenPayload extends jwt.JwtPayload {
    userId?: number;
    userAccount?: string;
}

/**
 * JWTトークン検証し, Request OBJにuserIdを追加するMiddleware
 */
export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    // 1. Authorization Headerからトークン取得
    const authHeader = req.headers.authorization

    // Headerがない、またはトークン形式の間違い
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({ message: "認証トークンが提供されてない、または形式が間違ってます。"})
    }

    // "Bearer " 文字列を除外した実際のトークンだけ取得
    const token = authHeader.split(" ")[1];

    // JWT Secretを.envから取得
    const jwtSecret = process.env.JWT_SECRET;
    if(!jwtSecret){
        console.error("JWT_SECRETの環境変数が設定されてないです。")
        return res.status(500).json({ message: "ログイン処理中エラーが発生しました。"})
    }

    try{

        // トークン検証
        // トークンPayloadをDecode (jwt.verify)
        const decoded = jwt.verify(token, jwtSecret) as myTokenPayload;

        // 3. userId 取得及びRequest OBJに格納
        if(decoded.userId){
            req.userId = decoded.userId;
            next() // 検証完了、次のMWまたはControllerに進む
        }else{
            return res.status(401).json({ message: "トークン情報に必要な情報が抜けています。: userId"})
        }

    } catch(error){

        // トークン有効期限切れ
        if(error instanceof jwt.TokenExpiredError){
            return res.status(401).json({ message: "認証トークンの有効期限満了です。"})
        }

        // トークンが有効ではない
        if(error instanceof jwt.JsonWebTokenError){
            return res.status(401).json({ message: "有効してない認証トークンです"})
        }

        // その他エラー
        console.error('JWT token 検証中エラー発生 :', error)
        return res.status(500).json({ message: "認証サーバーエラー"})
    }
}
