/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `BlogPost` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_url_key" ON "BlogPost"("url");
