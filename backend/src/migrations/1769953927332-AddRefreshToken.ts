import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRefreshToken1769953927332 implements MigrationInterface {
  name = 'AddRefreshToken1769953927332';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "refreshToken" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshToken"`);
  }
}
