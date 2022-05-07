import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';
import { statusList } from '../../../uploads/statusAndEmojiAtStart';

export class CreatePredefinedStatusTable1650020132143 implements MigrationInterface {

    private table = new Table({
        name: 'tbl_predefined_status',
        columns: [
            {
                name: 'status_id',
                type: 'INT',
                isPrimary: true,
                isNullable: false,
                isGenerated: true,
                generationStrategy: 'increment',
            }, {
                name: 'status',
                type: 'VARCHAR',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'emoji_id',
                type: 'INT',
                length: '255',
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

    private tableFk = new TableForeignKey({
        name: 'fk_emoji_id',
        columnNames: ['emoji_id'],
        referencedTableName: 'tbl_emoji_unicode',
        referencedColumnNames: ['emoji_id'],
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        const isExists = await queryRunner.hasTable(this.table);
        if (!isExists) {
            await queryRunner.createTable(this.table);
            await queryRunner.createForeignKey(this.table, this.tableFk);
            for (const status of statusList) {
                await queryRunner.query(`INSERT INTO tbl_predefined_status (status, emoji_id, created_by) VALUES ("${status.status}", "${status.emoji_id}","${status.created_by}")`);
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const isExists = await queryRunner.hasTable(this.table);
        if (!isExists) {
            await queryRunner.query(`TRUNCATE TABLE tbl_predefined_status`);
            await queryRunner.createForeignKey(this.table, this.tableFk);
            await queryRunner.dropTable(this.table);
        }
    }

}
