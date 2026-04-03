import { RecipeBrowse } from '@/components/recipe-browse';
import { createFileRoute } from '@tanstack/react-router';

const RouteComponent = () => {
  return <RecipeBrowse />;
};

export const Route = createFileRoute('/')({
  component: RouteComponent,
});
