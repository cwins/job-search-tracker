import { JobsTable } from '@/components/jobs-table';
import { createFileRoute } from '@tanstack/react-router';

const RouteComponent = () => {
  return <JobsTable />;
};

export const Route = createFileRoute('/')({
  component: RouteComponent
});
