import moment from 'moment';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './BaseModel';

@Entity('tbl_attachments_detail')
export class AttachmentsDetail extends BaseModel {
    @PrimaryGeneratedColumn({name: 'attachment_id'})
    public attachmentId: number;

    @Column({name: 'document_name'})
    public documentName: string;

    @Column({name: 'mime_type'})
    public mimeType: string;

    @Column({name: 'folder_path'})
    public folderPath: string;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
