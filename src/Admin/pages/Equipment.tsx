import { useQuery } from '@tanstack/react-query';
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from 'react-router-dom';
import api from 'src/api';
import EquipmentForm from 'src/forms/EquipmentForm';
import PageLayout from "src/layouts/PageLayout";

const Tag = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{
    id: string;
  }>();

  const {
    isFetching: loadingPieceOfEquipment,
    data: pieceOfEquipment
  } = useQuery({
    queryKey: ["admin", "piece-of-equipment", id],
    queryFn: () => api.equipment.getPieceOfEquipment(id!)
      .then(({ data }) => data)
  })

  /* Rendering */
  return (
    <PageLayout
      title={`${id ? t("common.words.actions.update") : t("common.words.actions.add")} ${t("types.pieceOfEquipment.name")}`}
      loading={loadingPieceOfEquipment}
    >
      {!loadingPieceOfEquipment && (
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
