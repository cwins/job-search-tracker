import type { QueryResolvers } from '../generated/types';
import type { RequestContext } from '../types';

export const getJobs: QueryResolvers['getJobs'] = async (
  _parent,
  args,
  context: RequestContext
) => {
  if (!context.jwt?.payload?.sub) {
    throw new Error('UNAUTHENTICATED');
  }

  const token = context.jwt.token?.value;

  try {
    if (args.filters && Object.keys(args.filters).length > 0) {
      const jobs = await context.services.jobs.getFilteredJobs(args.filters, token);
      
      return jobs || [];
    }

    const jobs = await context.services.jobs.getJobs(token);

    return jobs || [];
  } catch (error) {
    console.error(`Error getting jobs: service=${context.services.jobs.serviceName},`, error);

    return [];
  }
};
