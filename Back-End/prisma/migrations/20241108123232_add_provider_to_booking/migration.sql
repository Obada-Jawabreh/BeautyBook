/*
  Warnings:

  - Added the required column `providerId` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bookings` ADD COLUMN `providerId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_providerId_fkey` FOREIGN KEY (`providerId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
