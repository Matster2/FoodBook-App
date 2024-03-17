import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RecipeForm from 'src/forms/RecipeForm';
import { RecipeState } from 'src/types';
import { includeResizeQueryParameters } from 'src/utils/imageUtils';

const Recipe = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const {
    isFetching: loadingRecipe,
    data: recipe
  } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => api.getRecipe(id)
      .then((data) => {
        return {
          ...data,
          images: data.images.map((image) => ({
            ...image,
            url: includeResizeQueryParameters(image.url, 300, 0)
          }))
        }
      }),
    enabled: id
  })

  const {
    data: recipeDecendedFrom,
  } = useQuery({
    queryKey: ["recipe", location?.state?.descendantOfRecipeId],
    queryFn: () => api.getRecipe(location?.state?.descendantOfRecipeId)
      .then((data) => {
        return {
          ...data,
          state: RecipeState.Draft,
          images: [],
          id: undefined,
          descendantOfRecipeId: location?.state?.descendantOfRecipeId
        }
      }),
    enabled: location?.state?.descendantOfRecipeId
  })

  /* Handlers */
  const handleSubmit = (newRecipe) => {
    navigate(`/recipes/${newRecipe.id}`)
  }

  /* Effects */
  return (
    <PageLayout
      title={`${id ? t("common.words.actions.update") : t("common.words.actions.add")} ${t("types.recipe.name")}`}
      loading={loadingRecipe}
    >
      {!loadingRecipe && (
        <RecipeForm
          recipe={recipeDecendedFrom ? recipeDecendedFrom : recipe}
          onSubmit={handleSubmit}
          admin={true}
        />
      )}
    </PageLayout>
  );
};

export default Recipe;