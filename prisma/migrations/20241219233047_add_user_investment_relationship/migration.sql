/*
  Warnings:

  - Added the required column `total` to the `Investment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `investment` ADD COLUMN `total` DOUBLE NOT NULL;
