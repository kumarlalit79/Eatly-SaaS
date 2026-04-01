/*
  Warnings:

  - You are about to alter the column `health_score` on the `dish_results` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - You are about to alter the column `rank` on the `recommendations` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.

*/
-- AlterTable
ALTER TABLE "dish_results" ALTER COLUMN "health_score" SET DATA TYPE SMALLINT;

-- AlterTable
ALTER TABLE "recommendations" ALTER COLUMN "rank" SET DATA TYPE SMALLINT;
