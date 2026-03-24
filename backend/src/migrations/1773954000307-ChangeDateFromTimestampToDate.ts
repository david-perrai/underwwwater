import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeDateFromTimestampToDate1773954000307 implements MigrationInterface {
  name = 'ChangeDateFromTimestampToDate1773954000307';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dives" DROP CONSTRAINT "FK_91bd3693461cb24a386e563428d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dives" ALTER COLUMN "date" TYPE date USING "date"::date`,
    );

    await queryRunner.query(
      `ALTER TABLE "dives" ADD CONSTRAINT "FK_91bd3693461cb24a386e563428d" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dives" DROP CONSTRAINT "FK_91bd3693461cb24a386e563428d"`,
    );
    await queryRunner.query(`ALTER TABLE "dives" DROP COLUMN "date"`);
    await queryRunner.query(
      `ALTER TABLE "dives" ADD "date" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "dives" ADD CONSTRAINT "FK_91bd3693461cb24a386e563428d" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
