# Migration `20201102191310`

This migration has been generated by Angad Singh at 11/3/2020, 12:43:10 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE `UserAttempts` (
`id` int  NOT NULL  AUTO_INCREMENT,
`created_at` datetime(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
`updated_at` datetime(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
`level` int  NOT NULL DEFAULT 0,
`attempt` varchar(191)  NOT NULL ,
`userId` int  NOT NULL ,
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

ALTER TABLE `UserAttempts` ADD FOREIGN KEY (`userId`) REFERENCES `UserMeta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201102153638-user-level..20201102191310
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
@@ -114,4 +114,14 @@
   solvedAt  DateTime?
   userId    Int
   user      UserMeta  @relation(fields: [userId], references: [id])
 }
+
+model UserAttempts {
+  id        Int       @id @default(autoincrement())
+  createdAt DateTime  @default(now()) @map(name: "created_at")
+  updatedAt DateTime  @default(now()) @map(name: "updated_at")
+  level     Int       @default(0)
+  attempt   String
+  userId    Int
+  user      UserMeta  @relation(fields: [userId], references: [id])
+}
```


