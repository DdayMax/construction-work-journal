import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1780152424304 implements MigrationInterface {
    name = 'Auto1780152424304'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."employee_role_enum" AS ENUM('Рабочий', 'Бригадир', 'Прораб')`);
        await queryRunner.query(`CREATE TYPE "public"."employee_status_enum" AS ENUM('active', 'fired')`);
        await queryRunner.query(`CREATE TABLE "employee" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "role" "public"."employee_role_enum" NOT NULL, "status" "public"."employee_status_enum" NOT NULL DEFAULT 'active', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."work_type_unit_enum" AS ENUM('м²', 'м³', 'м.п.', 'шт', 'кг', 'т')`);
        await queryRunner.query(`CREATE TABLE "work_type" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "unit" "public"."work_type_unit_enum" NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_3906cb061b122c41de5349c7935" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "work_log" ("id" SERIAL NOT NULL, "amount" numeric NOT NULL, "performedAt" date NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "workTypeId" integer NOT NULL, "employeeId" integer NOT NULL, CONSTRAINT "PK_65e2816b0d0876024e3754656b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "work_log" ADD CONSTRAINT "FK_df78e1b01e49e1436289cd1a485" FOREIGN KEY ("workTypeId") REFERENCES "work_type"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_log" ADD CONSTRAINT "FK_5af97d872c22e1ef0d6646000da" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_log" DROP CONSTRAINT "FK_5af97d872c22e1ef0d6646000da"`);
        await queryRunner.query(`ALTER TABLE "work_log" DROP CONSTRAINT "FK_df78e1b01e49e1436289cd1a485"`);
        await queryRunner.query(`DROP TABLE "work_log"`);
        await queryRunner.query(`DROP TABLE "work_type"`);
        await queryRunner.query(`DROP TYPE "public"."work_type_unit_enum"`);
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`DROP TYPE "public"."employee_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."employee_role_enum"`);
    }

}
