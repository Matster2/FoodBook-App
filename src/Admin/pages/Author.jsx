import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from 'react-router-dom';
import AuthorForm from 'src/forms/AuthorForm';
import { useQuery } from '@tanstack/react-query';
import api from 'src/api';
import PageLayout from "src/layouts/PageLayout";

const Author = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    isFetched: hasFetchedAuthor,
    data: author
  } = useQuery({
    queryKey: ["admin", "author", id],
    queryFn: () => api.getAuthor(id)
  })

  /* Rendering */
  return (
    <PageLayout
      title={`${id ? t("common.words.actions.update") : t("common.words.actions.add")} ${t("types.tag.name")}`}
      loading={!hasFetchedAuthor}
    >
      {hasFetchedAuthor && (
        <AuthorForm
          author={author}
          onSubmit={() => navigate("/admin/authors")}
          admin={true}
        />
      )}
    </PageLayout>
  );
};

export default Author;