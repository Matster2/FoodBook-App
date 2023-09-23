import { Box, CircularProgress, Container } from '@mui/material';
import Header from 'components/Header';
import EquipmentForm from 'forms/EquipmentForm';
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

  const [loadingPieceOfEquipment, setLoadingPieceOfEquipment] = useState(false);
  const [pieceOfEquipment, setPieceOfEquipment] = useState()

  const fetchPieceOfEquipment = async () => {
    setLoadingPieceOfEquipment(true);
    try {
      const { data } = await api.getPieceOfEquipment(id);
      setPieceOfEquipment({
        ...location?.state,
        ...data
      });
    } catch (e) {
      console.log('error fetching piece of equipment');
    }
    setLoadingPieceOfEquipment(false);
  };
  
  /* Effects */
  useEffect(() => {
    if (id) {
      fetchPieceOfEquipment();
    }
  }, []);
  
  /* Rendering */
  return (
    <>
      <Container sx={{ pb: 7 }}>
        <Header title={`${id ? t("common.words.actions.update") : t("common.words.actions.add")} ${t("types.equipment.name")}`} onBackClick={() => navigate(-1)} />

        {loadingPieceOfEquipment && (
          <Box sx={{ mt: 2, mb: 4 }} display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )}

        {!loadingPieceOfEquipment && (
          <EquipmentForm
            pieceOfEquipment={pieceOfEquipment}
            onSubmit={() => {}}
            admin={true}
          />
        )}
      </Container>
    </>
  );
};
