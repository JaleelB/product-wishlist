-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_wishlistId_fkey`;

-- DropForeignKey
ALTER TABLE `Wishlist` DROP FOREIGN KEY `Wishlist_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Wishlist` ADD CONSTRAINT `Wishlist_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_wishlistId_fkey` FOREIGN KEY (`wishlistId`) REFERENCES `Wishlist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
