import PageLayout from "src/layouts/PageLayout";
import TableLayout from "src/layouts/TableLayout";

export default ({
  title,
  type,
  filter,
  callback,
  renderFilters,
  renderUnderFilters,
  renderActions,
  table,
}) => {
  return (
    <PageLayout
      title={title}
      renderActions={renderActions}
    >
      <TableLayout
        type={type}
        callback={callback}
        filter={filter}
        renderFilters={renderFilters}
        renderUnderFilters={renderUnderFilters}
        table={table}
      />
    </PageLayout>
  )
};