import {
    Entity,
    Column,
    PrimaryColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm'
import { User } from './User'
import { Workspace } from './Workspace';

@Entity()
export class WorkspaceMember{

    // 3-3. userId | Int, PK, FK(User.id)
    @PrimaryColumn()
    userId!: number;

    // 3-3. workspaceId | Int, PK, FK(Workspace.id)
    @PrimaryColumn()
    workspaceId!: number;

    // 3-3. role | ENUM, NOT NULL
    @Column({
        type: 'enum',
        enum: ['Admin', 'Member'],
        default: 'Member',
        nullable: false
    })
    role!: string;

    // ---------------------------------------------------
    // [ 関係設定: 他のテーブルから参照する部分 ]

    // 1. Userとの関係 (userId -> User.id): ManyToOne
    @ManyToOne(()=>User, (user)=>user.workspaceMembers)
    @JoinColumn({ name: "userId"})
    user!: User;

    // 2. Workspaceとの関係　
    @ManyToOne(()=>Workspace, (workspace)=>workspace.members)
    @JoinColumn({ name: "workspaceId" })
    workspace!: Workspace;

}