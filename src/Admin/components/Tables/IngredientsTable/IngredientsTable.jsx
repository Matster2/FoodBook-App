import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import Table from 'src/components/Table';

const IngredientsTable = ({
  rows: ingredients,
  loading,
  sortBy,
  sortDescending,
  onHeadingClick,
  onRowClick,
}) => {
  const { t } = useTranslation();

  const columns = [
    {
      heading: t('types.ingredient.fields.name.name'),
      identifier: 'name',
      sortable: true,
    },
  ];

  return (
    <Table
      columns={columns}
      rows={ingredients.map((ingredient) => ({
        identifier: ingredient.id,
        data: [
          ingredient.name
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

IngredientsTable.propTypes = {
  loading: PropTypes.bool,
  sortBy: PropTypes.string,
  sortDescending: PropTypes.bool,
  onHeadingClick: PropTypes.func,
  onRowClick: PropTypes.func,
};

IngredientsTable.defaultProps = {
  loading: false,
  sortBy: undefined,
  sortDescending: false,
  onHeadingClick: () => { },
  onRowClick: () => { },
};

export default IngredientsTable;
