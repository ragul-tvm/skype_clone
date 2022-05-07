import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateOTPstoreTable1650257996335 implements MigrationInterface {

    private table = new Table({
        name: 'tbl_save_otp',
        columns: [
            {
                name: 'otp_id',
                type: 'INT',
                isPrimary: true,
                isNullable: false,
                isGenerated: true,
                generationStrategy: 'increment',
            }, {
                name: 'otp',
                type: 'INT',
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'otp_valid_time',
                type: 'DATETIME',
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'person_id',
                type: 'INT',
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'otp_medium',
                type: 'INT',
                default: '0',
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

    private table_fk = new TableForeignKey({
        name: 'fk_person_id',
        columnNames: ['person_id'],
        referencedColumnNames: ['person_id'],
        referencedTableName: 'tbl_person',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        const isExists = await queryRunner.hasTable(this.table);
        if (!isExists) {
            await queryRunner.createTable(this.table);
            await queryRunner.createForeignKey(this.table, this.table_fk);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const isExists = await queryRunner.hasTable(this.table);
        if (isExists) {
            await queryRunner.dropForeignKey(this.table, this.table_fk);
            await queryRunner.dropTable(this.table);
        }
    }

}
