/*
  Warnings:

  - You are about to alter the column `name` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(75)`.
  - You are about to alter the column `name` on the `Element` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(75)`.
  - You are about to alter the column `type` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(75)`.
  - You are about to alter the column `short_Description` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(300)`.
  - You are about to alter the column `all_company` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(75)`.
  - You are about to alter the column `headquarters` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(75)`.
  - You are about to alter the column `first_platoon` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(75)`.
  - You are about to alter the column `sec_platoon` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(75)`.
  - You are about to alter the column `third_platoon` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(75)`.
  - You are about to alter the column `fourth_platoon` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(75)`.
  - You are about to alter the column `maintenance` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(75)`.
  - You are about to alter the column `name` on the `File` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(75)`.
  - You are about to alter the column `descriptions` on the `File` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(300)`.
  - You are about to alter the column `title` on the `Posts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(75)`.
  - You are about to alter the column `content` on the `Posts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(2000)`.
  - You are about to alter the column `name` on the `Section` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(75)`.
  - The `rank` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(75)`.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(75)`.
  - You are about to alter the column `address1` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - You are about to alter the column `address2` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - You are about to alter the column `city` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(75)`.
  - You are about to alter the column `state` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(75)`.
  - The `ftStaff` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `can_access` on the `Usergrp` table. All the data in the column will be lost.
  - You are about to drop the column `can_access_cp` on the `Usergrp` table. All the data in the column will be lost.
  - The `name` column on the `Usergrp` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `description` on the `Usergrp` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(300)`.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Rank" AS ENUM ('PVT', 'PFC', 'SPC', 'SGT', 'SSG', 'SFC', 'MSG', 'FSGT', 'CSM', 'SLT', 'FLT', 'CPT', 'MAJ', 'LTCOL', 'COL', 'GEN');

-- CreateEnum
CREATE TYPE "Access" AS ENUM ('ADMIN', 'LEADER', 'USER');

-- CreateEnum
CREATE TYPE "FullTime" AS ENUM ('FULL', 'TPU');

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "name" SET DATA TYPE VARCHAR(75),
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Element" ALTER COLUMN "name" SET DATA TYPE VARCHAR(75),
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "type" SET DATA TYPE VARCHAR(75),
ALTER COLUMN "short_Description" SET DATA TYPE VARCHAR(300),
ALTER COLUMN "all_company" SET DATA TYPE VARCHAR(75),
ALTER COLUMN "headquarters" SET DATA TYPE VARCHAR(75),
ALTER COLUMN "first_platoon" SET DATA TYPE VARCHAR(75),
ALTER COLUMN "sec_platoon" SET DATA TYPE VARCHAR(75),
ALTER COLUMN "third_platoon" SET DATA TYPE VARCHAR(75),
ALTER COLUMN "fourth_platoon" SET DATA TYPE VARCHAR(75),
ALTER COLUMN "maintenance" SET DATA TYPE VARCHAR(75),
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "File" ALTER COLUMN "name" SET DATA TYPE VARCHAR(75),
ALTER COLUMN "descriptions" SET DATA TYPE VARCHAR(300),
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Posts" ALTER COLUMN "title" SET DATA TYPE VARCHAR(75),
ALTER COLUMN "content" SET DATA TYPE VARCHAR(2000),
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Section" ALTER COLUMN "name" SET DATA TYPE VARCHAR(75),
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "requestReg" BOOLEAN,
DROP COLUMN "rank",
ADD COLUMN     "rank" "Rank" NOT NULL DEFAULT 'PVT',
ALTER COLUMN "name" SET DATA TYPE VARCHAR(75),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(75),
ALTER COLUMN "address1" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "address2" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "city" SET DATA TYPE VARCHAR(75),
ALTER COLUMN "state" SET DATA TYPE VARCHAR(75),
DROP COLUMN "ftStaff",
ADD COLUMN     "ftStaff" "FullTime" NOT NULL DEFAULT 'TPU',
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Usergrp" DROP COLUMN "can_access",
DROP COLUMN "can_access_cp",
ADD COLUMN     "access" "Access" NOT NULL DEFAULT 'USER',
DROP COLUMN "name",
ADD COLUMN     "name" "Access" NOT NULL DEFAULT 'USER',
ALTER COLUMN "description" SET DATA TYPE VARCHAR(300),
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Product";

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
