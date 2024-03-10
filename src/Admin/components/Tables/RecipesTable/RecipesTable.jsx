import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import Table from 'src/components/Table';

const RecipesTable = ({
  rows: recipes,
  loading,
  sortBy,
  sortDescending,
  onHeadingClick,
  onRowClick,
}) => {
  const { t } = useTranslation();

  const columns = [
    {
      heading: t('types.recipe.fields.createdOn.name'),
      identifier: 'createdOn',
      sortable: true,
    },
    {
      heading: t('types.recipe.fields.name.name'),
      identifier: 'message',
      sortable: true,
    },
  ];

  return (
    <Table
      columns={columns}
      rows={recipes.map((recipe) => ({
        identifier: recipe.id,
        data: [
          recipe.createdOn.format("HH:mm DD/MM/YYYY"),
          recipe.name
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

RecipesTable.propTypes = {
  loading: PropTypes.bool,
  sortBy: PropTypes.string,
  sortDescending: PropTypes.bool,
  onHeadingClick: PropTypes.func,
  onRowClick: PropTypes.func,
};

RecipesTable.defaultProps = {
  loading: false,
  sortBy: undefined,
  sortDescending: false,
  onHeadingClick: () => { },
  onRowClick: () => { },
};

export default RecipesTable;
