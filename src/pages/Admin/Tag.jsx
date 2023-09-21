import { Box, CircularProgress, Container } from '@mui/material';
import Header from 'components/Header';
import TagForm from 'forms/TagForm';
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

  const [loadingTag, setLoadingTag] = useState(false);
  const [tag, setTag] = useState()

  const fetchTag = async () => {
    setLoadingTag(true);
    try {
      const { data } = await api.getTag(id);
      setTag({
        ...location?.state,
        ...data
      });
    } catch (e) {
      console.log('error fetching tag');
    }
    setLoadingTag(false);
  };
  
  /* Effects */
  useEffect(() => {
    if (id) {
      fetchTag();
    }
  }, []);
  
  /* Rendering */
  return (
    <>
      <Container sx={{ pb: 7 }}>
        <Header title={`${id ? t("common.words.actions.update") : t("common.words.actions.add")} ${t("types.tag.name")}`} onBackClick={() => navigate(-1)} />

        {loadingTag && (
          <Box sx={{ mt: 2, mb: 4 }} display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )}

        {!loadingTag && (
          <TagForm
            tag={tag}
            onSubmit={() => navigate("/admin/tags")}
            admin={true}
          />
        )}
      </Container>
    </>
  );
};
