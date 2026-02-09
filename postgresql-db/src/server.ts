import { Hono } from 'hono';
import { getUserJobs, getUserJobsWithFilters, type JobFilters } from './actions';

const PORT = process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT) : 4001;

interface JobsFilterInputs {
    userId: string;
    company?: string | string[];
    location?: string | string[];
    status?: string | string[];
    title?: string | string[];
}

export function startServer() {
    const app = new Hono();

    app.all('/health', async (ctx) => {
        console.log('Health check requested');
        return ctx.json({ status: 'ok', uptime: process.uptime() }, 200);
    })

    // REST endpoint to retrieve one or more jobs based on column filters like id, title, company, etc. or by search term
    app.post('/jobs', async (ctx) => {
        const inputs = await ctx.req.json<JobsFilterInputs>();
        const { title, company, location, userId, status } = inputs;
        let results = {};

        if (!userId) {
            return ctx.json({ error: 'Missing required parameter: userId' }, 400);
        }

        const filters = Object.entries({ title, company, location, status }).reduce((acc, input) => {
            const [key, value] = input;

            if (value !== undefined && value !== null) {
                return {
                    ...acc,
                    [key]: value
                };
            }

            return acc;
        }, {} as Partial<JobFilters>);

        if (Object.keys(filters).length > 0) {
            results = await getUserJobsWithFilters(userId, filters);
        }
        else {
            results = await getUserJobs(userId);
        }

        return ctx.json(results);
    });

    // REST endpoint to retrieve one or more users based on column filters like id, email, etc.
    // app.get('/users', async (c) => {
    //     const queryParams = c.req.query();
    //     let query = db.select().from(users);

    //     // Apply filters based on query parameters
    //     for (const [key, value] of Object.entries(queryParams)) {
    //         if (key in users && value) {
    //             query = query.where(users[key as keyof typeof users].eq(value as string));
    //         }
    //     }

    //     const results = await query;
    //     return c.json(results);
    // });

    return {
        port: PORT,
        fetch: app.fetch
    }
};
