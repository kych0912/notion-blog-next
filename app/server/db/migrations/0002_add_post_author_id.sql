ALTER TABLE "post" ADD COLUMN IF NOT EXISTS "authorId" varchar;
--> statement-breakpoint
UPDATE "post"
SET "authorId" = u."id"
FROM "user" u
WHERE "post"."authorId" IS NULL
  AND "post"."author" = u."name";
--> statement-breakpoint
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'post_authorId_user_id_fk'
  ) THEN
    ALTER TABLE "post"
    ADD CONSTRAINT "post_authorId_user_id_fk"
    FOREIGN KEY ("authorId") REFERENCES "public"."user"("id")
    ON DELETE no action ON UPDATE no action;
  END IF;
END $$;


