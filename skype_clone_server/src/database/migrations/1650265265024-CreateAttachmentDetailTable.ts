import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateAttachmentDetailTable1650265265024 implements MigrationInterface {

    private table = new Table({
        name: 'tbl_attachments_detail',
        columns: [
            {
                name: 'attachment_id',
                type: 'INT',
                isPrimary: true,
                isNullable: false,
                isGenerated: true,
                generationStrategy: 'increment',
            }, {
                name: 'document_name',
                type: 'VARCHAR',
                length: '255',
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'mime_type',
                type: 'VARCHAR',
                length: '255',
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'folder_path',
                type: 'VARCHAR',
                length: '255',
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'created_by',
                type: 'VARCHAR',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'modified_by',
                type: 'VARCHAR',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'created_date',
                type: 'DATETIME',
                default: 'CURRENT_TIMESTAMP',
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'modified_date',
                type: 'DATETIME',
                default: 'CURRENT_TIMESTAMP',
                isPrimary: false,
                isNullable: true,
            },
        ],
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        const isExist = await queryRunner.hasTable(this.table);
        if (!isExist) {
            await queryRunner.createTable(this.table);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const isExist = await queryRunner.hasTable(this.table);
        if (isExist) {
            await queryRunner.dropTable(this.table);
        }
    }

}
