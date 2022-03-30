import { MigrationInterface, QueryRunner } from 'typeorm';

export class uniqueItemCode1648608139189 implements MigrationInterface {
  name = 'uniqueItemCode1648608139189';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ITEM_IMAGES" DROP COLUMN "Link"`);
    await queryRunner.query(
      `ALTER TABLE "ITEM_IMAGES" ADD "Link" nvarchar(max) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "ITEMS" ADD CONSTRAINT "UQ_7eec26f6289bb40de114b970564" UNIQUE ("Code")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7eec26f6289bb40de114b97056" ON "ITEMS" ("Code") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_70d1b04bb227a903257cb6f311" ON "ITEMS" ("Name") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "IDX_70d1b04bb227a903257cb6f311" ON "ITEMS"`,
    );
    await queryRunner.query(
      `DROP INDEX "IDX_7eec26f6289bb40de114b97056" ON "ITEMS"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ITEMS" DROP CONSTRAINT "UQ_7eec26f6289bb40de114b970564"`,
    );
    await queryRunner.query(`ALTER TABLE "ITEM_IMAGES" DROP COLUMN "Link"`);
    await queryRunner.query(
      `ALTER TABLE "ITEM_IMAGES" ADD "Link" nvarchar(MAX) NOT NULL`,
    );
  }
}
