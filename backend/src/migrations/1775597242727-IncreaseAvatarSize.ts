import { MigrationInterface, QueryRunner } from 'typeorm';

export class IncreaseAvatarSize1775597242727 implements MigrationInterface {
  name = 'IncreaseAvatarSize1775597242727';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "avatar" TYPE text`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "avatar" TYPE character varying(255)`,
    );
  }
}
