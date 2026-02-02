import type { QueryResolvers } from "../generated/types";


export const getJobs: QueryResolvers['getJobs'] = async (
    parent,
    args,
    context,
    info
) => {
    // Placeholder implementation
    console.log('parent', parent);
    console.log('args', args);
    console.log('context', context);
    return [];
};
