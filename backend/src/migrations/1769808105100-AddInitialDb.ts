import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddInitialDb1769808105100 implements MigrationInterface {
  name = 'AddInitialDb1769808105100';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "diving_types" ("id" SERIAL NOT NULL, "label" character varying(255) NOT NULL, "token" character varying(255) NOT NULL, CONSTRAINT "UQ_0691e451d43e0fac49a96d26143" UNIQUE ("label"), CONSTRAINT "UQ_2d9e93ff8b887d01cfea48fabaa" UNIQUE ("token"), CONSTRAINT "PK_0e34deebac5cf29cbde108248ee" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "diving_environments" ("id" SERIAL NOT NULL, "label" character varying(255) NOT NULL, "token" character varying(255) NOT NULL, CONSTRAINT "UQ_ae5007b21b28fd6588e2ba3d90b" UNIQUE ("label"), CONSTRAINT "UQ_87b71c0bc1565831e27970a0fb6" UNIQUE ("token"), CONSTRAINT "PK_42da4343c1e746b6384cf086951" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "diving_roles" ("id" SERIAL NOT NULL, "label" character varying(255) NOT NULL, "token" character varying(255) NOT NULL, CONSTRAINT "UQ_a4125a673468c431f2f65d0c9e4" UNIQUE ("label"), CONSTRAINT "UQ_9544dee00f3376d80ce859ceba1" UNIQUE ("token"), CONSTRAINT "PK_598030d564311ca64cafc73a2ae" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."gases_type_enum" AS ENUM('oxygen', 'nitrogen', 'helium', 'argon')`,
    );
    await queryRunner.query(
      `CREATE TABLE "gases" ("id" SERIAL NOT NULL, "type" "public"."gases_type_enum" NOT NULL DEFAULT 'oxygen', "percentage" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "gasTankId" integer, CONSTRAINT "PK_b02ff281d7bd32819a183526795" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "gas_tanks" ("id" SERIAL NOT NULL, "pressureStart" double precision NOT NULL, "pressureEnd" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "diveId" integer NOT NULL, CONSTRAINT "PK_350bec696545cec4d79d314c394" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "dives" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "date" TIMESTAMP NOT NULL, "totalTime" integer NOT NULL, "maxDepth" double precision NOT NULL, "divingEnvironmentId" integer NOT NULL, "divingRoleId" integer NOT NULL, "ownerId" integer NOT NULL, CONSTRAINT "PK_206d8db169538184f5e86c5752d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying(180) NOT NULL, "username" character varying(255) NOT NULL, "roles" text NOT NULL DEFAULT 'ROLE_USER', "password" character varying NOT NULL, "avatar" character varying(255), "subscribedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "activatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "diving_types_dives" ("divesId" integer NOT NULL, "divingTypesId" integer NOT NULL, CONSTRAINT "PK_b8023be7fce08681e63892c8b05" PRIMARY KEY ("divesId", "divingTypesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_18f31cae097f95ed05f5f82145" ON "diving_types_dives" ("divesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2c26c9c6cbc660f13c7e8ab915" ON "diving_types_dives" ("divingTypesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "gases" ADD CONSTRAINT "FK_d15b0376367daf3d657eb3d331d" FOREIGN KEY ("gasTankId") REFERENCES "gas_tanks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "gas_tanks" ADD CONSTRAINT "FK_d5d4842ce2bfbdf61be7a338018" FOREIGN KEY ("diveId") REFERENCES "dives"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "dives" ADD CONSTRAINT "FK_c24beb63f490959c1b354d82279" FOREIGN KEY ("divingEnvironmentId") REFERENCES "diving_environments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "dives" ADD CONSTRAINT "FK_0cc59f1728e2769849f19804c3c" FOREIGN KEY ("divingRoleId") REFERENCES "diving_roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "dives" ADD CONSTRAINT "FK_91bd3693461cb24a386e563428d" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "diving_types_dives" ADD CONSTRAINT "FK_18f31cae097f95ed05f5f821452" FOREIGN KEY ("divesId") REFERENCES "dives"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "diving_types_dives" ADD CONSTRAINT "FK_2c26c9c6cbc660f13c7e8ab915d" FOREIGN KEY ("divingTypesId") REFERENCES "diving_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "diving_types_dives" DROP CONSTRAINT "FK_2c26c9c6cbc660f13c7e8ab915d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "diving_types_dives" DROP CONSTRAINT "FK_18f31cae097f95ed05f5f821452"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dives" DROP CONSTRAINT "FK_91bd3693461cb24a386e563428d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dives" DROP CONSTRAINT "FK_0cc59f1728e2769849f19804c3c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dives" DROP CONSTRAINT "FK_c24beb63f490959c1b354d82279"`,
    );
    await queryRunner.query(
      `ALTER TABLE "gas_tanks" DROP CONSTRAINT "FK_d5d4842ce2bfbdf61be7a338018"`,
    );
    await queryRunner.query(
      `ALTER TABLE "gases" DROP CONSTRAINT "FK_d15b0376367daf3d657eb3d331d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2c26c9c6cbc660f13c7e8ab915"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_18f31cae097f95ed05f5f82145"`,
    );
    await queryRunner.query(`DROP TABLE "diving_types_dives"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "dives"`);
    await queryRunner.query(`DROP TABLE "gas_tanks"`);
    await queryRunner.query(`DROP TABLE "gases"`);
    await queryRunner.query(`DROP TYPE "public"."gases_type_enum"`);
    await queryRunner.query(`DROP TABLE "diving_roles"`);
    await queryRunner.query(`DROP TABLE "diving_environments"`);
    await queryRunner.query(`DROP TABLE "diving_types"`);
  }
}
