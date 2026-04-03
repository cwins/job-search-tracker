import { RecipeDetail } from '@/components/recipe-detail';
import { createFileRoute } from '@tanstack/react-router';

const RouteComponent = () => {
  const { recipeId } = Route.useParams();

  return <RecipeDetail recipeId={recipeId} />;
};

export const Route = createFileRoute('/recipe/$recipeId')({
  component: RouteComponent,
});
