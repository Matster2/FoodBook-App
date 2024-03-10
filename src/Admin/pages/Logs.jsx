import {
  Button, TextField
} from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from 'src/api';
import useFilters from 'src/hooks/useFilters';
import useInput from 'src/hooks/useInput';
import CollectionPageLayout from 'src/layouts/CollectionPageLayout';

const Logs = () => {
  const navigate = useNavigate();

  const { value: search, onChange: onSearchChange } = useInput('');
  const filter = useFilters({
    search: '',
    levels: ['error'],
    sortBy: 'datecreated',
    sortDesc: false,
    pageSize: 50,
    page: 1,
  });
  const { setFilter } = filter;

  const callback = async (_filters) => {
    return await api.getLogs(
      _filters.search,
      _filters.sortBy,
      _filters.sortDesc,
      _filters.page,
      _filters.pageSize)
  }
  /* Handlers */
  const handleAddClick = () => {
    navigate("/admin/logs/add")
  }

  const handleRowClick = (id) => {
    navigate(`/admin/logs/${id}`);
  }

  const handleLevelFilterChange = (event) => {
    setFilter("levels", [event.target.value]);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      setFilter('search', search);
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  /* Rendering */
  return (
    <CollectionPageLayout
      title={t("types.log.pluralName")}
      type={{
        name: t("types.log.name"),
        pluralName: t("types.log.pluralName")
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
                value: "trace",
                label: "Trace",
              },
              {
                value: "debug",
                label: "Debug",
              },
              {
                value: "information",
                label: "Information",
              },
              {
                value: "warning",
                label: "Warning",
              },
              {
                value: "error",
                label: "Error",
              },
              {
                value: "critical",
                label: "Critical",
              }
            ]}
            value={filters.levels.length > 0 ? filters.levels[0] : undefined}
            onChange={handleLevelFilterChange}
          />
        </Stack>
      }
      renderActions={
        <Button
          type="button"
          variant="contained"
          onClick={handleAddClick}
        >
          Add
        </Button>
      }
      table={LogsTable}
      onRowClick={handleRowClick}
    />
  );
};

export default Logs;