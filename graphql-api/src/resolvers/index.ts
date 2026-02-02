import type { QueryResolvers } from '../generated/types';
import { getJobs } from './get-jobs';

const queryResolvers: QueryResolvers = {
    getJobs,
};

export default {
    Query: queryResolvers
};
