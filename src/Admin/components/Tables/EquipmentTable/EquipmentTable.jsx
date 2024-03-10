import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import Table from 'src/components/Table';

const EquipmentTable = ({
  rows: equipment,
  loading,
  sortBy,
  sortDescending,
  onHeadingClick,
  onRowClick,
}) => {
  const { t } = useTranslation();

  const columns = [
    {
      heading: t('types.pieceOfEquipment.fields.name.name'),
      identifier: 'name',
      sortable: true,
    },
  ];

  return (
    <Table
      columns={columns}
      rows={equipment.map((pieceOfEquipment) => ({
        identifier: pieceOfEquipment.id,
        data: [
          pieceOfEquipment.name
        ],
      }))}
      loading={loading}
      sortBy={sortBy}
      sortDescending={sortDescending}
      onHeadingClick={onHeadingClick}
      onRowClick={onRowClick}
    />
  );
};

EquipmentTable.propTypes = {
  loading: PropTypes.bool,
  sortBy: PropTypes.string,
  sortDescending: PropTypes.bool,
  onHeadingClick: PropTypes.func,
  onRowClick: PropTypes.func,
};

EquipmentTable.defaultProps = {
  loading: false,
  sortBy: undefined,
  sortDescending: false,
  onHeadingClick: () => { },
  onRowClick: () => { },
};

export default EquipmentTable;
