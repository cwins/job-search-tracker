import { createFileRoute } from '@tanstack/react-router'

const RouteComponent = () => {
  return <div>Hello "/jobs"!</div>
}

export const Route = createFileRoute('/jobs')({
  component: RouteComponent,
});
