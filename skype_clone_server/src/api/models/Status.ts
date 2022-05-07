import 'reflect-metadata';
import moment from 'moment';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './BaseModel';

@Entity('tbl_status')
export class Status extends BaseModel {
    @PrimaryGeneratedColumn({name: 'status_id'})
    public statusId: number;

    @Column({name: 'status'})
    public status: string;

    @Column({name: 'emoji_id'})
    public emojiId: number;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
