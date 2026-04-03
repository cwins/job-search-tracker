import { relations } from 'drizzle-orm';
import { boolean, integer, jsonb, pgTable, text, timestamp, uuid, varchar, unique } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    username: varchar('username', { length: 255 }).notNull().unique(),
    passwordHash: varchar('password_hash', { length: 255 }).notNull(),
    createdDate: timestamp('created_date').notNull().defaultNow(),
});

export const recipes = pgTable('recipes', {
    id: uuid('id').primaryKey().defaultRandom(),
    authorId: uuid('author_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 255 }).notNull(),
    prepTimeMinutes: integer('prep_time_minutes').notNull(),
    cookTimeMinutes: integer('cook_time_minutes').notNull(),
    ingredients: jsonb('ingredients').$type<string[]>().notNull().default([]),
    directions: text('directions').notNull(),
    published: boolean('published').notNull().default(false),
    createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const recipeSaves = pgTable(
    'recipe_saves',
    {
        userId: uuid('user_id')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
        recipeId: uuid('recipe_id')
            .notNull()
            .references(() => recipes.id, { onDelete: 'cascade' }),
        savedAt: timestamp('saved_at').notNull().defaultNow(),
    },
    (t) => [unique('recipe_saves_user_recipe').on(t.userId, t.recipeId)]
);

relations(recipes, ({ one, many }) => ({
    author: one(users, {
        fields: [recipes.authorId],
        references: [users.id],
    }),
    saves: many(recipeSaves),
}));

relations(recipeSaves, ({ one }) => ({
    user: one(users, {
        fields: [recipeSaves.userId],
        references: [users.id],
    }),
    recipe: one(recipes, {
        fields: [recipeSaves.recipeId],
        references: [recipes.id],
    }),
}));

relations(users, ({ many }) => ({
    recipes: many(recipes),
    recipeSaves: many(recipeSaves),
}));
