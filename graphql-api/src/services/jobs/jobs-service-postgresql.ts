import type { JobsFilterInputs } from '../../generated/types';
import { JobsService } from './jobs-service';

const ENDPOINT = process.env.JOBS_API_ENDPOINT || 'http://localhost:4001';

export class JobsServicePostgreSQL extends JobsService {
    readonly serviceName = 'JobsServicePostgreSQL';

    async getJobs(token?: string) {
        const response = await fetch(`${ENDPOINT}/jobs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify({}),
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

    async getFilteredJobs(filters: JobsFilterInputs, token?: string) {
        const response = await fetch(`${ENDPOINT}/jobs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify({ ...filters }),
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