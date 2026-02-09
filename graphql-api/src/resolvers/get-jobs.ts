import type { QueryResolvers } from "../generated/types";
import type { RequestContext } from "../types";


export const getJobs: QueryResolvers['getJobs'] = async (
    parent,
    args,
    context: RequestContext,
) => {
    if (args.userId) {
        if (args.filters && Object.keys(args.filters).length > 0) {
            return context.services.jobs.getFilteredJobs(args.userId, args.filters);
        }

        return context.services.jobs.getJobs(args.userId);
    }

    return [];
};
