import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import Table from 'src/components/Table';

const AuthorsTable = ({
  rows: authors,
  loading,
  sortBy,
  sortDescending,
  onHeadingClick,
  onRowClick,
}) => {
  const { t } = useTranslation();

  const columns = [
    {
      heading: t('types.author.fields.name.name'),
      identifier: 'name',
      sortable: true,
    },
  ];

  return (
    <Table
      columns={columns}
      rows={authors.map((author) => ({
        identifier: author.id,
        data: [
          author.name
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

AuthorsTable.propTypes = {
  loading: PropTypes.bool,
  sortBy: PropTypes.string,
  sortDescending: PropTypes.bool,
  onHeadingClick: PropTypes.func,
  onRowClick: PropTypes.func,
};

AuthorsTable.defaultProps = {
  loading: false,
  sortBy: undefined,
  sortDescending: false,
  onHeadingClick: () => { },
  onRowClick: () => { },
};

export default AuthorsTable;
