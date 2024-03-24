import { ReactNode } from "react";
import PageLayout from "src/layouts/PageLayout";
import TableLayout from "src/layouts/TableLayout";

export interface CollectionPageLayoutProps {
  breadcrumbs?: ReactNode[]
  title?: string;
  type: {
    name: string;
    pluralName: string;
  };
  filter: any;
  callback: (filters: any) => any;
  renderFilters?: React.ReactNode;
  renderActions?: React.ReactNode;
  table: any;
  onRowClick: (id: string) => void;
  onReset?: () => void;
}

const CollectionPageLayout = ({
  breadcrumbs = [],
  title,
  type,
  filter,
  callback,
  renderFilters,
  renderActions,
  table,
  onRowClick = () => { },
  onReset = () => { },
  ...props
}: CollectionPageLayoutProps) => {
  return (
    <PageLayout
      breadcrumbs={breadcrumbs}
      title={title}
    >
      {renderActions}

      <TableLayout
        type={type}
        callback={callback}
        filter={filter}
        renderFilters={renderFilters}
        table={table}
        onRowClick={onRowClick}
        onReset={onReset}
        {...props}
      />
    </PageLayout>
  )
};

export default CollectionPageLayout;