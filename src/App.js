import React, { useContext, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider, BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import { Restore as RestoreIcon, Favorite as FavoriteIcon, LocationOn as LocationOnIcon } from '@mui/icons-material';
import { createTheme } from '@mui/material/styles';

import { AppContext } from './contexts/AppContext';

import Homepage from './pages/Homepage';
import Recipe from './pages/Recipe';
import RecipeList from './pages/RecipeList';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import ForgottenPassword from './pages/ForgottenPassword';

const App = () => {
  const { initialized, setInitialized } = useContext(AppContext);

  useEffect(() => {
    setInitialized(true);
  }, []);

  const theme = createTheme({
    palette: {
      background: {
        default: '#f5f5f5',
      },
      primary: {
        main: '#fb6b1c',
        contrastText: '#fff',
      },
    },
    components: {
      MuiInputBase: {
        styleOverrides: {
          input: {
            background: '#ffffff',
          },
        },
      },
    },
  });

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Homepage />,
    },
    {
      path: '/sign-in',
      element: <SignIn />,
    },
    {
      path: '/forgotten-password',
      element: <ForgottenPassword />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/recipes',
      element: <RecipeList />,
    },
    {
      path: '/recipes/:id',
      element: <Recipe />,
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      {initialized && (
        <>
          <RouterProvider router={router} />

          <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation showLabels>
              <BottomNavigationAction label="Home" icon={<RestoreIcon />} />
              <BottomNavigationAction label="Discover" icon={<FavoriteIcon />} />
              <BottomNavigationAction label="Favourites" icon={<LocationOnIcon />} />
              <BottomNavigationAction label="Settings" icon={<LocationOnIcon />} />
            </BottomNavigation>
          </Box>
        </>
      )}
    </ThemeProvider>
  );
};

export default App;
