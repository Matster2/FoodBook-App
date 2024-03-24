import { useQuery } from '@tanstack/react-query';
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from 'react-router-dom';
import AuthorForm from 'src/admin/forms/AuthorForm';
import api from 'src/api';
import PageLayout from "src/layouts/PageLayout";
import { isUndefined } from 'src/utils/utils';

type AuthorParams = {
  id: string | undefined
}

const Author = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<AuthorParams>();

  const {
    isFetching: loadingAuthor,
    data: author
  } = useQuery({
    queryKey: ["admin", "author", id],
    queryFn: () => api.authors.getAuthor(id!)
      .then(({ data }) => data),
    enabled: !isUndefined(id)
  })

  /* Rendering */
  return (
    <PageLayout
      breadcrumbs={[
        <Link to="/admin">Admin</Link>,
        <Link to="/admin/authors">{t("types.author.pluralName")}</Link>,
      ]}
      title={`${id ? t("common.words.actions.update") : t("common.words.actions.add")} ${t("types.author.name")}`}
      loading={loadingAuthor}
    >
      {!loadingAuthor && (
        <AuthorForm
          author={author}
          onSuccess={() => navigate("/admin/authors")}
        />
      )}
    </PageLayout>
  );
};

export default Author;