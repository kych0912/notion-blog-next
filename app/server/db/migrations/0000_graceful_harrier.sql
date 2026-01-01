CREATE TABLE "category" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post" (
	"date" timestamp with time zone DEFAULT now() NOT NULL,
	"author" varchar NOT NULL,
	"title" varchar,
	"image" text,
	"avatar" text,
	"description" text,
	"id" text PRIMARY KEY NOT NULL,
	"category" uuid
);
--> statement-breakpoint
CREATE TABLE "user" (
	"seq" bigint PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"password" varchar,
	"avatar" text,
	"email" varchar,
	"id" varchar,
	CONSTRAINT "user_password_key" UNIQUE("password")
);
--> statement-breakpoint
ALTER TABLE "post" ADD CONSTRAINT "post_category_category_id_fk" FOREIGN KEY ("category") REFERENCES "public"."category"("id") ON DELETE no action ON UPDATE no action;