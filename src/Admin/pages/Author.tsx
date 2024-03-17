import { useQuery } from '@tanstack/react-query';
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from 'react-router-dom';
import api from 'src/api';
import AuthorForm from 'src/forms/AuthorForm';
import PageLayout from "src/layouts/PageLayout";

const Author = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{
    id: string;
  }>();

  const {
    isFetching: loadingAuthor,
    data: author
  } = useQuery({
    queryKey: ["admin", "author", id],
    queryFn: () => api.authors.getAuthor(id!)
      .then(({ data }) => data)
  })

  /* Rendering */
  return (
    <PageLayout
      title={`${id ? t("common.words.actions.update") : t("common.words.actions.add")} ${t("types.tag.name")}`}
      loading={loadingAuthor}
    >
      {!loadingAuthor && (
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