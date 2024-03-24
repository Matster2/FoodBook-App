import { useQuery } from '@tanstack/react-query';
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from 'react-router-dom';
import EquipmentForm from 'src/admin/forms/EquipmentForm';
import api from 'src/api';
import PageLayout from "src/layouts/PageLayout";
import { isUndefined } from 'src/utils/utils';

type EquipmentParams = {
  id: string | undefined
}

const Equipment = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<EquipmentParams>();

  const {
    isFetching: loadingPieceOfEquipment,
    data: pieceOfEquipment
  } = useQuery({
    queryKey: ["admin", "piece-of-equipment", id],
    queryFn: () => api.equipment.getPieceOfEquipment(id!)
      .then(({ data }) => data),
    enabled: !isUndefined(id)
  })

  /* Rendering */
  return (
    <PageLayout
      breadcrumbs={[
        <Link to="/admin">Admin</Link>,
        <Link to="/admin/equipment">{t("types.pieceOfEquipment.pluralName")}</Link>,
      ]}
      title={`${id ? t("common.words.actions.update") : t("common.words.actions.add")} ${t("types.pieceOfEquipment.name")}`}
      loading={loadingPieceOfEquipment}
    >
      {!loadingPieceOfEquipment && (
        <EquipmentForm
          pieceOfEquipment={pieceOfEquipment}
          onSuccess={() => navigate("/admin/equipment")}
        />
      )}
    </PageLayout>
  );
};

export default Equipment;
