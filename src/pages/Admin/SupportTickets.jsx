import {
    Box,
    CircularProgress,
    Container,
    CssBaseline,
    FormControl,
    InputLabel,
    MenuItem,
    Pagination,
    Paper,
    Select,
    Slide,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import Header from 'components/Header';
import SupportTicketDialog from 'dialogs/SupportTicketDialog';
import useAPI from 'hooks/useAPI';
import useFilters from 'hooks/useFilters';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PullToRefresh from 'react-simple-pull-to-refresh';

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
  const [supportTicketResponse, setSupportTicketResponse] = useState();

  const [selectedSupportTicketId, setSelectedSupportTicketId] = useState();

  const fetchSupportTickets = async () => {
    setLoadingSupportTickets(true);

    try {
      const { data } = await api.getSupportTickets(filters);
      setSupportTicketResponse(data);
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

        {supportTicketResponse && (
          <PullToRefresh onRefresh={handleRefresh}>
            <Box sx={{ mb: 1 }} display="flex" justifyContent="end">
              <Typography sx={{ fontSize: 12 }}>Total support tickets: {supportTicketResponse.totalResults}</Typography>
            </Box>

            {supportTicketResponse.results.length === 0 && !loadingSupportTickets && (
              <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
                <Typography>No Support Tickets Found</Typography>
              </Box>
            )}

            {supportTicketResponse.results.length > 0 && (
              <TableContainer component={Paper}>
                <Table sx={{ width: "100%" }} style={{ tableLayout: "auto" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date Created</TableCell>
                      <TableCell>Message</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {supportTicketResponse.results.map((supportTicket) => (
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

            {supportTicketResponse.totalPages > 1 && (
              <Box sx={{ mt: 3 }} display="flex" justifyContent="center">
                <Pagination count={supportTicketResponse.totalPages} page={supportTicketResponse.currentPage} onChange={handlePageChange} shape="rounded" />
              </Box>
            )}
          </PullToRefresh>
        )}
      </Container>
    </>
  );
};
