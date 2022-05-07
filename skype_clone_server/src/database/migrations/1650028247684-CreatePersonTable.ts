import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreatePersonTable1650028247684 implements MigrationInterface {

    private table = new Table({
        name: 'tbl_person',
        columns: [
            {
                name: 'person_id',
                type: 'INT',
                isPrimary: true,
                isNullable: false,
                isGenerated: true,
                generationStrategy: 'increment',
            }, {
                name: 'person_first_name',
                type: 'VARCHAR',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'person_last_name',
                type: 'VARCHAR',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'person_skype_name',
                type: 'VARCHAR',
                length: '255',
                isUnique: true,
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'person_email_id',
                type: 'VARCHAR',
                isPrimary: false,
                isNullable: true,
                length: '255',
            }, {
                name: 'password',
                type: 'VARCHAR',
                isPrimary: false,
                isNullable: true,
                length: '255',
            }, {
                name: 'location',
                type: 'VARCHAR',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'birthday',
                type: 'DATETIME',
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'skype_number',
                type: 'VARCHAR',
                length: '20',
                isPrimary: false,
                isNullable: true,
                isUnique: true,
            }, {
                name: 'profile_image_id',
                type: 'INT',
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'status_id',
                type: 'INT',
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'is_active',
                type: 'INT',
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'delete_flag',
                type: 'INT',
                default: 0,
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'group_list',
                type: 'VARCHAR',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'mail_verified',
                type: 'INT',
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'otp',
                type: 'VARCHAR',
                length: '6',
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'otp_validity_time',
                type: 'DATETIME',
                default: 'CURRENT_TIMESTAMP',
                isPrimary: false,
                isNullable: true,
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
        const isExists = await queryRunner.hasTable(this.table);
        if (!isExists) {
            await queryRunner.createTable(this.table);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const isExists = await queryRunner.hasTable(this.table);
        if (isExists) {
            await queryRunner.dropTable(this.table);
        }
    }

}
