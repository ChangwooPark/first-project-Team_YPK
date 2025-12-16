import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { Workspace } from './Workspace';
import { WorkspaceMember } from './WorkspaceMember';
import { Ticket } from './Ticket';

// @Entity() デコレーターはこのクラスがDBの 'user' テーブルと繋ぐことを意味
@Entity()
export class User {
    // 3-1. id | PK, Auto Increament
    // @PrimaryGeneratedColumn: Primary Key、 値が自動でIncreamentする
    @PrimaryGeneratedColumn()
    id!: number;

    // 3-1. userAccount | VARCHAR(255), NOT NULL, UNIQUE
    // アカウントは必須入力、重複不可
    @Column({ 
        length: 255,
        nullable:false, 
        unique:true 
    })
    userAccount!: string;

    // 3-1 password | VARCHAR(255),	NOT NULL
    @Column({
        length: 255,
        nullable: false,
        select: false
    })
    password!: string;

    // 3-1. firstName | VARCHAR(100), NULLABLE
    @Column({ 
        type : "varchar",
        length: 100,
        nullable:true
     })
    firstName!: string | null;

    // 3-1. lastName | VARCHAR(100), NULLABLE
    @Column({ 
        type : "varchar",
        length: 100,
        nullable:true
     })
    lastName!: string | null;

    // 3-1. createdAt | DATETIME, NOT NULL, Default CURRENT_TIMESTAMP
    @CreateDateColumn()
    createdAt!: Date;

    // 3-2. updatedAt | DATETIME, NOT NULL, Default CURRENT_TIMESTAMP
    @UpdateDateColumn()
    updatedAt!: Date;

    // ---------------------------------------------------
    // [ 関係設定: 他のテーブルから参照する部分 ]

    // // 1. Userが作成したWorkspace (Workspace.creatorId)
    @OneToMany(()=>Workspace, (workspace)=>workspace.creator)
    createdWorkspaces!: Workspace[];

    // 2. UserがMemberとして所属しているWorkspace (WorkspaceMember テーブルで N:M 関係設定)
    @OneToMany(()=>WorkspaceMember, (member) =>member.user)
    workspaceMembers!: WorkspaceMember[];

    // 3. Userが作成したTicket (Ticket.creatorId)
    @OneToMany(()=>Ticket, (ticket)=>ticket.creator)
    createdTickets!: Ticket[];

    // 4. Userが担当者となっているTicket (Ticket.assigneeId)
    @OneToMany(()=>Ticket, (ticket)=>ticket.assignee)
    assignedTickets!: Ticket[];
}