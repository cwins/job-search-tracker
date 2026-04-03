import { MyRecipes } from '@/components/my-recipes';
import { createFileRoute } from '@tanstack/react-router';

const RouteComponent = () => {
  return <MyRecipes />;
};

export const Route = createFileRoute('/my-recipes')({
  component: RouteComponent,
});
