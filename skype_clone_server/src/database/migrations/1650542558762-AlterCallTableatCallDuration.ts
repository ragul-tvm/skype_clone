import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterCallTableatCallDuration1650542558762 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('tbl_call');
        if (table) {
            await queryRunner.query('ALTER TABLE tbl_call CHANGE `call_duration` `call_duration` INT NOT NULL');
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('tbl_call');
        if (table) {
            await queryRunner.query('ALTER TABLE tbl_call CHANGE `call_duration` `call_duration` TIME NOT NULL');
        }
    }

}
