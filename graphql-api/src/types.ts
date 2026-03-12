import type { YogaInitialContext } from 'graphql-yoga';
import type { JobsService } from './services/jobs/jobs-service';

/** Injected by @graphql-yoga/plugin-jwt when token is present and valid */
export interface JwtContext {
  payload: { sub: string; username?: string; [key: string]: unknown };
  token: { value: string; prefix?: string };
}

export interface ContextWithServices extends YogaInitialContext {
  jwt?: JwtContext;
  services: {
    jobs: JobsService;
  };
}

export type RequestContext = ContextWithServices;
