import { Button, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import IngredientsTable from 'src/admin/components/tables/IngredientsTable';
import api from 'src/api';
import useFilters from 'src/hooks/useFilters';
import useInput from 'src/hooks/useInput';
import CollectionPageLayout from 'src/layouts/CollectionPageLayout';

const Ingredients = () => {
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
    return await api.admin.admin_GetIngredients({
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
    navigate("/admin/ingredients/add")
  }

  const handleRowClick = (id: string) => {
    navigate(`/admin/ingredients/${id}`);
  }

  /* Rendering */
  return (
    <CollectionPageLayout
      breadcrumbs={[
        <Link to="/admin">Admin</Link>,
        <Link to="/admin/ingredients">{t("types.ingredient.pluralName")}</Link>,
      ]}
      title={t("types.ingredient.pluralName")}
      type={{
        name: t("types.ingredient.name"),
        pluralName: t("types.ingredient.pluralName")
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
      table={IngredientsTable}
      onRowClick={handleRowClick}
    />
  );
};

export default Ingredients;