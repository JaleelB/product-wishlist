/*
  Warnings:

  - Made the column `imageUrl` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Product` MODIFY `imageUrl` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL;
