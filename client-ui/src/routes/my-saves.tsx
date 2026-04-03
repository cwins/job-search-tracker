import { MySaves } from '@/components/my-saves';
import { createFileRoute } from '@tanstack/react-router';

const RouteComponent = () => {
  return <MySaves />;
};

export const Route = createFileRoute('/my-saves')({
  component: RouteComponent,
});
