import { MigrationInterface, QueryRunner } from 'typeorm';

export class addItemDescription1648613154795 implements MigrationInterface {
  name = 'addItemDescription1648613154795';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ITEMS" ADD "Description" nvarchar(255)`,
    );
    await queryRunner.query(
      `ALTER TABLE "ORDERS" ADD "Status" nvarchar(255) CONSTRAINT CHK_22692fa36b930a4c48956c5a51_ENUM CHECK(Status IN ('PENDING','CONFIRMED','COMPLETED')) NOT NULL CONSTRAINT "DF_4fc01967966b5f01ff766cd59a5" DEFAULT 'CONFIRMED'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ORDERS" DROP CONSTRAINT "DF_4fc01967966b5f01ff766cd59a5"`,
    );
    await queryRunner.query(`ALTER TABLE "ORDERS" DROP COLUMN "Status"`);
    await queryRunner.query(`ALTER TABLE "ITEMS" DROP COLUMN "Description"`);
  }
}
