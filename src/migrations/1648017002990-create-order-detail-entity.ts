import { MigrationInterface, QueryRunner } from 'typeorm';

export class createOrderDetailEntity1648017002990
  implements MigrationInterface
{
  name = 'createOrderDetailEntity1648017002990';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "ORDER_DETAILS" ("Id" uniqueidentifier NOT NULL CONSTRAINT "DF_728c158d41d01d1b1c5fce12177" DEFAULT NEWSEQUENTIALID(), "Quantity" int NOT NULL, "ItemCode" nvarchar(255), "OrderId" int, CONSTRAINT "PK_728c158d41d01d1b1c5fce12177" PRIMARY KEY ("Id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "ORDER_DETAILS" ADD CONSTRAINT "FK_2bd49157cb6974caa7b244e1f50" FOREIGN KEY ("ItemCode") REFERENCES "ITEMS"("Code") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ORDER_DETAILS" ADD CONSTRAINT "FK_d667a839bafe7cb4d5ff0f232c0" FOREIGN KEY ("OrderId") REFERENCES "ORDERS"("Id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ORDER_DETAILS" DROP CONSTRAINT "FK_d667a839bafe7cb4d5ff0f232c0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ORDER_DETAILS" DROP CONSTRAINT "FK_2bd49157cb6974caa7b244e1f50"`,
    );
    await queryRunner.query(`DROP TABLE "ORDER_DETAILS"`);
  }
}
