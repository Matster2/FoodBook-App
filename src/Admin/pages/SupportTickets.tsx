import { Grid, SelectChangeEvent, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SupportTicketsTable from 'src/admin/components/tables/SupportTicketsTable';
import SupportTicketDialog from 'src/admin/dialogs/SupportTicketDialog';
import api from 'src/api';
import Dropdown from 'src/components/Dropdown';
import { SupportTicketStatus } from 'src/generatedAPI';
import useFilters from 'src/hooks/useFilters';
import useInput from 'src/hooks/useInput';
import CollectionPageLayout from 'src/layouts/CollectionPageLayout';

const SupportTickets = () => {
  const { t } = useTranslation();

  const [showSupportTicketModal, setShowSupportTicketModal] = useState<boolean>(false);
  const [selectedSupportTicket, setSelectedSupportTicket] = useState<any>();

  const { value: search, onChange: onSearchChange } = useInput('');
  const filter = useFilters({
    search: '',
    sortBy: 'createdOn',
    sortDesc: true,
    pageSize: 50,
    page: 1,
  });
  const { filters, setFilter } = filter;

  const [supportTickets, setSupportTickets] = useState<any[]>([]);

  const callback = async (_filters: any) => {
    const response = await api.admin.admin_GetSupportTickets({
      ..._filters
    });

    setSupportTickets(response.data.results);

    return response;
  }

  /* Effects */
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      setFilter('search', search);
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  /* Handlers */
  const handleRowClick = (id: string) => {
    const supportTicket = supportTickets.find(x => x.id === id);
    setSelectedSupportTicket(supportTicket)
    setShowSupportTicketModal(true)
  }

  const handleStatusFilterChange = (event: SelectChangeEvent<unknown>) => {
    setFilter("status", event.target.value);
  };

  const onSuccess = () => {
    window.location.reload();
  }

  /* Rendering */
  return (
    <>
      {selectedSupportTicket && (
        <SupportTicketDialog
          supportTicket={selectedSupportTicket}
          open={showSupportTicketModal}
          onClose={() => setShowSupportTicketModal(false)}
          onSuccess={onSuccess}
        />
      )}

      <CollectionPageLayout
        breadcrumbs={[
          <Link to="/admin">Admin</Link>,
          <Link to="/admin/support-tickets">{t("types.supportTicket.pluralName")}</Link>,
        ]}
        title={t("types.supportTicket.pluralName")}
        type={{
          name: t("types.supportTicket.name"),
          pluralName: t("types.supportTicket.pluralName")
        }}
        callback={callback}
        filter={filter}
        renderFilters={
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                sx={{ minWidth: '400px' }}
                fullWidth
                placeholder={t("common.words.actions.search")}
                value={search}
                onChange={onSearchChange}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <Dropdown
                sx={{ minWidth: '200px' }}
                label="Level"
                options={Object.values(SupportTicketStatus).map((value) => ({
                  value: value,
                  label: value
                }))}
                value={filters.levels.length > 0 ? filters.levels[0] : undefined}
                onChange={handleStatusFilterChange}
              />
            </Grid>
          </Grid>
        }
        table={SupportTicketsTable}
        onRowClick={handleRowClick}
      />
    </>
  );
};

export default SupportTickets;