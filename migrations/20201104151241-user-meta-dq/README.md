# Migration `20201104151241-user-meta-dq`

This migration has been generated by Angad Singh at 11/4/2020, 8:42:41 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE `UserMeta` ADD COLUMN `dq` boolean  NOT NULL DEFAULT false
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201104041959-last-points-change..20201104151241-user-meta-dq
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
@@ -76,8 +76,9 @@
   admin                   Boolean        @default(false)
   exunite                 Boolean        @default(false)
   institution             String?
   nodeSpecificActionTaken Boolean        @default(false)
+  dq                      Boolean        @default(false)
   currentNode             Int            @default(0)
   keys                    Int            @default(0)
   points                  Int            @default(0)
   lastPointChange         DateTime       @default(now())
```

