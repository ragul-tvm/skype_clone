import { MigrationInterface, QueryRunner } from 'typeorm';
import { data } from '../../../uploads/emoji';

export class InsertIntoEmojiTable1650012199382 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const isExists = await queryRunner.hasTable('tbl_emoji_unicode');
        const parsedData = data;
        if (isExists) {
            // await queryRunner.createTable('tbl_emoji_unicode');
            for (const id in parsedData) {
                if (parsedData.hasOwnProperty(id)) {
                    const val = parsedData[id];
                    await queryRunner.query(`INSERT INTO tbl_emoji_unicode (emoji_short_name, emoji_unicode_hex, emoji_family) VALUES ("${val.name}", "${val.code}", "${val.family}")`);

                }
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('TRUNCATE TABLE `tbl_emoji_unicode`');
    }

}
