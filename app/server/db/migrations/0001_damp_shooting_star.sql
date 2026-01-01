DO $$
DECLARE
  pk_name text;
BEGIN
  SELECT pc.conname
    INTO pk_name
  FROM pg_constraint pc
  JOIN pg_class c ON c.oid = pc.conrelid
  JOIN pg_namespace n ON n.oid = c.relnamespace
  WHERE n.nspname = 'public'
    AND c.relname = 'user'
    AND pc.contype = 'p';

  IF pk_name IS NOT NULL THEN
    EXECUTE format('ALTER TABLE "user" DROP CONSTRAINT %I', pk_name);
  END IF;
END $$;
--> statement-breakpoint
UPDATE "user"
SET "id" = "seq"::varchar
WHERE "id" IS NULL;
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET NOT NULL;
--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");
--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "seq";
--> statement-breakpoint
DROP SEQUENCE IF EXISTS "user_seq_seq";