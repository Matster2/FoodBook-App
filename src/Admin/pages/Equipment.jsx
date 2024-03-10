import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from 'react-router-dom';
import EquipmentForm from 'src/forms/EquipmentForm';
import { useQuery } from '@tanstack/react-query';
import api from 'src/api';
import PageLayout from "src/layouts/PageLayout";

const Tag = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    isFetched: hasFetchedPieceOfEquipment,
    data: pieceOfEquipment
  } = useQuery({
    queryKey: ["piece-of-equipment", id],
    queryFn: () => api.getPieceOfEquipment(id)
  })

  /* Rendering */
  return (
    <PageLayout
      title={`${id ? t("common.words.actions.update") : t("common.words.actions.add")} ${t("types.pieceOfEquipment.name")}`}
      loading={!hasFetchedPieceOfEquipment}
    >
      {hasFetchedPieceOfEquipment && (
        <EquipmentForm
          pieceOfEquipment={pieceOfEquipment}
          onSubmit={() => navigate("/admin/equipment")}
          admin={true}
        />
      )}
    </PageLayout>
  );
};

export default Tag;
