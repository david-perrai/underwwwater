import { MigrationInterface, QueryRunner } from 'typeorm';

export class AccountConfirmation1776200020929 implements MigrationInterface {
  name = 'AccountConfirmation1776200020929';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "confirmationToken" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "confirmationExpires" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "activatedAt" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "activatedAt" DROP DEFAULT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "activatedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "activatedAt" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "confirmationExpires"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "confirmationToken"`,
    );
  }
}
