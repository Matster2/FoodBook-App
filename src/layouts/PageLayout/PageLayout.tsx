import { Box, CircularProgress, Container } from '@mui/material';
import Header from 'src/components/Header';
import { useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface PageLayoutProps {
  title?: string;
  loading?: boolean;
  children?: ReactNode;
}

const PageLayout = ({
  title = "",
  loading = false,
  children
}: PageLayoutProps) => {
  const navigate = useNavigate();

  return (
    <Container sx={{ pb: 7 }}>
      <Header title={title} onBackClick={() => navigate(-1)} />

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