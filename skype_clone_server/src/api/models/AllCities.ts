import moment from 'moment';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './BaseModel';

@Entity('all_city')
export class AllCities extends BaseModel {
    @PrimaryGeneratedColumn(
        {name: 'city_id'}
    )
    public cityId: number;

    @Column({name: 'city_name'})
    public cityName: string;

    @Column({name: 'country_id'})
    public countryId: number;

    @Column({name: 'is_active'})
    public isActive: number;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
