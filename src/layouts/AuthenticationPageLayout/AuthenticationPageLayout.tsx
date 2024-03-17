import { Box, Container, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from 'src/assets/logo.svg';
import Image from 'src/components/Image';

interface AuthenticationPageLayoutProps {
  title: string;
  children?: ReactNode;
}

const AuthenticationPageLayout = ({
  title,
  children
}: AuthenticationPageLayoutProps) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  }

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Image
          onClick={handleLogoClick}
          src={logo}
          alt="foodbook"
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}
      >
        <Typography variant="h1">{title}</Typography>
      </Box>

      {children}
    </Container>
  )
};

export default AuthenticationPageLayout;