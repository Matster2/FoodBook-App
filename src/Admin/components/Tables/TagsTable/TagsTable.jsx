import { Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import Table from 'src/components/Table';
import TagIcon from 'src/components/TagIcon/TagIcon';
import styles from './styles.module.css';

const TagsTable = ({
  rows: tags,
  loading,
  sortBy,
  sortDescending,
  onHeadingClick,
  onRowClick,
}) => {
  const { t } = useTranslation();

  const columns = [
    {
      heading: t('types.tag.fields.name.name'),
      identifier: 'name',
      sortable: true,
    },
  ];

  return (
    <Table
      columns={columns}
      rows={tags.map((tag) => ({
        identifier: tag.id,
        data: [
          <Stack direction="row" alignItems="center" gap={1}>
            <TagIcon className={styles.icon} icon={tag.icon} alt={tag.name} />
            <Typography>{tag.name}</Typography>
          </Stack>
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

TagsTable.propTypes = {
  loading: PropTypes.bool,
  sortBy: PropTypes.string,
  sortDescending: PropTypes.bool,
  onHeadingClick: PropTypes.func,
  onRowClick: PropTypes.func,
};

TagsTable.defaultProps = {
  loading: false,
  sortBy: undefined,
  sortDescending: false,
  onHeadingClick: () => { },
  onRowClick: () => { },
};

export default TagsTable;
