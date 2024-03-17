import { TextField } from '@mui/material';
import { useEffect } from 'react';
import api from 'src/api';
import useFilters from 'src/hooks/useFilters';
import useInput from 'src/hooks/useInput';
import CollectionPageLayout from 'src/layouts/CollectionPageLayout';

const SupportTickets = () => {
  const [showSupportTicketModal, setShowSupportTicketModal] = useState(false);
  const [selectedSupportTicketId, setSelectedSupportTicketId] = useState();

  const { value: search, onChange: onSearchChange } = useInput('');
  const filter = useFilters({
    search: '',
    sortBy: 'name',
    sortDesc: false,
    pageSize: 50,
    page: 1,
  });
  const { setFilter } = filter;

  const callback = async (_filters) => {
    return await api.getIngredients(
      _filters.search,
      _filters.sortBy,
      _filters.sortDesc,
      _filters.page,
      _filters.pageSize)
  }
  /* Handlers */
  const handleRowClick = (id) => {
    setSelectedSupportTicketId(id)
    setShowSupportTicketModal(true)
  }

  const handleStatusFilterChange = (event) => {
    setFilter("status", event.target.value);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      setFilter('search', search);
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  /* Rendering */
  return (
    <>
      {selectedSupportTicketId && (
        <SupportTicketDialog
          open={showSupportTicketModal}
          onClose={() => {
            fetchSupportTickets();
            setShowSupportTicketModal(false);
          }}
          id={selectedSupportTicketId}
        />
      )}

      <CollectionPageLayout
        title={t("types.supportTicket.pluralName")}
        type={{
          name: t("types.supportTicket.name"),
          pluralName: t("types.supportTicket.pluralName")
        }}
        callback={callback}
        filter={filter}
        renderFilters={
          <Stack sx={{ flexWrap: "wrap" }} direction="row" gap={1} useFlexGap>
            <TextField
              placeholder={t("common.words.actions.search")}
              value={search}
              onChange={onSearchChange}
            />

            <Dropdown
              label="Level"
              options={[
                {
                  value: "open",
                  label: "Open",
                },
                {
                  value: "resolved",
                  label: "Resolved",
                },
              ]}
              value={filters.status}
              onChange={handleStatusFilterChange}
            />
          </Stack>
        }
        table={SupportTicketsTable}
        onRowClick={handleRowClick}
      />
    </>
  );
};

export default SupportTickets;