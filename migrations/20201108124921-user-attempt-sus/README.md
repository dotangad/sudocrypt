# Migration `20201108124921-user-attempt-sus`

This migration has been generated by Angad Singh at 11/8/2020, 6:19:21 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE `UserAttempts` ADD COLUMN `sus` boolean  NOT NULL DEFAULT false
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201104175506-command-user-agent..20201108124921-user-attempt-sus
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
@@ -124,6 +124,7 @@
   updatedAt DateTime  @default(now()) @map(name: "updated_at")
   level     Int       @default(0)
   attempt   String
   userId    Int
+  sus       Boolean   @default(false)
   user      UserMeta  @relation(fields: [userId], references: [id])
 }
```

