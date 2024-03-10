import {
  Button, TextField
} from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from 'src/api';
import useFilters from 'src/hooks/useFilters';
import useInput from 'src/hooks/useInput';
import CollectionPageLayout from 'src/layouts/CollectionPageLayout';

const Recipes = () => {
  const navigate = useNavigate();

  const { value: search, onChange: onSearchChange } = useInput('');
  const filter = useFilters({
    states: ['published'],
    search: '',
    sortBy: 'datepublished',
    sortDesc: false,
    pageSize: 50,
    page: 1,
  });
  const { setFilter } = filter;

  const callback = async (_filters) => {
    return await api.getRecipes(
      _filters.search,
      _filters.sortBy,
      _filters.sortDesc,
      _filters.page,
      _filters.pageSize)
  }

  /* Handlers */
  const handleAddClick = () => {
    navigate("/admin/recipes/add")
  }

  const handleRowClick = (id) => {
    navigate(`/admin/recipes/${id}`);
  }

  const handleStateFilterChange = (event) => {
    setFilter("states", [event.target.value]);
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