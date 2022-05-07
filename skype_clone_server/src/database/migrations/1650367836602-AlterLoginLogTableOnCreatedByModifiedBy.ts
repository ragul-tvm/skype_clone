import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterLoginLogTableOnCreatedByModifiedBy1650367836602 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const isExist = await queryRunner.getTable('tbl_login_log');
        if (isExist) {
            await queryRunner.query('ALTER TABLE `tbl_login_log` CHANGE `created_by` `created_by` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL, CHANGE `modified_by` `modified_by` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL');
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const isExist = await queryRunner.getTable('tbl_login_log');
        if (isExist) {
            await queryRunner.query('ALTER TABLE `tbl_login_log` CHANGE `created_by` `created_by` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL, CHANGE `modified_by` `modified_by` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL');
        }
    }

}
