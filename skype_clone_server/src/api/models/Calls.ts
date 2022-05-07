import moment from 'moment';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './BaseModel';

@Entity('tbl_call')
export class Calls extends BaseModel {
    @PrimaryGeneratedColumn({ name: 'call_id' })
    public callId: number;

    @Column({ name: 'person_id' })
    public personId: number;

    @Column({ name: 'call_to' })
    public callTo: number;

    @Column({ name: 'call_duration', comment: 'Duration in seconds'})
    public callDuration: number;

    @Column({ name: 'total_call_cost' })
    public totalCallCost: number;

    @Column({ name: 'cost_per_second' })
    public costPerSec: number;

    @Column({ name: 'is_paid_call' })
    public isPaidCall: number;

    @Column({ name: 'audio_or_video' })
    public audioOrVideo: number;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
