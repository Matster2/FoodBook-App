import { Box, Button, CircularProgress, Pagination, Paper, SelectChangeEvent, Stack, SxProps, TableContainer, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import Dropdown from 'src/components/Dropdown';

const _defaultPageSize: number = 25;
const _pageSizeOptions: number[] = [25, 50, 100]

interface TableLayoutProps {
  sx?: SxProps;
  title?: string;
  type: {
    name: string;
    pluralName: string;
  };
  filter: any;
  callback: (filters: any) => any;
  renderFilters?: React.ReactNode;

  showReset?: boolean;
  showPageSizeSelector?: boolean;
  showResultsText?: boolean;

  selectedIds?: number[] | string[]

  table: any;
  children?: React.ReactNode;
}

const TableLayout = ({
  sx = {},
  title,
  type,

  filter,
  callback,

  renderFilters,

  showReset = true,
  showPageSizeSelector = true,
  showResultsText = true,

  table,
  selectedIds = [],
  ...props
}: TableLayoutProps) => {
  const { t } = useTranslation();

  const { filters, setFilter } = filter;

  const {
    isFetching: loading,
    data: response
  } = useQuery({
    queryKey: [{ ...filters }],
    queryFn: () => callback({
      pageSize: _defaultPageSize,
      ...filters
    })
      .then((({ data }) => data))
  })

  const Table = table;

  /* Handlers */
  const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
    setFilter('page', value);
  };

  const handlePageSizeChange = (event: SelectChangeEvent<unknown>) => {
    setFilter('pageSize', event.target.value);
  };

  const getResultsText = (page: number, pageSize: number, totalResults: number) => {
    const resultsRange = {
      from: (page - 1) * pageSize,
      to: page * pageSize > totalResults ? totalResults : page * pageSize
    }

    return `Showing ${resultsRange.from} - ${resultsRange.to} out of ${totalResults} ${type.pluralName}`;
  }

  /* Rendering */
  return (
    <Box sx={sx}>
      <Stack sx={{ my: 1 }} direction="row" justifyContent="space-between" gap={2}>
        <Stack sx={{ flex: 1, flexWrap: "wrap" }} direction="row" justifyContent="space-between" gap={2}>
          {renderFilters}
        </Stack>

        {showReset && (
          <Button
            variant="contained"
            color="secondary"
          >
            {t("common.words.actions.reset")}
          </Button>
        )}
      </Stack>

      {response && (
        <>
          {response.totalResults > 0 && (
            <Stack direction="row" justifyContent="space-between" alignItems="end" gap={1}>
              <Typography>
                {showResultsText
                  ? getResultsText(response.page, filters.pageSize ?? _defaultPageSize, response.totalResults)
                  : ""}
              </Typography>

              {showPageSizeSelector && (
                <Dropdown
                  options={_pageSizeOptions.map((pageSize) => ({
                    value: pageSize, label: `${pageSize}`
                  }))}
                  value={filters.pageSize}
                  defaultValue={_defaultPageSize}
                  onChange={handlePageSizeChange}
                />
              )}
            </Stack>
          )}

          {response.results.length > 0 && (
            <TableContainer sx={{ mt: 1 }} component={Paper}>
              <Table
                loading={loading}
                rows={response?.results ?? []}
                selectedIds={selectedIds}
                {...props}
              />
            </TableContainer>
          )}

          {response.totalResults === 0 && (
            <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
              <Typography>No results Found</Typography>
            </Box>
          )}
        </>
      )}

      {loading && (
        <Box sx={{ mt: 2, mb: 3 }} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}

      {(response && response.totalPages > 1) && (
        <Box sx={{ mt: 3 }} display="flex" justifyContent="center">
          <Pagination count={response.totalPages} page={response.currentPage} onChange={handlePageChange} shape="rounded" />
        </Box>
      )}
    </Box>
  );
};

export default TableLayout;