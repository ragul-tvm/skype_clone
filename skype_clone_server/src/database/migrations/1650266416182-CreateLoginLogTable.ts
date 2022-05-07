import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateLoginLogTable1650266416182 implements MigrationInterface {

    private table = new Table({
        name: 'tbl_login_log',
        columns: [
            {
                name: 'login_log_id',
                type: 'INT',
                isPrimary: true,
                isNullable: false,
                isGenerated: true,
                generationStrategy: 'increment',
            }, {
                name: 'person_id',
                type: 'INT',
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'email_id',
                type: 'VARCHAR',
                length: '255',
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'first_name',
                type: 'VARCHAR',
                length: '255',
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'ip_address',
                type: 'VARCHAR',
                length: '255',
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'created_by',
                type: 'VARCHAR',
                length: '255',
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'modified_by',
                type: 'VARCHAR',
                length: '255',
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'created_date',
                type: 'DATETIME',
                default: 'CURRENT_TIMESTAMP',
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'modified_date',
                type: 'DATETIME',
                default: 'CURRENT_TIMESTAMP',
                isPrimary: false,
                isNullable: false,
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
