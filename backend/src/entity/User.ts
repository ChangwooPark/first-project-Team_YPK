import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// @Entity() デコレーターはこのクラスがDBの 'user' テーブルと繋ぐことを意味
@Entity()
export class User {
    // @PrimaryGeneratedColumn: Primary Key、 値が自動でIncreamentする
    @PrimaryGeneratedColumn()
    id!: number;

    // @Column: 'firstName' カラムを生成 
    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    age!: number;
}