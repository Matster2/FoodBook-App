import { Box, CircularProgress, Container } from '@mui/material';
import Header from 'components/Header';
import CollectionForm from 'forms/CollectionForm';
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

  const [loadingCollection, setLoadingCollection] = useState(false);
  const [collection, setCollection] = useState()

  const fetchCollection = async () => {
    setLoadingCollection(true);
    try {
      const { data } = await api.getCollection(id);
      setCollection({
        ...location?.state,
        ...data
      });
    } catch (e) {
      console.log('error fetching collection');
    }
    setLoadingCollection(false);
  };
  
  /* Effects */
  useEffect(() => {
    if (id) {
      fetchCollection();
    }
  }, []);
  
  /* Rendering */
  return (
    <>
      <Container sx={{ pb: 7 }}>
        <Header title={`${id ? t("common.words.actions.update") : t("common.words.actions.add")} ${t("types.collection.name")}`} onBackClick={() => navigate(-1)} />

        {loadingCollection && (
          <Box sx={{ mt: 2, mb: 4 }} display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )}

        {!loadingCollection && (
          <CollectionForm
          collection={collection}
            onSubmit={() => navigate("/admin/collections")}
            admin={true}
          />
        )}
      </Container>
    </>
  );
};
