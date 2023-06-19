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
  Stack,
  CircularProgress,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
} from '@mui/material';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { useNavigate } from 'react-router-dom';
import useAPI from '../../hooks/useAPI';
import useFilters from '../../hooks/useFilters';
import Header from '../../components/Header';
import SupportTicketDialog from '../../dialogs/SupportTicketDialog';
import LogDialog from '../../dialogs/LogDialog';

const Transition = React.forwardRef((props, ref) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide direction="left" ref={ref} {...props} />;
});

export default () => {
  const navigate = useNavigate();
  const api = useAPI();

  const { filters, setFilter } = useFilters({
    levels: ['error'],
    sortBy: 'datecreated',
    sortDesc: true,
    page: 1,
    pageSize: 50
  });

  const [showLogModal, setShowLogModal] = useState(false);

  const [loadingLogs, setLoadingLogs] = useState(false);
  const [logResponse, setLogResponse] = useState();

  const [selectedLog, setSelectedLog] = useState();

  const fetchLogs = async () => {
    setLoadingLogs(true);

    try {
      const { data } = await api.getLogs(filters);
      setLogResponse(data);
    } catch (e) {
      console.log(e);
    }

    setLoadingLogs(false);
  };

  /* Handlers */
  const handleRefresh = async () => {
    fetchLogs();
  }

  const handleLevelFilterChange = (event) => {
    setFilter("levels", [event.target.value]);
  };

  const handlePageChange = (event, value) => {
    setFilter("page", value);
  };

  const handleLogClick = (log) => {
    setSelectedLog({
      ...log,
      dateCreated: new Date(log.dateCreated)
    })
    setShowLogModal(true)
  };

  /* Effects */
  useEffect(() => {
    fetchLogs()
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
      {selectedLog && (
        <LogDialog
          open={showLogModal}
          onClose={() => {
            setShowLogModal(false);
          }}
          log={selectedLog}
          TransitionComponent={Transition}
        />
      )}

      <Container sx={{ pb: 7 }}>
        <CssBaseline />
        <Header title="Logs" onBackClick={() => navigate(-1)} />

        <Stack sx={{ mb: 2 }} direction="row" gap={2}>
          <FormControl fullWidth>
            <InputLabel id="level-filter-label">Level</InputLabel>
            <Select
              labelId="level-filter-label"
              id="level-filter"
              value={filters.levels.length > 0 ? filters.levels[0] : undefined}
              label="Level"
              onChange={handleLevelFilterChange}
            >
              <MenuItem value="trace">Trace</MenuItem>
              <MenuItem value="debug">Debug</MenuItem>
              <MenuItem value="information">Information</MenuItem>
              <MenuItem value="warning">Warning</MenuItem>
              <MenuItem value="error">Error</MenuItem>
              <MenuItem value="critical">Critical</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        {loadingLogs && (
          <Box sx={{ mt: 2, mb: 4 }} display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )}

        {logResponse && (
          <PullToRefresh onRefresh={handleRefresh}>
            <Box sx={{ mb: 1 }} display="flex" justifyContent="end">
              <Typography sx={{ fontSize: 12 }}>Total logs: {logResponse.totalResults}</Typography>
            </Box>

            {logResponse.results.length === 0 && !loadingLogs && (
              <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
                <Typography>No Logs Found</Typography>
              </Box>
            )}

            {logResponse.results.length > 0 && (
              <TableContainer component={Paper}>
                <Table sx={{ width: "100%" }} style={{ tableLayout: "auto" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date Created</TableCell>
                      <TableCell>Message</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {logResponse.results.map((log) => (
                      <TableRow key={log.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} onClick={() => handleLogClick(log)}>
                        <TableCell component="th" scope="row">
                          {getDateString(new Date(log.dateCreated))}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {log.message}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {logResponse.totalPages > 1 && (
              <Box sx={{ mt: 3 }} display="flex" justifyContent="center">
                <Pagination count={logResponse.totalPages} page={logResponse.currentPage} onChange={handlePageChange} shape="rounded" />
              </Box>
            )}
          </PullToRefresh>
        )}
      </Container>
    </>
  );
};
