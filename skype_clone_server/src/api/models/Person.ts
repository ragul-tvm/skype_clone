import * as bcrypt from 'bcrypt';
import { IsEmail, IsNotEmpty } from 'class-validator';
import moment from 'moment';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from '../models/BaseModel';
import { AttachmentsDetail } from './AttachmentsDetail';
import { Status } from './Status';

@Entity('tbl_person')
export class Person extends BaseModel {

    public static hashPassword(password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    }

    public static comparePassword(user: Person, password: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                resolve(res === true);
            });
        });
    }

    @PrimaryGeneratedColumn({ name: 'person_id' })
    public personId: number;

    @Column({ name: 'person_first_name' })
    public firstName: string;

    @Column({ name: 'person_last_name' })
    public lastName: string;

    @Column({ name: 'person_skype_name' })
    public skypeName: string;

    @IsEmail({}, {message: 'Email must be like "example@email.com"'})
    @IsNotEmpty({message: 'Email Id cannot be empty'})
    @Column({ name: 'person_email_id' })
    public emailId: string;

    @IsNotEmpty({message: 'Password cannot be empty and should be in 8 - 16 character length'})
    @Column({ name: 'password' })
    public password: string;

    @Column({ name: 'location' })
    public location: string;

    @Column({ name: 'birthday' })
    public birthday: string;

    @Column({ name: 'skype_number' })
    public skypeNumber: string;

    @Column({ name: 'profile_image_id' })
    public profileImageId: number;

    @Column({ name: 'status_id' })
    public statusId: number;

    @Column({ name: 'is_active' })
    public activeStatus: number;  // to be mentioned after Active Status Entity

    @Column({ name: 'delete_flag' })
    public deleteFlag: number;

    @Column({ name: 'group_list' })
    public groupListId: string;  // to be mentioned after groupList Entity

    @Column({ name: 'mail_verified' })
    public mailVerified: number;

    @OneToOne(type => Status)
    @JoinColumn({name: 'status_id'})
    public status: Status;

    @OneToOne(type => AttachmentsDetail)
    @JoinColumn({name: 'profile_image_id'})
    public profileImage: AttachmentsDetail;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
