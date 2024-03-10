import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from 'react-router-dom';
import TagForm from 'src/forms/TagForm';
import { useQuery } from '@tanstack/react-query';
import api from 'src/api';
import PageLayout from "src/layouts/PageLayout";

const Tag = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    isFetched: hasFetchedTag,
    data: tag
  } = useQuery({
    queryKey: ["tag", id],
    queryFn: () => api.getTag(id)
  })

  /* Rendering */
  return (
    <PageLayout
      title={`${id ? t("common.words.actions.update") : t("common.words.actions.add")} ${t("types.tag.name")}`}
      loading={!hasFetchedTag}
    >
      {hasFetchedTag && (
        <TagForm
          tag={tag}
          onSubmit={() => navigate("/admin/tags")}
          admin={true}
        />
      )}
    </PageLayout>
  );
};

export default Tag;
