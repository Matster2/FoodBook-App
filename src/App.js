import React, { useContext, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Link, Outlet } from 'react-router-dom';
import { ThemeProvider, BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import { Restore as RestoreIcon, Favorite as FavoriteIcon, LocationOn as LocationOnIcon } from '@mui/icons-material';
import { createTheme } from '@mui/material/styles';

import { AppContext } from './contexts/AppContext';

import Homepage from './pages/Homepage';
import Recipe from './pages/Recipe';
import RecipeList from './pages/RecipeList';
import Settings from './pages/Settings';

import AuthenticationModal from './modals/AuthenticationModal';

const App = () => {
  const { initialized, setInitialized } = useContext(AppContext);

  useEffect(() => {
    setInitialized(true);
  }, []);

  const theme = createTheme({
    typography: {
      fontFamily: `"Urbanist", sans-serif`,
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      h1: {
        fontSize: ['1.6rem', '!important'],
        fontWeight: 'bold',
      },
      h2: {
        fontSize: ['1.5rem', '!important'],
        fontWeight: 'bold',
      },
      h3: {
        fontSize: ['1.4rem', '!important'],
        fontWeight: 'bold',
      },
      h4: {
        fontSize: ['1.3rem', '!important'],
        fontWeight: 'bold',
      },
      h5: {
        fontSize: ['1.2rem', '!important'],
        fontWeight: 'bold',
      },
      h6: {
        fontSize: ['1.0rem', '!important'],
        fontWeight: 'bold',
        marginBottom: '0.4rem',
      },
      subtitle2: {
        fontSize: ['0.8rem', '!important'],
        fontWeight: 'normal',
      },
    },
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
      MuiChip: {
        styleOverrides: {
          colorPrimary: {
            backgroundColor: '#ffffff',
            color: '#757B7A',
            borderRadius: 4,
          },
          colorSecondary: {
            backgroundColor: '#ffffff',
          },
        },
      },
    },
  });

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Homepage />,
        },
        {
          path: '/recipes',
          element: <RecipeList />,
        },
        {
          path: '/favourites',
          element: <RecipeList />,
        },
        {
          path: '/settings',
          element: <Settings />,
        },
      ],
    },
    {
      children: [
        // {
        //   path: '/sign-in',
        //   element: (
        //     <UnAuthRoute>
        //       <SignIn />
        //     </UnAuthRoute>
        //   ),
        // },
        // {
        //   path: '/forgotten-password',
        //   element: (
        //     <UnAuthRoute>
        //       <ForgottenPassword />
        //     </UnAuthRoute>
        //   ),
        // },
        // {
        //   path: '/register',
        //   element: (
        //     <UnAuthRoute>
        //       <Register />
        //     </UnAuthRoute>
        //   ),
        // },
        {
          path: '/recipes/:id',
          element: <Recipe />,
        },
      ],
    },
  ]);

  return <ThemeProvider theme={theme}>{initialized && <RouterProvider router={router} />}</ThemeProvider>;
};

const Layout = () => {
  return (
    <>
      <AuthenticationModal id="authentication-modal" />

      <Outlet />

      <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999 }} elevation={3}>
        <BottomNavigation showLabels className="buttom-nav">
          <BottomNavigationAction component={Link} to="/" label="Home" icon={<RestoreIcon />} />
          <BottomNavigationAction component={Link} to="/recipes" label="Discover" icon={<FavoriteIcon />} />
          <BottomNavigationAction component={Link} to="/favourites" label="Favourites" icon={<LocationOnIcon />} />
          <BottomNavigationAction component={Link} to="/settings" label="Settings" icon={<LocationOnIcon />} />
        </BottomNavigation>
      </Box>
    </>
  );
};

export default App;
