import { Button, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import TagsTable from 'src/admin/components/tables/TagsTable';
import api from 'src/api';
import useFilters from 'src/hooks/useFilters';
import useInput from 'src/hooks/useInput';
import CollectionPageLayout from 'src/layouts/CollectionPageLayout';

const Tags = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { value: search, onChange: onSearchChange } = useInput('');
  const filter = useFilters({
    search: '',
    sortBy: 'name',
    sortDesc: false,
    pageSize: 50,
    page: 1,
  });
  const { setFilter } = filter;

  const callback = async (_filters: any) => {
    return await api.admin.admin_GetTags({
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
    navigate("/admin/tags/add")
  }

  const handleRowClick = (id: string) => {
    navigate(`/admin/tags/${id}`);
  }

  /* Rendering */
  return (
    <CollectionPageLayout
      breadcrumbs={[
        <Link to="/admin">Admin</Link>,
        <Link to="/admin/tags">{t("types.tag.pluralName")}</Link>,
      ]}
      title={t("types.tag.pluralName")}
      type={{
        name: t("types.tag.name"),
        pluralName: t("types.tag.pluralName")
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
      table={TagsTable}
      onRowClick={handleRowClick}
    />
  );
};

export default Tags;