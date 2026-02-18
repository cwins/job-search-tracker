import { JobDetail } from '@/components/job-detail';
import { createFileRoute } from '@tanstack/react-router';

const RouteComponent = () => {
  const { jobId } = Route.useParams();

  return <JobDetail jobId={jobId} />;
};

export const Route = createFileRoute('/job/$jobId')({
  component: RouteComponent
});
