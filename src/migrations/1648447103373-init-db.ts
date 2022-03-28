import {MigrationInterface, QueryRunner} from "typeorm";

export class initDb1648447103373 implements MigrationInterface {
    name = 'initDb1648447103373'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ITEM_IMAGES" ("Id" uniqueidentifier NOT NULL CONSTRAINT "DF_351377075bd9a2b603c5a06ce14" DEFAULT NEWSEQUENTIALID(), "Link" nvarchar(max) NOT NULL, "Alt" nvarchar(255), "ItemId" uniqueidentifier, CONSTRAINT "PK_351377075bd9a2b603c5a06ce14" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "ITEMS" ("Id" uniqueidentifier NOT NULL CONSTRAINT "DF_1d42fb4adcc70c39c2c8a70feff" DEFAULT NEWSEQUENTIALID(), "Code" nvarchar(255) NOT NULL, "Name" nvarchar(255) NOT NULL, "Price" float NOT NULL, "Currency" nvarchar(255) NOT NULL CONSTRAINT "DF_f6358dbe2f326b046933d1e457d" DEFAULT 'MYR', CONSTRAINT "PK_1d42fb4adcc70c39c2c8a70feff" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "RUNNING_NUMBERS" ("Id" uniqueidentifier NOT NULL CONSTRAINT "DF_439fb4028bf281a7eb85b598551" DEFAULT NEWSEQUENTIALID(), "Purpose" nvarchar(255) NOT NULL, "AutoNumber" numeric NOT NULL, CONSTRAINT "PK_439fb4028bf281a7eb85b598551" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "ORDER_DETAILS" ("Id" uniqueidentifier NOT NULL CONSTRAINT "DF_728c158d41d01d1b1c5fce12177" DEFAULT NEWSEQUENTIALID(), "UnitPrice" float NOT NULL, "Quantity" int NOT NULL, "ItemCode" uniqueidentifier, "OrderId" uniqueidentifier, CONSTRAINT "PK_728c158d41d01d1b1c5fce12177" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "ORDERS" ("Id" uniqueidentifier NOT NULL CONSTRAINT "DF_bdc0b9d5929e07dff242f7bcce7" DEFAULT NEWSEQUENTIALID(), "CreatedAt" datetimeoffset NOT NULL CONSTRAINT "DF_a8a2209a84525a726dd136bc4fb" DEFAULT getdate(), "PlacedAt" date NOT NULL, "ReferenceNumber" nvarchar(255) NOT NULL, "TotalPrice" float NOT NULL, "Currency" nvarchar(255) NOT NULL CONSTRAINT "DF_dc0ab95e14802a3af6cd5dceb1a" DEFAULT 'MYR', CONSTRAINT "PK_bdc0b9d5929e07dff242f7bcce7" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`ALTER TABLE "ITEM_IMAGES" ADD CONSTRAINT "FK_ce2cbacfdc5b970652c79c01aca" FOREIGN KEY ("ItemId") REFERENCES "ITEMS"("Id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ORDER_DETAILS" ADD CONSTRAINT "FK_2bd49157cb6974caa7b244e1f50" FOREIGN KEY ("ItemCode") REFERENCES "ITEMS"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ORDER_DETAILS" ADD CONSTRAINT "FK_d667a839bafe7cb4d5ff0f232c0" FOREIGN KEY ("OrderId") REFERENCES "ORDERS"("Id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ORDER_DETAILS" DROP CONSTRAINT "FK_d667a839bafe7cb4d5ff0f232c0"`);
        await queryRunner.query(`ALTER TABLE "ORDER_DETAILS" DROP CONSTRAINT "FK_2bd49157cb6974caa7b244e1f50"`);
        await queryRunner.query(`ALTER TABLE "ITEM_IMAGES" DROP CONSTRAINT "FK_ce2cbacfdc5b970652c79c01aca"`);
        await queryRunner.query(`DROP TABLE "ORDERS"`);
        await queryRunner.query(`DROP TABLE "ORDER_DETAILS"`);
        await queryRunner.query(`DROP TABLE "RUNNING_NUMBERS"`);
        await queryRunner.query(`DROP TABLE "ITEMS"`);
        await queryRunner.query(`DROP TABLE "ITEM_IMAGES"`);
    }

}
