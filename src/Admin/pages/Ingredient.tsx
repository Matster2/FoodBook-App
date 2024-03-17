import { useQuery } from '@tanstack/react-query';
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from 'react-router-dom';
import api from 'src/api';
import IngredientForm from 'src/forms/IngredientForm';
import PageLayout from "src/layouts/PageLayout";

const Tag = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{
    id: string;
  }>();

  const {
    isFetching: loadingIngredient,
    data: ingredient
  } = useQuery({
    queryKey: ["ingredient", id],
    queryFn: () => api.ingredients.getIngredient(id!)
      .then(({ data }) => data)
  })

  /* Rendering */
  return (
    <PageLayout
      title={`${id ? t("common.words.actions.update") : t("common.words.actions.add")} ${t("types.ingredient.name")}`}
      loading={loadingIngredient}
    >
      {!loadingIngredient && (
        <IngredientForm
          ingredient={ingredient}
          onSubmit={() => navigate("/admin/ingredients")}
          admin={true}
        />
      )}
    </PageLayout>
  );
};

export default Tag;
