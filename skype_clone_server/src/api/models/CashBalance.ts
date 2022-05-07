import moment from 'moment';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './BaseModel';

@Entity('tbl_cash_balance')
export class CashBalance extends BaseModel {
    @PrimaryGeneratedColumn({ name: 'cash_balance_id' })
    public cashBalanceId: number;

    @Column({ name: 'person_id' })
    public personId: number;

    @Column({ name: 'openning_balance' })
    public opennigBalance: number;

    @Column({ name: 'amount' })
    public amount: number;

    @Column({ name: 'inward_or_outward' })
    public inwardOrOutward: number;

    @Column({ name: 'closing_balance' })
    public closingBalance: number;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.closingBalance = (this.inwardOrOutward === 0) ?
        (this.opennigBalance + this.amount) :
        (this.opennigBalance - this.amount);
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        // this.closingBalance = (this.inwardOrOutward === 0) ?
        // (this.opennigBalance + this.amount) :
        // (this.opennigBalance - this.amount);
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
