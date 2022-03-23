import { MigrationInterface, QueryRunner } from 'typeorm';

export class createItemEntity1648006219422 implements MigrationInterface {
  name = 'createItemEntity1648006219422';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "ITEMS" ("Code" nvarchar(255) NOT NULL, "Name" nvarchar(255) NOT NULL, "Price" float NOT NULL, "Currency" nvarchar(255) NOT NULL CONSTRAINT "DF_f6358dbe2f326b046933d1e457d" DEFAULT 'MYR', CONSTRAINT "PK_7eec26f6289bb40de114b970564" PRIMARY KEY ("Code"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "ITEMS"`);
  }
}
