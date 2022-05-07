import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterPersonTableToRemoveColumn1650258042197 implements MigrationInterface {

    private column1 = new TableColumn({
        name: 'otp',
        type: 'VARCHAR',
        length: '6',
        isPrimary: false,
        isNullable: true,
    });

    private column2 = new TableColumn({
        name: 'otp_validity_time',
        type: 'DATETIME',
        default: 'CURRENT_TIMESTAMP',
        isPrimary: false,
        isNullable: true,
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('tbl_person');
        if (table) {
            await queryRunner.dropColumns(table, ['otp', 'otp_validity_time']);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('tbl_person');
        if (table) {
            await queryRunner.addColumns(table, [this.column1, this.column2]);
        }
    }

}
