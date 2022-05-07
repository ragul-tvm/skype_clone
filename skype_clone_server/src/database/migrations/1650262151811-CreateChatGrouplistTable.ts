import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateChatGrouplistTable1650262151811 implements MigrationInterface {
    private table = new Table({
        name: 'tbl_group_list',
        columns: [
            {
                name: 'group_list_id',
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
                name: 'groups_count',
                type: 'INT',
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'group_id_list',
                type: 'VARCHAR',
                length: '255',
                isPrimary: false,
                isNullable: true,
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

    private table_fk = new TableForeignKey({
        name: 'fk_person_id_tbl_group_list',
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
