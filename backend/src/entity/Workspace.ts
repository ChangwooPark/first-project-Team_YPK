import { 
    Entity, 
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    OneToMany
} from 'typeorm'
import { User } from './User'; 
import { WorkspaceMember } from './WorkspaceMember';
import { Ticket } from './Ticket';

@Entity()
export class Workspace {

    // id | PK, Auto Increament
    @PrimaryGeneratedColumn()
    id!: number;

    // name | VARCHAR(255),	NOT NULL
    @Column({
        length: 255,
        nullable: false
    })
    name!: string;

    // description | TEXT, NULABLE
    @Column({
        type: "text",
        nullable: true
    })
    description!: string | null;

    // creatorId | Int, FK(User.id), NOT NULL
    @Column({ nullable: false })
    creatorId!: number;

    // createdAt | DATETIME, NOT NULL, Default CURRENT_TIMESTAMP
    @CreateDateColumn()
    createdAt!: Date;

    // updatedAt | DATETIME, NOT NULL, Default CURRENT_TIMESTAMP
    @UpdateDateColumn()
    updatedAt!: Date;

    // ---------------------------------------------------
    // [ 関係設定: 他のテーブルから参照する部分 ]

    // 1. Workspace Creator (creatorId -> User.id): ManyToOne
    // Workspaceは一人のUserによって作成される。
    @ManyToOne(()=>User, (user)=>user.createdWorkspaces)
    @JoinColumn({ name: "creatorId"})
    creator!: User;

    // 2. Workspace Member (WorkspaceMemberテーブルによる N:M　連結)
    @OneToMany(()=>WorkspaceMember, (member)=> member.workspace)
    members!: WorkspaceMember[]

    // 3. TicketStatusによるTicketの進行状況が変わる ()
    @OneToMany(()=>Ticket, (ticket)=>ticket.workspace)
    tickets!:Ticket[];
}
