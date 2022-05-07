import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateChatGroupDetailTable1650260114065 implements MigrationInterface {

    private table = new Table({
        name: 'tbl_group_detail',
        columns: [
            {
                name: 'group_id',
                type: 'INT',
                isPrimary: true,
                isNullable: false,
                isGenerated: true,
                generationStrategy: 'increment',
            }, {
                name: 'group_name',
                type: 'VARCHAR',
                length: '126',
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'max_users_count',
                type: 'INT',
                default: 255,
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'active_users_count',
                type: 'INT',
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'users_list',
                type: 'VARCHAR',
                length: '255',
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'chat_id',
                type: 'INT',
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'is_active',
                type: 'INT',
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'group_join_link',
                type: 'VARCHAR',
                length: '126',
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'created_by',
                type: 'INT',
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'modified_by',
                type: 'INT',
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
        name: 'fk_person_id_tbl_group_detail',
        columnNames: ['created_by'],
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
