import { MigrationInterface, QueryRunner } from 'typeorm';

export class createOrderEntity1648008407715 implements MigrationInterface {
  name = 'createOrderEntity1648008407715';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "ORDERS" ("Id" int NOT NULL IDENTITY(1,1), "TotalPrice" float NOT NULL, "CreatedAt" datetimeoffset NOT NULL CONSTRAINT "DF_a8a2209a84525a726dd136bc4fb" DEFAULT getdate(), CONSTRAINT "PK_bdc0b9d5929e07dff242f7bcce7" PRIMARY KEY ("Id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "ORDERS"`);
  }
}
