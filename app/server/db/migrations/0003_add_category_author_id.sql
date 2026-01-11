ALTER TABLE "category" ADD COLUMN IF NOT EXISTS "authorId" varchar;
--> statement-breakpoint
UPDATE "category" c
SET "authorId" = sub."authorId"
FROM (
  SELECT DISTINCT ON (p."category")
    p."category" AS "categoryId",
    p."authorId"
  FROM "post" p
  WHERE p."category" IS NOT NULL
    AND p."authorId" IS NOT NULL
  ORDER BY p."category", p."date" ASC
) sub
WHERE c."authorId" IS NULL
  AND c."id" = sub."categoryId";
--> statement-breakpoint
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'category_authorId_user_id_fk'
  ) THEN
    ALTER TABLE "category"
    ADD CONSTRAINT "category_authorId_user_id_fk"
    FOREIGN KEY ("authorId") REFERENCES "public"."user"("id")
    ON DELETE no action ON UPDATE no action;
  END IF;
END $$;


