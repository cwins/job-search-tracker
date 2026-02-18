import { createFileRoute } from '@tanstack/react-router';

const RouteComponent = () => {
  return <div>Hello "/login"!</div>;
};

export const Route = createFileRoute('/login')({
  component: RouteComponent
});
