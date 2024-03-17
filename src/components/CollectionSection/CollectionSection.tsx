import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import api from 'src/api';
import RecipeTile from 'src/components/RecipeTile';
import Section from 'src/components/Section';
import { includeResizeQueryParameters } from 'src/utils/imageUtils';

const CollectionSection = ({ collection }) => {
  const navigate = useNavigate();

  const {
    isFetching: loadingRecipes,
    data: recipes,
  } = useQuery({
    queryKey: ["collection", collection.id, "recipes"],
    queryFn: () => api.getRecipes(
      undefined,
      true,
      [],
      [],
      [],
      [collection.id],
      undefined,
      undefined,
      [],
      [],
      [],
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      1, 25,
    )
      .then((data) => data.results),
    initialData: []
  })

  /* Handlers */
  const handleRecipeClick = (id: string) => {
    navigate(`/recipes/${id}`);
  };

  const handleSeeAllClick = () => {
    navigate(`/recipes`, {
      state: {
        filters: {
          collectionIds: [collection.id],
        },
      },
    });
  }

  /* Rendering */
  const renderRecipeTile = (recipe) => (
    <Box
      key={uuid()}
      sx={{
        maxWidth: 140,
      }}
    >
      <RecipeTile
        key={recipe.id}
        recipe={{
          ...recipe,
          images: recipe.images.map((image) => ({
            ...image,
            url: includeResizeQueryParameters(image.url, 300, 0)
          }))
        }}
        onClick={handleRecipeClick}
      />
    </Box>
  );

  return (
    <Section
      title={collection.title}
      showSeeAll={recipes.length < totalRecipes}
      loading={loadingRecipes}
      onSeeAllClick={handleSeeAllClick}
    >
      {recipes.map((recipe) => renderRecipeTile(recipe))}
    </Section>
  )
}

export default CollectionSection;
