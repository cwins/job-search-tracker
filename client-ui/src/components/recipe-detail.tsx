import { Box, Button, Heading, Separator, Text, VStack } from '@chakra-ui/react';
import { useQuery, useMutation } from 'urql';

import { graphql } from '@/__generated';
import { useAuth } from '@/auth/auth-context';
import { Link } from '@/components/ui/link';

const recipeDetailQuery = graphql(/* GraphQL */ `
  query RecipeDetail($id: ID!) {
    recipe(id: $id) {
      id
      name
      prepTimeMinutes
      cookTimeMinutes
      ingredients
      directions
      published
      authorUsername
      authorId
    }
  }
`);

const mySavedIdsQuery = graphql(/* GraphQL */ `
  query MySavedIds {
    mySavedRecipes {
      id
    }
  }
`);

const favoriteMutation = graphql(/* GraphQL */ `
  mutation FavoriteRecipe($id: ID!) {
    favoriteRecipe(id: $id)
  }
`);

const unfavoriteMutation = graphql(/* GraphQL */ `
  mutation UnfavoriteRecipe($id: ID!) {
    unfavoriteRecipe(id: $id)
  }
`);

interface RecipeDetailProps {
  recipeId: string;
}

export const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipeId }) => {
  const { user } = useAuth();
  const [{ data, fetching, error }] = useQuery({
    query: recipeDetailQuery,
    variables: { id: recipeId },
  });
  const [{ data: savedData }, reexecuteSaved] = useQuery({
    query: mySavedIdsQuery,
    pause: !user,
  });
  const [, doFavorite] = useMutation(favoriteMutation);
  const [, doUnfavorite] = useMutation(unfavoriteMutation);

  const savedIds = new Set((savedData?.mySavedRecipes ?? []).map((r) => r.id));
  const isSaved = savedIds.has(recipeId);

  const recipe = data?.recipe;

  if (fetching && !recipe) {
    return <Text>Loading…</Text>;
  }

  if (error || !recipe) {
    return (
      <VStack align="start" gap="2">
        <Heading size="lg">Recipe not found</Heading>
        <Text color="fg.muted">It may be unpublished or the link is invalid.</Text>
      </VStack>
    );
  }

  const toggleSave = async () => {
    if (!user) return;
    if (isSaved) {
      await doUnfavorite({ id: recipeId });
    } else {
      await doFavorite({ id: recipeId });
    }
    reexecuteSaved({ requestPolicy: 'network-only' });
  };

  return (
    <VStack gap="6" align="stretch" maxW="3xl">
      <Box>
        <Heading size="xl">{recipe.name}</Heading>
        <Text color="fg.muted" mt="1">
          By {recipe.authorUsername} · Prep {recipe.prepTimeMinutes} min · Cook {recipe.cookTimeMinutes} min
          {!recipe.published && ' · Draft'}
        </Text>
      </Box>

      {user && recipe.published && (
        <Button size="sm" w="fit-content" variant={isSaved ? 'outline' : 'solid'} onClick={() => void toggleSave()}>
          {isSaved ? 'Remove from saves' : 'Save recipe'}
        </Button>
      )}

      {!user && recipe.published && (
        <Text fontSize="sm" color="fg.muted">
          <Link to="/login">Log in</Link> to save this recipe.
        </Text>
      )}

      <Separator />

      <Box>
        <Heading size="md" mb="2">
          Ingredients
        </Heading>
        <VStack align="start" gap="1">
          {recipe.ingredients.map((line, i) => (
            <Text key={i}>• {line}</Text>
          ))}
        </VStack>
      </Box>

      <Box>
        <Heading size="md" mb="2">
          Directions
        </Heading>
        <Text whiteSpace="pre-wrap">{recipe.directions}</Text>
      </Box>
    </VStack>
  );
};
