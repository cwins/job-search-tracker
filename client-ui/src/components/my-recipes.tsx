import {
  Box,
  Button,
  Checkbox,
  Heading,
  Input,
  Table,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useQuery, useMutation } from 'urql';

import { graphql } from '@/__generated';
import { Link } from '@/components/ui/link';

const myRecipesQuery = graphql(/* GraphQL */ `
  query MyRecipesList {
    myRecipes {
      id
      name
      prepTimeMinutes
      cookTimeMinutes
      published
      ingredients
      directions
    }
  }
`);

const createRecipeMutation = graphql(/* GraphQL */ `
  mutation CreateRecipe($input: CreateRecipeInput!) {
    createRecipe(input: $input) {
      id
    }
  }
`);

const updateRecipeMutation = graphql(/* GraphQL */ `
  mutation UpdateRecipe($id: ID!, $input: UpdateRecipeInput!) {
    updateRecipe(id: $id, input: $input) {
      id
      published
    }
  }
`);

const deleteRecipeMutation = graphql(/* GraphQL */ `
  mutation DeleteRecipe($id: ID!) {
    deleteRecipe(id: $id)
  }
`);

function parseIngredients(text: string): string[] {
  return text
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
}

export const MyRecipes: React.FC = () => {
  const navigate = useNavigate();
  const [{ data, fetching, error }, reexecute] = useQuery({ query: myRecipesQuery });
  const [, createRecipe] = useMutation(createRecipeMutation);
  const [, updateRecipe] = useMutation(updateRecipeMutation);
  const [, deleteRecipe] = useMutation(deleteRecipeMutation);

  const [name, setName] = useState('');
  const [prep, setPrep] = useState('');
  const [cook, setCook] = useState('');
  const [ingredientsText, setIngredientsText] = useState('');
  const [directions, setDirections] = useState('');
  const [publishNow, setPublishNow] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const rows = data?.myRecipes ?? [];

  const resetForm = () => {
    setName('');
    setPrep('');
    setCook('');
    setIngredientsText('');
    setDirections('');
    setPublishNow(false);
    setEditingId(null);
  };

  const startEdit = (id: string) => {
    const r = rows.find((x) => x.id === id);
    if (!r) return;
    setEditingId(id);
    setName(r.name);
    setPrep(String(r.prepTimeMinutes));
    setCook(String(r.cookTimeMinutes));
    setPublishNow(r.published);
    setIngredientsText(r.ingredients.join('\n'));
    setDirections(r.directions);
  };

  const submit = async () => {
    const prepN = parseInt(prep, 10);
    const cookN = parseInt(cook, 10);
    if (!name.trim() || Number.isNaN(prepN) || Number.isNaN(cookN) || !directions.trim()) {
      return;
    }
    const ingredients = parseIngredients(ingredientsText);
    if (editingId) {
      await updateRecipe({
        id: editingId,
        input: {
          name: name.trim(),
          prepTimeMinutes: prepN,
          cookTimeMinutes: cookN,
          ingredients,
          directions: directions.trim(),
          published: publishNow,
        },
      });
    } else {
      await createRecipe({
        input: {
          name: name.trim(),
          prepTimeMinutes: prepN,
          cookTimeMinutes: cookN,
          ingredients,
          directions: directions.trim(),
          published: publishNow,
        },
      });
    }
    resetForm();
    reexecute({ requestPolicy: 'network-only' });
  };

  const togglePublish = async (id: string, published: boolean) => {
    await updateRecipe({ id, input: { published: !published } });
    reexecute({ requestPolicy: 'network-only' });
  };

  const remove = async (id: string) => {
    await deleteRecipe({ id });
    reexecute({ requestPolicy: 'network-only' });
  };

  if (error && !data) {
    return (
      <VStack align="start" gap="2">
        <Heading size="lg">My recipes</Heading>
        <Text>You need to be logged in to view your recipes.</Text>
        <Link to="/login">Go to login</Link>
      </VStack>
    );
  }

  return (
    <VStack gap="8" align="stretch">
      <Heading size="lg">My recipes</Heading>
      <Text color="fg.muted">Create drafts, publish when ready, or open a recipe to edit the fields below.</Text>

      <Box borderWidth="1px" rounded="md" p="4">
        <Heading size="sm" mb="3">
          {editingId ? 'Edit recipe' : 'New recipe'}
        </Heading>
        <VStack gap="3" align="stretch" maxW="lg">
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Prep time (minutes)" type="number" value={prep} onChange={(e) => setPrep(e.target.value)} />
          <Input placeholder="Cook time (minutes)" type="number" value={cook} onChange={(e) => setCook(e.target.value)} />
          <Textarea
            placeholder="Ingredients (one per line)"
            rows={5}
            value={ingredientsText}
            onChange={(e) => setIngredientsText(e.target.value)}
          />
          <Textarea placeholder="Directions" rows={6} value={directions} onChange={(e) => setDirections(e.target.value)} />
          <Checkbox.Root checked={publishNow} onCheckedChange={(d) => setPublishNow(!!d.checked)}>
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>Published (visible in browse)</Checkbox.Label>
          </Checkbox.Root>
          <Box display="flex" gap="2">
            <Button onClick={() => void submit()}>{editingId ? 'Save changes' : 'Create recipe'}</Button>
            {editingId && (
              <Button variant="outline" onClick={resetForm}>
                Cancel edit
              </Button>
            )}
          </Box>
        </VStack>
      </Box>

      {fetching && <Text>Loading…</Text>}

      <Table.Root size="sm">
        <Table.Header>
          <Table.Row bg="bg.subtle">
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Prep</Table.ColumnHeader>
            <Table.ColumnHeader>Cook</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((r) => (
            <Table.Row key={r.id}>
              <Table.Cell
                cursor="pointer"
                textDecor="underline"
                onClick={() => navigate({ to: '/recipe/$recipeId', params: { recipeId: r.id } })}
              >
                {r.name}
              </Table.Cell>
              <Table.Cell>{r.prepTimeMinutes}</Table.Cell>
              <Table.Cell>{r.cookTimeMinutes}</Table.Cell>
              <Table.Cell>{r.published ? 'Published' : 'Draft'}</Table.Cell>
              <Table.Cell>
                <Button size="xs" me="1" onClick={() => startEdit(r.id)}>
                  Edit
                </Button>
                <Button size="xs" variant="outline" me="1" onClick={() => void togglePublish(r.id, r.published)}>
                  {r.published ? 'Unpublish' : 'Publish'}
                </Button>
                <Button size="xs" variant="surface" colorPalette="red" onClick={() => void remove(r.id)}>
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </VStack>
  );
};
