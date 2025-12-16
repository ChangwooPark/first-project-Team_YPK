import { 
    Column,
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn
} from 'typeorm'
import { Ticket } from './Ticket';

@Entity()
export class TicketStatus{

    // 3-4. id | Int, PK, Auto Increment
    @PrimaryGeneratedColumn()
    id!: number;

    // 3-4. name | VARCHAR(50), NOT NULL, UNIQUE
    @Column({
        length: 50,
        nullable: false,
        unique: true
    })
    name!: string;

    // 3-4. orderIndex | Int, NOT NULL
    @Column({
        type : 'int',
        nullable: false
    })
    orderIndex!: number;

    // ---------------------------------------------------
    // [ 関係設定: 他のテーブルから参照する部分 ]

    // 1. 進行状況を使っているTicket　(Ticket.ticketStatusId): OneToMany
    // 一個のTicketStatusは複数のTicketに割り当てられる
    @OneToMany(()=>Ticket, (ticket)=>ticket.status)
    tickets!: Ticket[];

}