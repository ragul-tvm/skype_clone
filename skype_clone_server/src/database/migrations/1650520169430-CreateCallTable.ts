import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateCallTable1650520169430 implements MigrationInterface {

    private table = new Table({
        name: 'tbl_call',
        columns: [
            {
                name: 'call_id',
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
                name: 'call_to',
                type: 'INT',
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'call_duration',
                type: 'TIME',
                isPrimary: false,
                isNullable: false,
            },  {
                name: 'total_call_cost',
                type: 'decimal(10,2)',
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'cost_per_second',
                type: 'decimal(10,2)',
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'is_paid_call',
                type: 'INT',
                default: 0,
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'audio_or_video',
                type: 'INT',
                comment: '0 -> Audio, 1 -> Video',
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'created_by',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'modified_by',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'created_date',
                type: 'DATETIME',
                isPrimary: false,
                isNullable: true,
                default: 'CURRENT_TIMESTAMP',
            }, {
                name: 'modified_date',
                type: 'DATETIME',
                isPrimary: false,
                isNullable: true,
                default: 'CURRENT_TIMESTAMP',
            },
        ],
    });

    private table_fk = new TableForeignKey({
        name: 'fk_person_id_on_call_tbl',
        columnNames: ['person_id'],
        referencedColumnNames: ['person_id'],
        referencedTableName: 'tbl_person',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        const isExist = await queryRunner.hasTable(this.table);
        if (!isExist) {
            await queryRunner.createTable(this.table);
            await queryRunner.createForeignKey(this.table, this.table_fk);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const isExist = await queryRunner.hasTable(this.table);
        if (isExist) {
            await queryRunner.dropForeignKey(this.table, this.table_fk);
            await queryRunner.dropTable(this.table);
        }
    }

}
