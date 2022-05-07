import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateChatsListTable1650264538636 implements MigrationInterface {
    private table = new Table({
        name: 'tbl_chat_list',
        columns: [
            {
                name: 'chat_list_id',
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
                name: 'chats_count',
                type: 'INT',
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'chat_ids_list',
                type: 'TEXT',
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
        name: 'fk_person_id_tbl_chat_list',
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
