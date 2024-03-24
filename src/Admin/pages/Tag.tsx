import { useQuery } from '@tanstack/react-query';
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from 'react-router-dom';
import TagForm from 'src/admin/forms/TagForm';
import api from 'src/api';
import PageLayout from "src/layouts/PageLayout";
import { isUndefined } from 'src/utils/utils';

type TagParams = {
  id: string | undefined
}

const Tag = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<TagParams>();

  const {
    isFetching: loadingTag,
    data: tag
  } = useQuery({
    queryKey: ["tag", id],
    queryFn: () => api.admin.admin_GetTag(id!)
      .then(({ data }) => data),
    enabled: !isUndefined(id)
  })

  /* Rendering */
  return (
    <PageLayout
      breadcrumbs={[
        <Link to="/admin">Admin</Link>,
        <Link to="/admin/tags">{t("types.tag.pluralName")}</Link>
      ]}
      title={`${id ? t("common.words.actions.update") : t("common.words.actions.add")} ${t("types.tag.name")}`}
      loading={loadingTag}
    >
      {!loadingTag && (
        <TagForm
          tag={tag}
          onSuccess={() => navigate("/admin/tags")}
        />
      )}
    </PageLayout>
  );
};

export default Tag;
