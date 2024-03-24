import { Button, SelectChangeEvent, Stack, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import RecipesTable from 'src/admin/components/tables/RecipesTable';
import api from 'src/api';
import Dropdown from 'src/components/Dropdown';
import useFilters from 'src/hooks/useFilters';
import useInput from 'src/hooks/useInput';
import CollectionPageLayout from 'src/layouts/CollectionPageLayout';

const Recipes = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { value: search, onChange: onSearchChange } = useInput('');
  const filter = useFilters({
    states: ['published'],
    search: '',
    sortBy: 'publishedOn',
    sortDesc: false,
    pageSize: 50,
    page: 1,
  });
  const { filters, setFilter } = filter;

  const callback = async (_filters: any) => {
    return await api.admin.admin_GetRecipes({
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
    navigate("/admin/recipes/add")
  }

  const handleRowClick = (id: string) => {
    navigate(`/admin/recipes/${id}`);
  }

  const handleStateFilterChange = (event: SelectChangeEvent<unknown>) => {
    setFilter("states", [event.target.value]);
  };

  /* Rendering */
  return (
    <CollectionPageLayout
      breadcrumbs={[
        <Link to="/admin">Admin</Link>,
        <Link to="/admin/recipes">{t("types.recipe.pluralName")}</Link>,
      ]}
      title={t("types.recipe.pluralName")}
      type={{
        name: t("types.recipe.name"),
        pluralName: t("types.recipe.pluralName")
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
            label="State"
            options={[
              {
                value: "draft",
                label: "Draft",
              },
              {
                value: "published",
                label: "Published",
              },
              {
                value: "archived",
                label: "Archived",
              },
            ]}
            value={filters.states.length > 0 ? filters.states[0] : undefined}
            onChange={handleStateFilterChange}
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
      table={RecipesTable}
      onRowClick={handleRowClick}
    />
  );
};

export default Recipes;