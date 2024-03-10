import {
  Button, TextField
} from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from 'src/api';
import useFilters from 'src/hooks/useFilters';
import useInput from 'src/hooks/useInput';
import CollectionPageLayout from 'src/layouts/CollectionPageLayout';

const Equipment = () => {
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

  const callback = async (_filters) => {
    return await api.getEquipment(
      _filters.search,
      _filters.sortBy,
      _filters.sortDesc,
      _filters.page,
      _filters.pageSize)
  }
  /* Handlers */
  const handleAddClick = () => {
    navigate("/admin/equipment/add")
  }

  const handleRowClick = (id) => {
    navigate(`/admin/equipment/${id}`);
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
      title={t("types.pieceOfEquipment.pluralName")}
      type={{
        name: t("types.pieceOfEquipment.name"),
        pluralName: t("types.pieceOfEquipment.pluralName")
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
      table={EquipmentTable}
      onRowClick={handleRowClick}
    />
  );
};

export default Equipment;