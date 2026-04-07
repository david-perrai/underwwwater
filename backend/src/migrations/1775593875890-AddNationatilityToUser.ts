import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNationatilityToUser1775593875890 implements MigrationInterface {
  name = 'AddNationatilityToUser1775593875890';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "nationality" character varying(2)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "nationality"`);
  }
}
