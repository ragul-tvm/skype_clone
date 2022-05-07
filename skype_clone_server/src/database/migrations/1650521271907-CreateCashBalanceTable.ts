import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateCashBalanceTable1650521271907 implements MigrationInterface {

    private table = new Table({
        name: 'tbl_cash_balance',
        columns: [
            {
                name: 'cash_balance_id',
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
                name: 'openning_balance',
                type: 'Decimal(10,2)',
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'amount',
                type: 'Decimal(10,2)',
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'inward_or_outward',
                type: 'INT',
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'closing_balance',
                type: 'Decimal(10,2)',
                isPrimary: false,
                isNullable: false,
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
        name: 'fk_person_id_on_cash_balance_tbl',
        columnNames: ['person_id'],
        referencedColumnNames: ['person_id'],
        referencedTableName: 'tbl_person',
        onDelete: 'CASCADE',
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
