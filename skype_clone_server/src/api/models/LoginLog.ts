
import { IsNotEmpty, IsEmail } from 'class-validator';
import {
    BeforeInsert, Column, Entity, BeforeUpdate, PrimaryGeneratedColumn
} from 'typeorm';

import {BaseModel} from './BaseModel';
import moment from 'moment';

@Entity('tbl_login_log')
export class LoginLog extends BaseModel {

    @PrimaryGeneratedColumn({name: 'login_log_id'})
    public id: number;

    @IsNotEmpty()
    @Column({ name: 'person_id' })
    public personId: number;

    @IsEmail()
    @Column({ name: 'email_id' })
    public emailId: string;

    @Column({ name: 'first_name' })
    public firstName: string;

    @Column({ name: 'ip_address' })
    public ipAddress: string;

    @BeforeInsert()
    public async hashPassword(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
