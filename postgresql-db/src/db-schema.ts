import { relations } from 'drizzle-orm';
import { jsonb, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const jobs = pgTable('jobs', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull(),
    creationTime: timestamp('creation_time').notNull().defaultNow(),
    company: varchar('company', { length: 255 }).notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    location: varchar('location', { length: 255 }).notNull(),
    listingUrl: varchar('listing_url', { length: 510 }).notNull(),
    listingDate: timestamp('listing_date').notNull(),
    description: text('description').notNull(),
    notes: jsonb('notes').$type<Array<{
        id: string;
        date: string;
        title: string;
        content: string;
    }>>().notNull().default([]),
    statusHistory: jsonb('status_history').$type<Array<{
        date: string;
        status: 'SAVED' | 'APPLIED' | 'CORRESPONDING' | 'INTERVIEWING' | 'OFFER_RECEIVED' | 
         'OFFER_ACCEPTED' | 'REJECTED' | 'STALE' | 'ARCHIVED';
    }>>().notNull().default([]),
});

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    passwordHash: varchar('password_hash', { length: 255 }).notNull(),
    createdDate: timestamp('created_date').notNull().defaultNow(),
});

relations(jobs, ({ one }) => ({
    user: one(users, {
        fields: [jobs.userId],
        references: [users.id],
    }),
}));

relations(users, ({ many }) => ({
    jobs: many(jobs),
}));
