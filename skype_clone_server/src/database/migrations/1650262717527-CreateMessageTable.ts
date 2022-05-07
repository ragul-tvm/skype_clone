import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateMessageTable1650262717527 implements MigrationInterface {
    private table = new Table({
        name: 'tbl_message',
        columns: [
            {
                name: 'message_id',
                type: 'INT',
                isPrimary: true,
                isNullable: false,
                isGenerated: true,
                generationStrategy: 'increment',
            }, {
                name: 'from_person_id',
                type: 'INT',
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'to_person_id',
                type: 'INT',
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'message',
                type: 'TEXT',
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'has_bookmark',
                type: 'INT',
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'has_reply',
                type: 'INT',
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'is_forwarded',
                type: 'INT',
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'has_attachment',
                type: 'INT',
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'attachment_detail_id',
                type: 'INT',
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'is_group',
                type: 'INT',
                isPrimary: false,
                isNullable: true,
                default: 0,
            }, {
                name: 'group_id',
                type: 'INT',
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'is_edited',
                type: 'INT',
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

    private table_fk_1 = new TableForeignKey({
        name: 'fk_from_person_id_tbl_group_list',
        columnNames: ['from_person_id'],
        referencedColumnNames: ['person_id'],
        referencedTableName: 'tbl_person',
    });

    private table_fk_2 = new TableForeignKey({
        name: 'fk_to_person_id_tbl_group_list',
        columnNames: ['to_person_id'],
        referencedColumnNames: ['person_id'],
        referencedTableName: 'tbl_person',
    });

    private table_fk_3 = new TableForeignKey({
        name: 'fk_group_id_tbl_group_list',
        columnNames: ['group_id'],
        referencedColumnNames: ['group_id'],
        referencedTableName: 'tbl_group_detail',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        const isExist = await queryRunner.hasTable(this.table);
        if (!isExist) {
            await queryRunner.createTable(this.table);
            await queryRunner.createForeignKeys(this.table, [this.table_fk_1, this.table_fk_2, this.table_fk_3]);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const isExist = await queryRunner.hasTable(this.table);
        if (isExist) {
            await queryRunner.dropForeignKeys(this.table, [this.table_fk_1, this.table_fk_2, this.table_fk_3]);
            await queryRunner.dropTable(this.table);
        }
    }

}
