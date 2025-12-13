/**　会員登録処理のルールを設定 */

import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../entity/User';


// Sing in に必要なデータタイプを設定, UserテーブルのidはDBで自動生成
interface SignupData extends Omit<User, 'id'> {}

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
            ...data,
            password: hashedPassword,
        })

        // 4. DBに格納
        const savedUser = await UserRepository.save(newUser)

        return savedUser;
    }

    // login logic
}

export const authService = new AuthService(); 