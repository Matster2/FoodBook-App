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
  Select,
  Slide,
  Box,
  CircularProgress,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination
} from '@mui/material';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { useNavigate } from 'react-router-dom';
import useAPI from '../../hooks/useAPI';
import useFilters from '../../hooks/useFilters';
import Header from '../../components/Header';
import SupportTicketDialog from '../../dialogs/SupportTicketDialog';

const Transition = React.forwardRef((props, ref) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide direction="left" ref={ref} {...props} />;
});

export default () => {
  const navigate = useNavigate();
  const api = useAPI();

  const { filters, setFilter } = useFilters({
    status: 'open',
    sortBy: 'datecreated',
    sortDesc: true,
    page: 1,
    pageSize: 50
  });

  const [showSupportTicketModal, setShowSupportTicketModal] = useState(false);

  const [loadingSupportTickets, setLoadingSupportTickets] = useState(false);
  const [supportTickets, setSupportTickets] = useState();

  const [selectedSupportTicketId, setSelectedSupportTicketId] = useState();

  const fetchSupportTickets = async () => {
    setLoadingSupportTickets(true);

    try {
      const {
        data,
      } = await api.getSupportTickets(filters);
      setSupportTickets(data);
    } catch (e) {
      console.log(e);
    }

    setLoadingSupportTickets(false);
  };

  /* Handlers */
  const handleRefresh = async () => {
    fetchSupportTickets();
  }

  const handleStatusFilterChange = (event) => {
    setFilter("status", event.target.value);
  };

  const handlePageChange = (event, value) => {
    setFilter("page", value);
  };

  const handleSupportTicketClick = (id) => {
    setSelectedSupportTicketId(id)
    setShowSupportTicketModal(true)
  };

  /* Effects */
  useEffect(() => {
    fetchSupportTickets()
  }, [filters]);

  /* Rendering */
  const formatDate = (inputDate) => {
    let date, month, year;

    date = inputDate.getDate();
    month = inputDate.getMonth() + 1;
    year = inputDate.getFullYear();

    date = date
      .toString()
      .padStart(2, '0');

    month = month
      .toString()
      .padStart(2, '0');

    return `${date}/${month}/${year}`;
  }

  const getDateString = (inputDate) => {
    var time = inputDate.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    var date = formatDate(inputDate)
    return `${time} ${date}`;
  }

  return (
    <>
      {selectedSupportTicketId && (
        <SupportTicketDialog
          open={showSupportTicketModal}
          onClose={() => {
            fetchSupportTickets();
            setShowSupportTicketModal(false);
          }}
          id={selectedSupportTicketId}
          TransitionComponent={Transition}
        />
      )}

      <Container sx={{ pb: 7 }}>
        <CssBaseline />
        <Header title="Support Tickets" onBackClick={() => navigate(-1)} />

        <Box sx={{ mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="status-filter-label">Status</InputLabel>
            <Select
              labelId="status-filter-label"
              id="status-filter"
              value={filters.status}
              label="Status"
              onChange={handleStatusFilterChange}
            >
              <MenuItem value="open">Open</MenuItem>
              <MenuItem value="resolved">Resolved</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {loadingSupportTickets && (
          <Box sx={{ mt: 2, mb: 4 }} display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )}

        {supportTickets && (
          <PullToRefresh onRefresh={handleRefresh}>
            {supportTickets.results.length === 0 && !loadingSupportTickets && (
              <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
                <Typography>No Support Tickets Found</Typography>
              </Box>
            )}

            {supportTickets.results.length > 0 && (
              <TableContainer component={Paper}>
                <Table sx={{ width: "100%" }} style={{ tableLayout: "auto" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date Created</TableCell>
                      <TableCell>Message</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {supportTickets.results.map((supportTicket) => (
                      <TableRow key={supportTicket.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} onClick={() => handleSupportTicketClick(supportTicket.id)}>
                        <TableCell component="th" scope="row">
                          {getDateString(new Date(supportTicket.dateCreated))}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {supportTicket.message}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {supportTickets.totalPages > 1 && (
              <Box sx={{ mt: 3 }} display="flex" justifyContent="center">
                <Pagination count={supportTickets.totalPages} page={supportTickets.currentPage} onChange={handlePageChange} shape="rounded" />
              </Box>
            )}
          </PullToRefresh>
        )}
      </Container>
    </>
  );
};
