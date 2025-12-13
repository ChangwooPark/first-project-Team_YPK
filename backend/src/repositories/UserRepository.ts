/** User Table関連のDB通信を行う */

import { AppDataSource } from "../data-source";
import { User } from "../entity/User"

export const UserRepository = AppDataSource.getRepository(User).extend({

    // アカウント名でUserテーブルのデータを取り出す
    findByAccount(userAccount: string){
        return this.findOneBy({ userAccount })
    }

    // save, create, find などはAppDataSource.getRepository(User)にすでに含まれている。
})