import { useQuery } from '@tanstack/react-query';
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RecipeForm from 'src/admin/forms/RecipeForm';
import api from 'src/api';
import PageLayout from "src/layouts/PageLayout";
import { RecipeState } from 'src/types';
import { includeResizeQueryParameters } from 'src/utils/imageUtils';
import { isUndefined } from 'src/utils/utils';

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
    queryFn: () => api.admin.admin_GetRecipe(id)
      .then(({ data }) => {
        return {
          ...data,
          images: data.images.map((image) => ({
            ...image,
            url: includeResizeQueryParameters(image.url, 300, 0)
          }))
        }
      }),
    enabled: !isUndefined(id)
  })

  const {
    data: recipeDecendedFrom,
  } = useQuery({
    queryKey: ["recipe", location?.state?.descendantOfRecipeId],
    queryFn: () => api.admin.admin_GetRecipe(location?.state?.descendantOfRecipeId)
      .then(({ data }) => {
        return {
          ...data,
          state: RecipeState.Draft,
          images: [],
          id: undefined,
          descendantOfRecipeId: location?.state?.descendantOfRecipeId
        }
      }),
    enabled: !isUndefined(location?.state?.descendantOfRecipeId)
  })

  /* Rendering */
  return (
    <PageLayout
      title={`${id ? t("common.words.actions.update") : t("common.words.actions.add")} ${t("types.recipe.name")}`}
      loading={loadingRecipe}
    >
      {!loadingRecipe && (
        <RecipeForm
          recipe={recipeDecendedFrom ? recipeDecendedFrom : recipe}
          onSuccess={() => navigate("/admin/recipes")}
        />
      )}
    </PageLayout>
  );
};

export default Recipe;