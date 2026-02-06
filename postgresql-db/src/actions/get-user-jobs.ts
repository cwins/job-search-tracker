import { and, eq, ilike, inArray, or, sql } from 'drizzle-orm';
import { jobs, users, type JobStatus } from '../db-schema';
import { db } from '../db-connection';

const HARD_LIMIT = 100;

type NonEmptyString<T> = T extends string ? (T extends '' ? never : T) : T;
type Required<T> = T extends undefined ? never : T;

export interface JobFilters {
    title?: string | string[];
    company?: string | string[];
    location?: string | string[];
    status?: JobStatus | JobStatus[];
}

const hasValue = (value: JobFilters[keyof JobFilters]): value is Required<NonEmptyString<JobFilters[keyof JobFilters]>> => {
    if (Array.isArray(value)) {
        return value.length > 0 && value.every(val => hasValue(val));
    }
    else if (typeof value === 'string') {
        return value.trim() !== '';
    }

    return value !== undefined && value !== null;
}

export const getUserJobs = async (userId: string) => {
    const jobsList = await db.select().from(jobs).where(eq(jobs.userId, userId)).limit(HARD_LIMIT);

    return jobsList;
};

export const getUserJobsWithFilters = async (userId: string, filters: JobFilters) => {
    const { title = '', company = '', location = '', status } = filters;
    const queryFilters = [];

    if (hasValue(filters.title)) {
        if (Array.isArray(title)) {
            queryFilters.push(or(...title.map(entry => ilike(jobs.title, `%${entry}%`))));
        }
        else {
            queryFilters.push(ilike(jobs.title, `%${title}%`));
        }
    }
   
    if (hasValue(company)) {
        if (Array.isArray(company)) {
            queryFilters.push(or(...company.map(entry => ilike(jobs.company, `%${entry}%`))));
        }
        else {
            queryFilters.push(ilike(jobs.company, `%${company}%`));
        }
    }

    if (hasValue(location)) {
        if (Array.isArray(location)) {
            queryFilters.push(or(...location.map(entry => ilike(jobs.location, `%${entry}%`))));
        }
        else {
            queryFilters.push(ilike(jobs.location, `%${location}%`));
        }
    }

    if (hasValue(status)) {
        if (Array.isArray(status)) {
            queryFilters.push(or(...status.map(entry => eq(jobs.status, entry))));
        }
        else {
            queryFilters.push(eq(jobs.status, jobs.status.enumValues.includes(status) ? status : sql`NULL`));
        }
    }

    return db.select().from(jobs).where(and(eq(jobs.userId, userId), ...queryFilters)).limit(HARD_LIMIT);
};
