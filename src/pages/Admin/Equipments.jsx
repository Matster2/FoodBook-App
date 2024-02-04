import {
    Box,
    Button,
    CircularProgress,
    Container,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PullToRefresh from 'react-simple-pull-to-refresh';
import Header from 'src/components/Header';
import useAPI from 'src/hooks/useAPI';
import useFilters from 'src/hooks/useFilters';
import useInput from 'src/hooks/useInput';

export default () => {
  const navigate = useNavigate();
  const api = useAPI();

  const { filters, setFilter } = useFilters({
    search: '',
    sortBy: 'name',
    sortDesc: false,
    page: 1,
    pageSize: 50
  });

  const { value: search, onChange: onSearchChange } = useInput('');
  const [loadingEquipment, setLoadingEquipment] = useState(false);
  const [equipmentResponse, setEquipmentResponse] = useState();

  const fetchEquipment = async () => {
    setLoadingEquipment(true);

    try {
      const { data } = await api.getEquipment(filters);
      setEquipmentResponse(data);
    } catch (e) {
      console.log(e);
    }

    setLoadingEquipment(false);
  };

  /* Handlers */
  const handleRefresh = async () => {
    fetchEquipment();
  }

  const handlePageChange = (event, value) => {
    setFilter("page", value);
  };

  const handleAddClick = () => {
    navigate("/admin/equipment/add")
  }

  const handlePieceOfEquipmentClick = (id) => {
    navigate(`/admin/equipment/${id}`);
  }

  /* Effects */
  useEffect(() => {
    fetchEquipment();
  }, [filters]);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      setFilter('search', search);
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  /* Rendering */
  const getTextForPieceOfEquipment = (pieceOfEquipment) => {
    const parts = [pieceOfEquipment.name];

    if (pieceOfEquipment.name !== pieceOfEquipment.pluralName) {
      parts.push(`(${pieceOfEquipment.pluralName})`);
    }

    return parts.join(" ");
  }

  return (
    <Container sx={{ pb: 7 }}>
      <Header title="Equipment" onBackClick={() => navigate(-1)} />

      <Box
        sx={{ display: "flex", justifyContent: "right" }}
      >
        <Button
          type="button"
          variant="contained"
          onClick={handleAddClick}
        >
          Add
        </Button>
      </Box>

      <TextField
        sx={{ mb: 2 }}
        fullWidth
        margin="normal"
        id="search"
        name="search"
        label="search"
        autoFocus
        value={search}
        onChange={onSearchChange}
      />

      {loadingEquipment && (
        <Box sx={{ mt: 2, mb: 4 }} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}

      {equipmentResponse && (
        <PullToRefresh onRefresh={handleRefresh}>
          <Box sx={{ mb: 1 }} display="flex" justifyContent="end">
            <Typography sx={{ fontSize: 12 }}>Total equipment: {equipmentResponse.totalResults}</Typography>
          </Box>

          {equipmentResponse.results.length === 0 && !loadingEquipment && (
            <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
              <Typography>No Equipment Found</Typography>
            </Box>
          )}

          {equipmentResponse.results.length > 0 && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {equipmentResponse.results.map((equipment) => (
                    <TableRow key={equipment.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} onClick={() => handlePieceOfEquipmentClick(equipment.id)}>
                      <TableCell component="th" scope="row">
                        {getTextForPieceOfEquipment(equipment)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {equipmentResponse.totalPages > 1 && (
            <Box sx={{ mt: 3 }} display="flex" justifyContent="center">
              <Pagination count={equipmentResponse.totalPages} page={equipmentResponse.currentPage} onChange={handlePageChange} shape="rounded" />
            </Box>
          )}
        </PullToRefresh>
      )}
    </Container>
  );
};
