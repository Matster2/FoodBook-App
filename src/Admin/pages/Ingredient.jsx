import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from 'react-router-dom';
import IngredientForm from 'src/forms/IngredientForm';
import { useQuery } from '@tanstack/react-query';
import api from 'src/api';
import PageLayout from "src/layouts/PageLayout";

const Tag = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    isFetched: hasFetchedIngredient,
    data: ingredient
  } = useQuery({
    queryKey: ["ingredient", id],
    queryFn: () => api.getIngredient(id)
  })

  /* Rendering */
  return (
    <PageLayout
      title={`${id ? t("common.words.actions.update") : t("common.words.actions.add")} ${t("types.ingredient.name")}`}
      loading={!hasFetchedIngredient}
    >
      {hasFetchedIngredient && (
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
