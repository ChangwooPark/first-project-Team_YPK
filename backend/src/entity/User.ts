import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// @Entity() デコレーターはこのクラスがDBの 'user' テーブルと繋ぐことを意味
@Entity()
export class User {
    // @PrimaryGeneratedColumn: Primary Key、 値が自動でIncreamentする
    @PrimaryGeneratedColumn()
    id!: number;

    // アカウントは必須入力、重複不可
    @Column({ nullable:false, unique:true })
    userAccount!: string;

    // @Column: 'firstName' カラムを生成 
    @Column({ nullable:false })
    firstName!: string;

    @Column({ nullable:false })
    lastName!: string;

    @Column({ nullable:false })
    password!: string;
}