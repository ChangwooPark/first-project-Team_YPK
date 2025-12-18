/** User Table関連のDB通信を行う */

import { AppDataSource } from "../data-source";
import { User } from "../entity/User"

export const UserRepository = AppDataSource.getRepository(User).extend({

    // アカウント名でUserテーブルのデータを取り出す
    async findByAccount(userAccount: string){
        // return this.findOne({
        //     where : { userAccount },
        //     select : ['id', 'userAccount', 'password', 'firstName', 'lastName', 'createdAt', 'updatedAt']
        // })

        return this.createQueryBuilder("user")
            .addSelect("user.password") // password를 명시적으로 가져옴
            .where("user.userAccount = :userAccount", { userAccount })
            .getOne();

    }

    // save, create, find などはAppDataSource.getRepository(User)にすでに含まれている。
})