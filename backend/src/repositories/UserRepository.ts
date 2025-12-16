/** User Table関連のDB通信を行う */

import { AppDataSource } from "../data-source";
import { User } from "../entity/User"

export const UserRepository = AppDataSource.getRepository(User).extend({

    // アカウント名でUserテーブルのデータを取り出す
    async findByAccount(userAccount: string){
        return this.findOne({
            where : { userAccount },
            select : ['id', 'userAccount', 'password', 'firstName', 'lastName', 'createdAt', 'updatedAt']
        })
    }

    // save, create, find などはAppDataSource.getRepository(User)にすでに含まれている。
})