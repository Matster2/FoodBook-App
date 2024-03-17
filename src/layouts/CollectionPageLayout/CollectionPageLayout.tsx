import PageLayout from "src/layouts/PageLayout";
import TableLayout from "src/layouts/TableLayout";

interface CollectionPageLayoutProps {
  title?: string;
  type: {
    name: string;
    pluralName: string;
  };
  filter: any;
  callback: (filters: any) => any;
  renderFilters: React.ReactNode;
  renderActions: React.ReactNode;
  table: any;
}

const CollectionPageLayout = ({
  title,
  type,
  filter,
  callback,
  renderFilters,
  renderActions,
  table,
}: CollectionPageLayoutProps) => {
  return (
    <PageLayout
      title={title}
    >
      {renderActions}

      <TableLayout
        type={type}
        callback={callback}
        filter={filter}
        renderFilters={renderFilters}
        table={table}
      />
    </PageLayout>
  )
};

export default CollectionPageLayout;