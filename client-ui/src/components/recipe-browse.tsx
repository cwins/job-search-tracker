import { Box, Button, Heading, Input, Table, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { useQuery } from 'urql';

import { graphql } from '@/__generated';

const publishedRecipesQuery = graphql(/* GraphQL */ `
  query PublishedRecipes($filters: RecipesFilterInput) {
    publishedRecipes(filters: $filters) {
      id
      name
      prepTimeMinutes
      cookTimeMinutes
      authorUsername
    }
  }
`);

export const RecipeBrowse: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [authorUsername, setAuthorUsername] = useState('');
  const [maxPrep, setMaxPrep] = useState('');
  const [maxCook, setMaxCook] = useState('');

  const variables = useMemo(() => {
    const filters: {
      name?: string[];
      ingredient?: string[];
      authorUsername?: string[];
      maxPrepTimeMinutes?: number;
      maxCookTimeMinutes?: number;
    } = {};
    if (name.trim()) filters.name = [name.trim()];
    if (ingredient.trim()) filters.ingredient = [ingredient.trim()];
    if (authorUsername.trim()) filters.authorUsername = [authorUsername.trim()];
    const mp = parseInt(maxPrep, 10);
    if (!Number.isNaN(mp)) filters.maxPrepTimeMinutes = mp;
    const mc = parseInt(maxCook, 10);
    if (!Number.isNaN(mc)) filters.maxCookTimeMinutes = mc;
    return Object.keys(filters).length > 0 ? { filters } : { filters: null };
  }, [name, ingredient, authorUsername, maxPrep, maxCook]);

  const [{ data, fetching, error }] = useQuery({ query: publishedRecipesQuery, variables });

  if (error && !data) {
    console.error('PublishedRecipes error:', error);
  }

  const rows = data?.publishedRecipes ?? [];

  return (
    <VStack gap="6" align="stretch">
      <Heading size="lg">Browse recipes</Heading>
      <Text color="fg.muted">Published recipes from all cooks. Sign in to save favorites or add your own.</Text>

      <Box borderWidth="1px" rounded="md" p="4">
        <Heading size="sm" mb="3">
          Filters
        </Heading>
        <VStack gap="3" align="stretch" maxW="md">
          <Input placeholder="Name contains" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Ingredient contains" value={ingredient} onChange={(e) => setIngredient(e.target.value)} />
          <Input placeholder="Author username" value={authorUsername} onChange={(e) => setAuthorUsername(e.target.value)} />
          <Input
            placeholder="Max prep (minutes)"
            type="number"
            value={maxPrep}
            onChange={(e) => setMaxPrep(e.target.value)}
          />
          <Input
            placeholder="Max cook (minutes)"
            type="number"
            value={maxCook}
            onChange={(e) => setMaxCook(e.target.value)}
          />
          <Button size="sm" variant="outline" onClick={() => {
            setName('');
            setIngredient('');
            setAuthorUsername('');
            setMaxPrep('');
            setMaxCook('');
          }}>
            Clear filters
          </Button>
        </VStack>
      </Box>

      {fetching && <Text>Loading…</Text>}

      <Table.Root interactive size="sm">
        <Table.Header>
          <Table.Row bg="bg.subtle">
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Author</Table.ColumnHeader>
            <Table.ColumnHeader>Prep (min)</Table.ColumnHeader>
            <Table.ColumnHeader>Cook (min)</Table.ColumnHeader>
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

      {!fetching && rows.length === 0 && <Text color="fg.muted">No recipes match your filters.</Text>}
    </VStack>
  );
};
