import { Table as MuiTable, TableRow as MuiTableRow, TableBody, TableCell, TableHead, TableSortLabel } from '@mui/material';

export interface TableColumn {
  heading: string;
}

export interface TableRow {
  identifier: string;
  data: [];
}

interface TableProps {
  columns?: TableColumn[];
  rows?: TableRow[];
  onRowClick?: (identifier: string) => void;
  sortBy?: string;
  sortDescending?: boolean;
  loading?: boolean;
  selectedIds?: string[];
}

const Table = ({
  columns = [],
  rows = [],
  onRowClick = () => { },
  loading = false,
  sortBy = '',
  sortDescending = false,
  selectedIds = []
}: TableProps) => {

  const handleRowClick = (identifier: string) => {
    onRowClick(identifier);
  }

  return (
    <MuiTable>
      <TableHead>
        <MuiTableRow>
          {columns.map((column) => (
            <TableCell key={column.heading}>
              <TableSortLabel
              >
                {column.heading}
              </TableSortLabel>
            </TableCell>
          ))}
        </MuiTableRow>
      </TableHead>
      <TableBody>
        {rows.map((row: TableRow) => (
          <MuiTableRow
            selected={selectedIds.includes(row.identifier)}
            hover
            key={row.identifier}
            sx={{
              cursor: "pointer",
              '&:last-child td, &:last-child th': { border: 0 }
            }}
            onClick={() => handleRowClick(row.identifier)}
          >
            {row.data.map((field, index) => (
              <TableCell key={index}>{field}</TableCell>
            ))}
          </MuiTableRow>
        ))}
      </TableBody>
    </MuiTable>
  )
}

export default Table;