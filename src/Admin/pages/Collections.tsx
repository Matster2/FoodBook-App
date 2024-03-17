import { Button, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import CollectionsTable from 'src/admin/components/tables/CollectionsTable';
import api from 'src/api';
import useFilters from 'src/hooks/useFilters';
import useInput from 'src/hooks/useInput';
import CollectionPageLayout from 'src/layouts/CollectionPageLayout';

const Collections = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { value: search, onChange: onSearchChange } = useInput('');
  const filter = useFilters({
    search: '',
    sortBy: 'title',
    sortDesc: false,
    pageSize: 50,
    page: 1,
  });
  const { setFilter } = filter;

  const callback = async (_filters: any) => {
    return await api.admin.admin_GetCollections({
      ..._filters
    });
  }
  /* Handlers */
  const handleAddClick = () => {
    navigate("/admin/collections/add")
  }

  const handleRowClick = (id: string) => {
    navigate(`/admin/collections/${id}`);
  }

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      setFilter('search', search);
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  /* Rendering */
  return (
    <CollectionPageLayout
      title={t("types.collection.pluralName")}
      type={{
        name: t("types.collection.name"),
        pluralName: t("types.collection.pluralName")
      }}
      callback={callback}
      filter={filter}
      renderFilters={
        <TextField
          fullWidth
          placeholder={t("common.words.actions.search")}
          value={search}
          onChange={onSearchChange}
        />
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
      table={CollectionsTable}
      onRowClick={handleRowClick}
    />
  );
};

export default Collections;