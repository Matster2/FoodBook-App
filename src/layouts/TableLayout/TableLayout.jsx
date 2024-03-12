import { Box, Button, CircularProgress, Pagination, Stack, TableContainer, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Dropdown from 'src/components/Dropdown';
import useFilters from 'src/hooks/useFilters';

const _defaultPageSize = 25;

const TableLayout = ({
  sx = {},
  title,
  type,

  filter = useFilters(),
  callback,

  renderFilters,
  renderUnderFilters,

  showReset = true,
  showPageSizeSelector = true,
  showResultsText = true,

  table,
  selectedIds = [],
  ...props
}) => {
  const { filters, setFilter } = filter;

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();

  const Table = table;

  const fetch = async () => {
    setLoading(true);

    try {
      const data = await callback({
        pageSize: _defaultPageSize,
        ...filters
      });
      setResponse(data);
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  }

  /* Effects */
  useEffect(() => {
    fetch()
  }, [filters]);

  /* Handlers */
  const handlePageChange = (_, value) => {
    setFilter('page', value);
  };

  const handlePageSizeChange = (event) => {
    setFilter('pageSize', event.target.value);
  };

  const getResultsText = (page, pageSize, totalResults, type = "results") => {
    const resultsRange = {
      from: (page - 1) * pageSize,
      to: page * pageSize > totalResults ? totalResults : page * pageSize
    }

    return `Showing ${resultsRange.from} - ${resultsRange.to} out of ${totalResults} ${type}`;
  }

  /* Rendering */
  return (
    <Box sx={sx}>
      <Stack sx={{ mt: 1, flexWrap: "wrap" }} direction="row" justifyContent="space-between" gap={2} useFlexGap>
        {renderFilters}

        {showReset && (
          <Button
            variant="contained"
            color="secondary"
          >
            Reset
          </Button>
        )}
      </Stack>

      <Box>
        {renderUnderFilters}
      </Box>

      <Box sx={{ mt: 1 }}>
        {(response && response.results.length > 0) && (
          <>
            <Stack direction="row" justifyContent="space-between" alignItems="end" gap={1}>
              <Typography>
                {showResultsText
                  ? getResultsText(response.page, filters.pageSize ?? _defaultPageSize, response.totalResults, type.pluralName)
                  : ""}
              </Typography>

              {showPageSizeSelector && (
                <Dropdown
                  options={[
                    { value: 25, label: '25' },
                    { value: 50, label: '50' },
                    { value: 100, label: '100' },
                  ]}
                  value={filters.pageSize}
                  defaultValue={_defaultPageSize}
                  onChange={handlePageSizeChange}
                />
              )}
            </Stack>

            <TableContainer sx={{ mt: 1 }}>
              <Table
                loading={loading}
                rows={response?.results ?? []}
                selectedIds={selectedIds}
                {...props}
              />
            </TableContainer>
          </>
        )}

        {(!loading && response?.totalResults === 0) && (
          <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
            <Typography>No results Found</Typography>
          </Box>
        )}

        {loading && (
          <Box sx={{ mt: 2, mb: 3 }} display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )}
      </Box>


      {response?.totalPages > 1 && (
        <Box sx={{ mt: 3 }} display="flex" justifyContent="center">
          <Pagination count={response.totalPages} page={response.currentPage} onChange={handlePageChange} shape="rounded" />
        </Box>
      )}
    </Box>
  );
};

export default TableLayout;