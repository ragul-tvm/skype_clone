import {BeforeInsert, BeforeUpdate, Column, Entity} from 'typeorm';
import {PrimaryGeneratedColumn} from 'typeorm';
import {User} from './User';
import {JoinColumn} from 'typeorm';
import {ManyToOne} from 'typeorm';
import {BaseModel} from './BaseModel';
import moment from 'moment';
@Entity('tbl_access_token')

export class AccessToken extends BaseModel {

    @PrimaryGeneratedColumn({ name: 'token_id' })
    public id: number;

    @Column({ name: 'user_id' })
    public userId: number;

    @Column({ name: 'token' })
    public token: string;

    @ManyToOne(type => User, user => user.accessToken)
    @JoinColumn({ name: 'user_id' })
    public user: User;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

}
