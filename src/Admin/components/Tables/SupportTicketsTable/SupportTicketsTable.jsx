import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import Table from 'src/components/Table';

const SupportTicketsTable = ({
  rows: supportTickets,
  loading,
  sortBy,
  sortDescending,
  onHeadingClick,
  onRowClick,
}) => {
  const { t } = useTranslation();

  const columns = [
    {
      heading: t('types.supportTicket.fields.createdOn.name'),
      identifier: 'createdOn',
      sortable: true,
    },
    {
      heading: t('types.supportTicket.fields.message.name'),
      identifier: 'message',
      sortable: true,
    },
  ];

  return (
    <Table
      columns={columns}
      rows={supportTickets.map((supportTicket) => ({
        identifier: supportTicket.id,
        data: [
          supportTicket.createdOn.format("HH:mm DD/MM/YYYY"),
          supportTicket.message
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

SupportTicketsTable.propTypes = {
  loading: PropTypes.bool,
  sortBy: PropTypes.string,
  sortDescending: PropTypes.bool,
  onHeadingClick: PropTypes.func,
  onRowClick: PropTypes.func,
};

SupportTicketsTable.defaultProps = {
  loading: false,
  sortBy: undefined,
  sortDescending: false,
  onHeadingClick: () => { },
  onRowClick: () => { },
};

export default SupportTicketsTable;
