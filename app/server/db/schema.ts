import { pgTable, pgPolicy, timestamp, varchar, text, unique, bigint } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const post = pgTable(
  'post',
  {
    date: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    author: varchar().notNull(),
    title: varchar(),
    image: text(),
    avatar: text(),
    description: text(),
    id: text().primaryKey().notNull(),
  },
  () => [
    pgPolicy('Enable insert for authenticated users only', {
      as: 'permissive',
      for: 'insert',
      to: ['authenticated'],
      withCheck: sql`true`,
    }),
    pgPolicy('Enable read access for all users', {
      as: 'permissive',
      for: 'select',
      to: ['public'],
    }),
  ],
);

export const user = pgTable(
  'user',
  {
    seq: bigint({ mode: 'number' }).primaryKey().generatedByDefaultAsIdentity({
      name: 'user_seq_seq',
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 9223372036854775807,
      cache: 1,
    }),
    name: varchar().notNull(),
    password: varchar(),
    avatar: text(),
    email: varchar(),
    id: varchar(),
  },
  (table) => [unique('user_password_key').on(table.password)],
);

export type PostType = typeof post.$inferSelect;
export type UserType = typeof user.$inferSelect;
