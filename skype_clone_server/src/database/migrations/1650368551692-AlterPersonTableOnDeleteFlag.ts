import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterPersonTableOnDeleteFlag1650368551692 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const isExists = await queryRunner.getTable('tbl_person');
        if (isExists) {
            await queryRunner.query('ALTER TABLE `tbl_person` CHANGE `delete_flag` `delete_flag` INT NULL DEFAULT 1');
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const isExists = await queryRunner.getTable('tbl_person');
        if (isExists) {
            await queryRunner.query('ALTER TABLE `tbl_person` CHANGE `delete_flag` `delete_flag` INT NULL DEFAULT 0');
        }
    }

}
