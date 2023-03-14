import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';

import Homepage from './pages/Homepage';
import Recipe from './pages/Recipe';
import RecipeList from './pages/RecipeList';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import ForgottenPassword from './pages/ForgottenPassword';

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#fb6b1c',
        contrastText: '#fff',
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
      path: '/recipe',
      element: <Recipe />,
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
