import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterAttachmentDetailTable1650447807746 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const isExist = await queryRunner.getTable('tbl_attachments_detail');
        if (isExist) {
            await queryRunner.query('ALTER TABLE `tbl_attachments_detail` CHANGE `created_by` `created_by` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL, CHANGE `modified_by` `modified_by` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL');
            await queryRunner.query('ALTER TABLE `tbl_attachments_detail` CHANGE `created_date` `created_date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP, CHANGE `modified_date` `modified_date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP;');
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const isExist = await queryRunner.getTable('tbl_attachments_detail');
        if (isExist) {
            await queryRunner.query('ALTER TABLE `tbl_attachments_detail` CHANGE `created_by` `created_by` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL, CHANGE `modified_by` `modified_by` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL');
            await queryRunner.query('ALTER TABLE `tbl_attachments_detail` CHANGE `created_date` `created_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, CHANGE `modified_date` `modified_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;');
        }
    }

}
