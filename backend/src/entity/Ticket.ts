import { 
    Column,
    CreateDateColumn,
    Entity, 
    JoinColumn, 
    ManyToOne, 
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'
import { User } from './User';
import { Workspace } from './Workspace';
import { TicketStatus } from './TicketStatus';

@Entity()
export class Ticket{

    // 3-5. id | Int, PK, Auto Increament
    @PrimaryGeneratedColumn()
    id!: number;

    // 3-5. title | VARCHAR(255), NOT NULL
    @Column({
        length: 255,
        nullable: false
    })
    title!: string;

    // 3-5. description | TEXT, NULABLE	
    @Column({
        type: "text",
        nullable: true
    })
    description!: string | null;

    // 3-5. workspaceId | Int, FK(Workspace.id), NOT NULL
    @Column({
        nullable: false
    })
    workspaceId!: number;

    // 3-5. ticketStatusId | Int, FK(TicketStatus.id), NOT NULL
    @Column({
        nullable: false
    })
    ticketStatusId!: number;

    // 3-5. creatorId | Int, FK(User.id), NOT NULL
    @Column({
        nullable: false
    })
    creatorId!: number;

    // 3-5. assigneeId | Int, NULLABLE
    @Column({
        nullable: true
    })
    assigneeId!: number | null;

    // 3-5. priority | ENUM, NULABLE => 優先度 (例: high, middle...)
    @Column({
        type: 'enum',
        enum: ["Low", "Middle", "High", "Critical"], // 必要によって修正可能
        nullable: true
    })
    priority!: string | null;

    // 3-5. dueDate | DATETIME, NULABLE
    @Column({
        type: 'datetime',
        nullable: true
    })
    dueDate!: Date | null;

    // 3-5. createdAt | DATETIME, NOT NULL, Default CURRENT_TIMESTAMP
    @CreateDateColumn()
    createdAt!: Date;

    // 3-5. updatedAt | DATETIME, NOT NULL, Default CURRENT_TIMESTAMP
    @UpdateDateColumn()
    updatedAt!: Date;

    // ---------------------------------------------------
    // [ 関係設定: 他のテーブルから参照する部分 ]

    // 1. User一人によって複数のTicketが作成される。
    @ManyToOne(()=>User, (user)=>user.createdTickets)
    @JoinColumn({ name: "creatorId"})
    creator!: User;

    // 2. User一人に複数のTicketを割り当てる。
    @ManyToOne(()=>User, (user)=>user.assignedTickets, { nullable: true })
    @JoinColumn({ name: "assigneeId"})
    assignee!: User | null;

    // 3. Ticketが作成されてるWorkspace
    @ManyToOne(()=>Workspace, (workspace)=>workspace.tickets)
    @JoinColumn({name:"workspaceId"})
    workspace!:Workspace;

    // 4. TicketStatus (Ticket進行状況)
    @ManyToOne(()=>TicketStatus, (ticketStatus)=>ticketStatus.tickets)
    @JoinColumn({ name: "ticketStatusId"})
    status!: TicketStatus;
}