import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateEmojiUnicodeTable1648875360202 implements MigrationInterface {

    private table = new Table({
        name: 'tbl_emoji_unicode',
        columns: [
            {
                name: 'emoji_id',
                type: 'INT',
                isPrimary: true,
                isNullable: false,
                isGenerated: true,
                generationStrategy: 'increment',
            }, {
                name: 'emoji_short_name',
                type: 'VARCHAR',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'emoji_unicode_hex',
                type: 'VARCHAR',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'emoji_family',
                type: 'VARCHAR',
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
