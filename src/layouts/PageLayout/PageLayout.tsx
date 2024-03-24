import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import { Box, Breadcrumbs, CircularProgress, Container } from '@mui/material';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import Header from 'src/components/Header';

interface PageLayoutProps {
  title?: string;
  breadcrumbs?: ReactNode[];
  loading?: boolean;
  children?: ReactNode;
}

const PageLayout = ({
  title = "",
  breadcrumbs = [],
  loading = false,
  children
}: PageLayoutProps) => {
  const navigate = useNavigate();

  return (
    <Container sx={{ pb: 7 }}>
      <Header title={title} onBackClick={() => navigate(-1)} />

      {breadcrumbs.length > 0 && (
        <Breadcrumbs
          sx={{ mb: 2 }}
          separator={<NavigateNextIcon fontSize="small" />}
        >
          {breadcrumbs.map((breadcrumbs) => (
            <div key={uuid()}>{breadcrumbs}</div>
          ))}
        </Breadcrumbs>
      )}

      {loading && (
        <Box sx={{ mt: 2, mb: 4 }} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}

      {children}
    </Container>
  )
};

export default PageLayout;