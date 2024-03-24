import { useQuery } from '@tanstack/react-query';
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from 'react-router-dom';
import IngredientForm from 'src/admin/forms/IngredientForm';
import api from 'src/api';
import PageLayout from "src/layouts/PageLayout";
import { Operation } from 'src/types';
import { isUndefined } from 'src/utils/utils';

type IngredientParams = {
  id: string | undefined
}

const Tag = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<IngredientParams>();

  const mode = isUndefined(id) ? Operation.Create : Operation.Update;

  const {
    isFetching: loadingIngredient,
    data: ingredient
  } = useQuery({
    queryKey: ["collection", id],
    queryFn: () => api.admin.admin_GetIngredient(id!)
      .then(({ data }) => data),
    enabled: !isUndefined(id)
  })

  /* Rendering */
  return (
    <PageLayout
      breadcrumbs={[
        <Link to="/admin">Admin</Link>,
        <Link to="/admin/ingredients">{t("types.ingredient.pluralName")}</Link>,
      ]}
      title={`${id ? t("common.words.actions.update") : t("common.words.actions.add")} ${t("types.ingredient.name")}`}
      loading={loadingIngredient}
    >
      {!loadingIngredient && (
        <IngredientForm
          ingredient={ingredient}
          onSuccess={() => navigate("/admin/ingredients")}
        />
      )}
    </PageLayout>
  );
};

export default Tag;
