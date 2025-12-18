/**　会員登録処理のルールを設定 */

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../entity/User';

// .env ファイルを読み取るためのdotenv設定
import * as dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '1h'; //token有効時間 

// Clientから必ず送信すべきのField: userAccount, password
// 選択的に送信するField: firstName, lastName
export interface SignupData {
    userAccount : string;
    password : string;
    firstName : string | null;
    lastName : string | null;
}

// 暗号化のレベルを設定（高いほど安全だがhash処理に時間がかかる）
const SALT_ROUNDS = 10

export class AuthService {
    /**
     * 新しいユーザーを登録し、DBに格納
     * @param data 会員登録情報 (userAccount, password等)
     * @return 保存されたUser Obj 
     */
    public async signup(data: SignupData): Promise<User> {
        
        // 1. account重複確認
        const existingUser = await UserRepository.findByAccount(data.userAccount); // Userテーブルからデータ取得
        if(existingUser){
            // Accountがすでにある場合、throw errorでControllerで409応答をするようにする
            throw new Error('UserAccountAlreadyExist');
        }

        // 2. password hash (重要)
        const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS)

        // 3. TypeORMを利用して新しいユーザーObj生成
        const newUser = UserRepository.create({
            userAccount: data.userAccount,
            password: hashedPassword,
            firstName: data.firstName || null,
            lastName: data.lastName || null
        })

        // 4. DBに格納
        const savedUser = await UserRepository.save(newUser)

        return savedUser;
    }

    /**
     * [AU-02] Userログイン認証 及び JWTトークン発給
     * @param userAccount ログインアカウント (Email)
     * @param password ユーザーが入力したPassword
     * @returns JWTトークンとユーザーObj
     */
    public async login(userAccount: string, password: string): Promise<{token: string, user: User}> {
        
        if(!JWT_SECRET){
            throw new Error('InvalidJWTSECRET')
        }
        
        // 1. UserをDBから検出
        const user = await UserRepository.findByAccount(userAccount)

        if(!user){
            // userAccountがDBに無い場合、”IDまたはPassword不一致”として応答
            throw new Error('InvalidCredentials');
        }

        // 2. Password比較
        // 保存されてるHash Passwordと入力されたPasswordを比較
        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            throw new Error('InvalidCredentials')
        }

        // 3. JWTトークン生成
        const tokenPayload = {
            userId: user.id,
            userAccount: user.userAccount
            // 必要によってロールなどの情報など追加可能
        }

        const token = jwt.sign(
            tokenPayload,
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN}
        )

        return {token, user}
    }
}

export const authService = new AuthService(); 