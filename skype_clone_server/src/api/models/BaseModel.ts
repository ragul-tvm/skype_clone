
import {Column} from 'typeorm';
import { Exclude } from 'class-transformer';
export abstract class BaseModel {
    @Exclude()
    @Column({ name: 'created_by' })
    public createdBy: number;

    @Column({ name: 'created_date' })
    public createdDate: string;

    @Exclude()
    @Column({ name: 'modified_by' })
    public modifiedBy: number;

    @Exclude()
    @Column({ name: 'modified_date' })
    public modifiedDate: string;
}
