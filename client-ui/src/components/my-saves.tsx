import { Heading, Table, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import { useQuery } from 'urql';

import { graphql } from '@/__generated';
import { Link } from '@/components/ui/link';

const mySavedQuery = graphql(/* GraphQL */ `
  query MySavedRecipesList {
    mySavedRecipes {
      id
      name
      prepTimeMinutes
      cookTimeMinutes
      authorUsername
    }
  }
`);

export const MySaves: React.FC = () => {
  const navigate = useNavigate();
  const [{ data, fetching, error }] = useQuery({ query: mySavedQuery });

  const rows = data?.mySavedRecipes ?? [];

  if (error && !data) {
    return (
      <VStack align="start" gap="2">
        <Heading size="lg">My saves</Heading>
        <Text>Log in to see recipes you have saved.</Text>
        <Link to="/login">Go to login</Link>
      </VStack>
    );
  }

  return (
    <VStack gap="6" align="stretch">
      <Heading size="lg">My saves</Heading>
      <Text color="fg.muted">Recipes you have favorited from browse.</Text>

      {fetching && <Text>Loading…</Text>}

      <Table.Root interactive size="sm">
        <Table.Header>
          <Table.Row bg="bg.subtle">
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Author</Table.ColumnHeader>
            <Table.ColumnHeader>Prep</Table.ColumnHeader>
            <Table.ColumnHeader>Cook</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((r) => (
            <Table.Row
              key={r.id}
              cursor="pointer"
              onClick={() => navigate({ to: '/recipe/$recipeId', params: { recipeId: r.id } })}
            >
              <Table.Cell fontWeight="medium">{r.name}</Table.Cell>
              <Table.Cell>{r.authorUsername}</Table.Cell>
              <Table.Cell>{r.prepTimeMinutes}</Table.Cell>
              <Table.Cell>{r.cookTimeMinutes}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      {!fetching && rows.length === 0 && <Text color="fg.muted">No saved recipes yet. Browse and hit “Save recipe”.</Text>}
    </VStack>
  );
};
