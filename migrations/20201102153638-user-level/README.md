# Migration `20201102153638-user-level`

This migration has been generated by Angad Singh at 11/2/2020, 9:06:38 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE `UserLevel` (
`id` int  NOT NULL  AUTO_INCREMENT,
`created_at` datetime(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
`updated_at` datetime(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
`level` int  NOT NULL DEFAULT 0,
`active` boolean  NOT NULL DEFAULT true,
`solved` boolean  NOT NULL DEFAULT false,
`solvedAt` datetime(3)  ,
`userId` int  NOT NULL ,
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

ALTER TABLE `UserLevel` ADD FOREIGN KEY (`userId`) REFERENCES `UserMeta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201101182749-user-meta-keys..20201102153638-user-level
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "mysql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -102,4 +102,16 @@
   node      Int      @default(0)
   userId    Int
   user      UserMeta @relation(fields: [userId], references: [id])
 }
+
+model UserLevel {
+  id        Int       @id @default(autoincrement())
+  createdAt DateTime  @default(now()) @map(name: "created_at")
+  updatedAt DateTime  @default(now()) @map(name: "updated_at")
+  level     Int       @default(0)
+  active    Boolean   @default(true)
+  solved    Boolean   @default(false)
+  solvedAt  DateTime?
+  userId    Int
+  user      UserMeta  @relation(fields: [userId], references: [id])
+}
```


