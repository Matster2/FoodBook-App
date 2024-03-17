import { useQuery } from '@tanstack/react-query';
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from 'react-router-dom';
import api from 'src/api';
import TagForm from 'src/forms/TagForm';
import PageLayout from "src/layouts/PageLayout";

const Tag = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{
    id: string;
  }>();

  const {
    isFetching: loadingsTags,
    data: tag
  } = useQuery({
    queryKey: ["tag", id],
    queryFn: () => api.tags.getTag(id!)
  })

  /* Rendering */
  return (
    <PageLayout
      title={`${id ? t("common.words.actions.update") : t("common.words.actions.add")} ${t("types.tag.name")}`}
      loading={loadingsTags}
    >
      {!loadingsTags && (
        <TagForm
          tag={tag}
          onSuccess={() => navigate("/admin/tags")}
        />
      )}
    </PageLayout>
  );
};

export default Tag;
