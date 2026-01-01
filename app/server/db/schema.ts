import { relations } from 'drizzle-orm';
import { pgTable, timestamp, varchar, text, unique } from 'drizzle-orm/pg-core';
import { uuid } from 'drizzle-orm/pg-core';

export const post = pgTable('post', {
  date: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
  author: varchar().notNull(),
  title: varchar(),
  image: text(),
  avatar: text(),
  description: text(),
  id: text().primaryKey().notNull(),
  category: uuid().references(() => Category.id),
});

export const user = pgTable(
  'user',
  {
    name: varchar().notNull(),
    password: varchar(),
    avatar: text(),
    email: varchar(),
    id: varchar().primaryKey().notNull(),
  },
  (table) => [unique('user_password_key').on(table.password)],
);

export const Category = pgTable('category', {
  id: uuid().primaryKey().notNull(),
  name: text().notNull(),
  createdAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const postRelations = relations(post, ({ one }) => ({
  category: one(Category, {
    fields: [post.category],
    references: [Category.id],
  }),
  user: one(user, {
    fields: [post.author],
    references: [user.name],
  }),
}));

export const userRelations = relations(user, ({ many }) => ({
  posts: many(post, {
    relationName: 'posts',
  }),
}));

export const categoryRelations = relations(Category, ({ many }) => ({
  posts: many(post, {
    relationName: 'posts',
  }),
}));

export type PostType = typeof post.$inferSelect;
export type UserType = typeof user.$inferSelect;
export type CategoryType = typeof Category.$inferSelect;
