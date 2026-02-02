import { jsonb, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const jobs = pgTable('jobs', {
    id: uuid('id').primaryKey().defaultRandom(),
    company: varchar('company', { length: 255 }).notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    url: varchar('url', { length: 510 }).notNull(),
    location: varchar('location', { length: 255 }).notNull(),
    description: text('description').notNull(),
    createdDate: timestamp('created_date').notNull().defaultNow(),
    notes: jsonb('notes').$type<Array<{
        date: string;
        title: string;
        content: string;
    }>>().notNull().default([]),
    statusHistory: jsonb('status_history').$type<Array<{
        date: string;
        status: 'SAVED' | 'APPLIED' | 'CORRESPONDING' | 'INTERVIEWING' | 'OFFERED' | 'REJECTED' | 'STALE' | 'ARCHIVED';
    }>>().notNull().default([{ date: new Date().toISOString(), status: 'SAVED' }]),
});
