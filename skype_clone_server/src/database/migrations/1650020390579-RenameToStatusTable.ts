import {MigrationInterface, QueryRunner} from 'typeorm';

export class RenameToStatusTable1650020390579 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`RENAME TABLE tbl_predefined_status TO tbl_status`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`RENAME TABLE tbl_status TO tbl_predefined_status`);
    }

}
