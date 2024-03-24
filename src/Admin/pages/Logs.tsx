import { Button, Grid, SelectChangeEvent, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from 'react-router-dom';
import LogsTable from 'src/admin/components/Tables/LogsTable';
import api from 'src/api';
import Dropdown from 'src/components/Dropdown';
import { LogLevel } from 'src/generatedAPI';
import useFilters from 'src/hooks/useFilters';
import useInput from 'src/hooks/useInput';
import CollectionPageLayout from 'src/layouts/CollectionPageLayout';

const Logs = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { value: search, onChange: onSearchChange } = useInput('');
  const filter = useFilters({
    search: '',
    levels: [LogLevel.Error],
    sortBy: 'createdOn',
    sortDesc: false,
    pageSize: 50,
    page: 1,
  });
  const { filters, setFilter } = filter;

  const callback = async (_filters: any) => {
    return await api.admin.admin_GetLogs({
      ..._filters
    });
  }

  /* Effects */
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      setFilter('search', search);
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  /* Handlers */
  const handleAddClick = () => {
    navigate("/admin/logs/add")
  }

  const handleRowClick = (id: string) => {
    navigate(`/admin/logs/${id}`);
  }

  const handleLevelFilterChange = (event: SelectChangeEvent<unknown>) => {
    setFilter("levels", [event.target.value]);
  };

  /* Rendering */
  return (
    <CollectionPageLayout
      breadcrumbs={[
        <Link to="/admin">Admin</Link>,
        <Link to="/admin/logs">{t("types.log.pluralName")}</Link>,
      ]}
      title={t("types.log.pluralName")}
      type={{
        name: t("types.log.name"),
        pluralName: t("types.log.pluralName")
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
              options={Object.values(LogLevel).map((value) => ({
                value: value,
                label: value
              }))}
              value={filters.levels.length > 0 ? filters.levels[0] : undefined}
              onChange={handleLevelFilterChange}
            />
          </Grid>
        </Grid>
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