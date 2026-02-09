import type { Job, JobsFilterInputs } from '../../generated/types';

export abstract class JobsService {
    abstract getJobs(userId: string): Promise<Job[]>;
    abstract getFilteredJobs(userId: string, filters: JobsFilterInputs): Promise<Job[]>;
}
