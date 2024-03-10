import { Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';

export default ({
  columns = [],
  rows = [],
  onRowClick = () => {},
  loading = false,
  sortBy = '',
  sortDescending = false,
  selectedIds = []
}) => (
  <Table>
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell>
            <TableSortLabel
              // active={orderBy === headCell.id}
              // direction={orderBy === headCell.id ? order : 'asc'}
              // onClick={createSortHandler(headCell.id)}
            >
              {column.heading}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row) => (          
        <TableRow
          selected={selectedIds.includes(row.identifier)}
          hover
          key={row.identifier}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          onClick={() => onRowClick(row.identifier)}
        >
          {row.data.map((field, index) => (
            <TableCell key={index}>{field}</TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
)