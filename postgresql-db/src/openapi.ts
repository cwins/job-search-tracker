import { createSchemaFactory } from 'drizzle-zod'; // drizzle-orm will soon be replaced -- https://orm.drizzle.team/docs/zod
import { z, createRoute } from '@hono/zod-openapi';

import { jobs, users } from './db-schema';

const createSelectSchema = createSchemaFactory({ zodInstance: z }).createSelectSchema;

export const JobSchema = createSelectSchema(jobs).openapi('Job', {
    title: 'Job',
    description: 'A job being tracked by the user'
}).array();

export const UserSchema = createSelectSchema(users).openapi('User', {
    title: 'User',
    description: 'A user of the job tracking application'
});

export const jobsRoute = createRoute({
    method: 'post',
    path: '/jobs',
    request: {
        body: {
            content: {
                'application/json': {
                    schema: z.object({
                        userId: z.string().min(1).openapi('userId'),
                        title: z.union([z.string().min(1), z.array(z.string().min(1))]).optional(),
                        company: z.union([z.string().min(1), z.array(z.string().min(1))]).optional(),
                        location: z.union([z.string().min(1), z.array(z.string().min(1))]).optional(),
                        status: z.union([z.string().min(1), z.array(z.string().min(1))]).optional(),
                    }).openapi('JobsInputs')
                }
            },
            required: true,
            description: 'The userId is a required input, while the other fields are optional filters'
        }
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: JobSchema
                }
            },
            description: 'A list of jobs matching the provided user and filters (if provided)'
        }
    },
    description: 'Retrieve jobs for a given user'
});
