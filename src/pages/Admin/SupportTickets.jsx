import React, { useState, useEffect } from 'react';
import {
  CssBaseline,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
  Box,
  CircularProgress,
  Typography,
  Button
} from '@mui/material';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { useNavigate } from 'react-router-dom';
import useAPI from '../../hooks/useAPI';
import useFilters from '../../hooks/useFilters';
import useInput from '../../hooks/useInput';
import Header from '../../components/Header';

export default () => {
  const navigate = useNavigate();
  const api = useAPI();

  const { filters, setFilter } = useFilters({
    search: '',
    sortBy: 'datecreated',
  });

  const { value: search, onChange: onSearchChange } = useInput('');
  const [loadingSupportTickets, setLoadingSupportTickets] = useState(false);
  const [supportTickets, setSupportTickets] = useState([]);

  const fetchingSupportTickets = async () => {
    setLoadingSupportTickets(true);

    try {
      const {
        data: { results },
      } = await api.getSupportTickets(filters);
      setSupportTickets(results);
    } catch (e) {
      console.log(e);
    }

    setLoadingSupportTickets(false);
  };

  /* Handlers */
  const handleRefresh = async () => {
    fetchingSupportTickets();
  }

  /* Effects */
  useEffect(() => {
    fetchingSupportTickets();
  }, [filters]);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      setFilter('search', search);
    }, 2000);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <Container sx={{ pb: 7 }}>
      <CssBaseline />
      <Header title="Support Tickets" onBackClick={() => navigate(-1)} />
      {/* 
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
      /> */}

      <PullToRefresh onRefresh={handleRefresh}>
        {supportTickets.length === 0 && !loadingSupportTickets && (
          <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
            <Typography>No Support Tickets Found</Typography>
          </Box>
        )}

        {loadingSupportTickets && (
          <Box sx={{ mt: 2, mb: 4 }} display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )}

        {supportTickets.length > 0 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Message</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {supportTickets.map((supportTicket) => (
                  <TableRow key={supportTicket.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {supportTicket.message}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </PullToRefresh>
    </Container>
  );
};
