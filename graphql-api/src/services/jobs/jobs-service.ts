import type { Job, JobsFilterInputs } from '../../generated/types';
import { Service } from '../service';

export abstract class JobsService extends Service {
    abstract getJobs(token?: string): Promise<Job[]>;
    abstract getFilteredJobs(filters: JobsFilterInputs, token?: string): Promise<Job[]>;
}
