import { Box, CircularProgress, Container } from '@mui/material';
import Header from 'components/Header';
import AuthorForm from 'forms/AuthorForm';
import useAPI from 'hooks/useAPI';
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const api = useAPI();

  const [loadingAuthor, setLoadingAuthor] = useState(false);
  const [author, setAuthor] = useState()

  const fetchAuthor = async () => {
    setLoadingAuthor(true);
    try {
      const { data } = await api.getAuthor(id);
      setAuthor({
        ...location?.state,
        ...data
      });
    } catch (e) {
      console.log('error fetching author');
    }
    setLoadingAuthor(false);
  };
  
  /* Effects */
  useEffect(() => {
    if (id) {
      fetchAuthor();
    }
  }, []);
  
  /* Rendering */
  return (
    <>
      <Container sx={{ pb: 7 }}>
        <Header title={`${id ? t("common.words.actions.update") : t("common.words.actions.add")} ${t("types.author.name")}`} onBackClick={() => navigate(-1)} />

        {loadingAuthor && (
          <Box sx={{ mt: 2, mb: 4 }} display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )}

        {!loadingAuthor && (
          <AuthorForm
            author={author}
            onSubmit={() => navigate("/admin/authors")}
            admin={true}
          />
        )}
      </Container>
    </>
  );
};
