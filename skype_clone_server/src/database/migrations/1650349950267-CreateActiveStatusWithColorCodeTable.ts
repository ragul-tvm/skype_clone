import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateActiveStatusWithColorCodeTable1650349950267 implements MigrationInterface {

    private table = new Table({
        name: 'tbl_active_status',
        columns: [
            {
                name: 'active_status_id',
                type: 'INT',
                isPrimary: true,
                isNullable: false,
                isGenerated: true,
                generationStrategy: 'increment',
            }, {
                name: 'status_name',
                type: 'VARCHAR',
                length: '50',
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'status_code',
                type: 'VARCHAR',
                length: '50',
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'status_color_code',
                type: 'VARCHAR',
                length: '50',
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

    private insertStatus = [
        {
            id: 1,
            status_name: 'Active',
            status_code: 'Green',
            status_color_code: '#5bdb3b',
        }, {
            id: 2,
            status_name: 'Away',
            status_code: 'Orange',
            status_color_code: '#ffad33',
        }, {
            id: 3,
            status_name: 'Do Not Disturb',
            status_code: 'red',
            status_color_code: '#c90000',
        }, {
            id: 4,
            status_name: 'Invisible',
            status_code: 'gray',
            status_color_code: '#7d7d7d',
        },
    ];
    public async up(queryRunner: QueryRunner): Promise<void> {
        const isExists = await queryRunner.hasTable(this.table);
        if (!isExists) {
            await queryRunner.createTable(this.table);
            for (const status of this.insertStatus) {
                await queryRunner.query(`INSERT INTO tbl_active_status (status_name, status_code, status_color_code) VALUES ("${status.status_name}", "${status.status_code}","${status.status_color_code}")`);
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const isExists = await queryRunner.hasTable(this.table);
        if (!isExists) {
            await queryRunner.query(`TRUNCATE TABLE tbl_active_status`);
            await queryRunner.dropTable(this.table);
        }
    }

}
