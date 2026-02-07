import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddResetTokenOnUser1770466424950 implements MigrationInterface {
  name = 'AddResetTokenOnUser1770466424950';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "resetPasswordToken" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "resetPasswordExpires" TIMESTAMP`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1235f342658032e1235bada0e6" ON "dives" ("totalTime") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_144f7fb4dce393f60c7e95b0e1" ON "dives" ("maxDepth") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_144f7fb4dce393f60c7e95b0e1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1235f342658032e1235bada0e6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "resetPasswordExpires"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "resetPasswordToken"`,
    );
  }
}
