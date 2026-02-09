import type { JobsFilterInputs } from '../../generated/types';
import { JobsService } from './jobs-service';

const ENDPOINT = process.env.JOBS_API_ENDPOINT || 'http://localhost:4001';

export class JobsServicePostgreSQL extends JobsService {
    async getJobs(userId: string) {
        console.log('Fetching jobs for user');

        const response = await fetch(`${ENDPOINT}/jobs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        }).then((res) => {
            if (!res.ok) {
                throw new Error(`Fetch error: ${res.statusText || 'unknown reason'}`);
            }

            return res;
        }).
        catch((error) => {
            console.error('Error fetching jobs:', error);
            
            return {
                json() {
                    return [];
                }
            }
        });

        return response.json();
    }

    async getFilteredJobs(userId: string, filters: JobsFilterInputs) {
        console.log('Fetching filtered jobs for user:', filters);

        const response = await fetch(`${ENDPOINT}/jobs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, ...filters }),
        }).then((res) => {
            if (!res.ok) {
                throw new Error(`Fetch error: ${res.statusText || 'unknown reason'}`);
            }

            return res;
        }).catch((error) => {
            console.error('Error fetching filtered jobs:', error);
            
            return {
                json() {
                    return [];
                }
            }
        });

        return response.json();
    }
}