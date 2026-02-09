import type { YogaInitialContext } from 'graphql-yoga';
import type { JobsService } from './services/jobs/jobs-service';

export interface ContextWithServices {
    services: {
        jobs: JobsService;
    }
}

export interface RequestContext extends YogaInitialContext, ContextWithServices {};
