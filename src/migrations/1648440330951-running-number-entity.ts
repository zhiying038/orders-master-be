import { MigrationInterface, QueryRunner } from 'typeorm';

export class runningNumberEntity1648440330951 implements MigrationInterface {
  name = 'runningNumberEntity1648440330951';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "RUNNING_NUMBERS" ("Id" uniqueidentifier NOT NULL CONSTRAINT "DF_439fb4028bf281a7eb85b598551" DEFAULT NEWSEQUENTIALID(), "Purpose" nvarchar(255) NOT NULL, "AutoNumber" numeric NOT NULL, CONSTRAINT "PK_439fb4028bf281a7eb85b598551" PRIMARY KEY ("Id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "RUNNING_NUMBERS"`);
  }
}
