import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, RouterProvider, Link, Outlet, useLocation, matchPath } from 'react-router-dom';
import { ThemeProvider, BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';

import { AppContext } from './contexts/AppContext';
import { UserContext } from './contexts/UserContext';
import useAuth from './hooks/useAuth';
import useAPI from './hooks/useAPI';

import AdminRoute from './routings/AdminRoute';

import Homepage from './pages/Homepage';
import Recipe from './pages/Recipe';
import Recipes from './pages/Recipes';
import Favourites from './pages/Favourites';
import Settings from './pages/Settings';
import ContactUs from './pages/ContactUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AdminTags from './pages/Admin/Tags';
import AdminAddTag from './pages/Admin/AddTag';
import AdminIngredients from './pages/Admin/Ingredients';
import AdminAddIngredient from './pages/Admin/AddIngredient';
import AdminAuthors from './pages/Admin/Authors';
import AdminAddAuthor from './pages/Admin/AddAuthor';
import AdminAddRecipe from './pages/Admin/AddRecipe';
import AdminSettings from './pages/Admin/Settings';
import Planner from './pages/Planner';
import TermsOfService from './pages/TermsOfService';

import AuthenticationModal from './modals/AuthenticationModal';

import { ReactComponent as HomeIcon } from './assets/icons/home.svg';
import { ReactComponent as DiscoverIcon } from './assets/icons/discover.svg';
import { ReactComponent as PlannerIcon } from './assets/icons/planner.svg';
import { ReactComponent as HeartIcon } from './assets/icons/heart.svg';
import { ReactComponent as SettingsIcon } from './assets/icons/cog.svg';

import styles from './App.module.css';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

const App = () => {
  const { authenticated, refreshTokens } = useAuth();
  const api = useAPI();

  const { initialized, setInitialized } = useContext(AppContext);
  const { setUser } = useContext(UserContext);

  let isRefreshing = false;
  let failedQueue = [];

  const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });

    failedQueue = [];
  };

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return axios(originalRequest);
            })
            .catch((err) => Promise.reject(error));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
          try {
            const newTokens = await refreshTokens();
            originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
            processQueue(null, newTokens.accessToken);
            resolve(axios(originalRequest));
          } catch (e) {
            processQueue(e, null);
            reject(e);
          }

          isRefreshing = false;
        });
      }

      return Promise.reject(error);
    }
  );

  const fetchUser = async () => {
    try {
      const { data } = await api.getMe();
      setUser(data);
    } catch {
      console.log('error fetching user');
    }
  };

  useEffect(() => {
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchUser();
    }
  }, [authenticated]);

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
      MuiTableCell: {
        styleOverrides: {
          head: {
            fontWeight: 'normal',
            background: '#fb6b1c',
            color: 'white',
            borderBottom: '1px solid white',
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
      MuiInputAdornment: {
        styleOverrides: {
          root: {
            backgroundColor: 'white',
            background: 'white',
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
          path: '/*',
          element: <Homepage />,
        },
        {
          path: '/',
          element: <Homepage />,
        },
        {
          path: '/recipes',
          element: <Recipes />,
        },
        {
          path: '/favourites',
          element: <Favourites />,
        },
        {
          path: '/settings',
          element: <Settings />,
        },
        {
          path: '/contact-us',
          element: <ContactUs />,
        },
        {
          path: '/planner',
          element: <Planner />,
        },
        {
          path: '/admin/settings',
          element: (
            <AdminRoute>
              <AdminSettings />
            </AdminRoute>
          ),
        },
        {
          path: '/admin/tags',
          element: (
            <AdminRoute>
              <AdminTags />
            </AdminRoute>
          ),
        },
        {
          path: '/admin/tags/add',
          element: (
            <AdminRoute>
              <AdminAddTag />
            </AdminRoute>
          ),
        },
        {
          path: '/admin/ingredients',
          element: (
            <AdminRoute>
              <AdminIngredients />
            </AdminRoute>
          ),
        },
        {
          path: '/admin/ingredients/add',
          element: (
            <AdminRoute>
              <AdminAddIngredient />
            </AdminRoute>
          ),
        },
        {
          path: '/admin/authors',
          element: (
            <AdminRoute>
              <AdminAuthors />
            </AdminRoute>
          ),
        },
        {
          path: '/admin/authors/add',
          element: (
            <AdminRoute>
              <AdminAddAuthor />
            </AdminRoute>
          ),
        },
        {
          path: '/admin/recipes/add',
          element: (
            <AdminRoute>
              <AdminAddRecipe />
            </AdminRoute>
          ),
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
        {
          path: '/privacy-policy',
          element: <PrivacyPolicy />,
        },
        {
          path: '/terms-of-service',
          element: <TermsOfService />,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      {initialized && <RouterProvider router={router} />}
      <Toaster />
    </ThemeProvider>
  );
};

const Layout = () => {
  const { pathname } = useLocation();

  const isHomeActive = () => {
    if (matchPath('/home', pathname)) {
      return true;
    }

    if (matchPath('/', pathname)) {
      return true;
    }

    if (matchPath('', pathname)) {
      return true;
    }

    return false;
  };

  const isDiscoverActive = () => {
    if (matchPath('/recipes*', pathname)) {
      return true;
    }

    return false;
  };

  const isPlannerActive = () => {
    if (matchPath('/planner*', pathname)) {
      return true;
    }
    return false;
  };

  const isFavouritesActive = () => {
    if (matchPath('/favourites*', pathname)) {
      return true;
    }
    return false;
  };

  const isSettingsActive = () => {
    if (matchPath('/settings*', pathname)) {
      return true;
    }

    if (matchPath('/contact-us*', pathname)) {
      return true;
    }

    return false;
  };

  return (
    <Box sx={{ pb: 4 }}>
      <AuthenticationModal id="authentication-modal" />

      <Outlet />

      <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999 }} elevation={3}>
        <BottomNavigation showLabels className={styles.bottomNav}>
          <BottomNavigationAction
            className={isHomeActive() && styles.navOptionSelected}
            component={Link}
            to="/"
            label="Home"
            icon={<HomeIcon className={classnames(styles.navOption, isHomeActive() && styles.navOptionSelected)} />}
          />
          <BottomNavigationAction
            className={isDiscoverActive() && styles.navOptionSelected}
            component={Link}
            to="/recipes"
            label="Discover"
            icon={
              <DiscoverIcon className={classnames(styles.navOption, isDiscoverActive() && styles.navOptionSelected)} />
            }
          />
          <BottomNavigationAction
            className={isPlannerActive() && styles.navOptionSelected}
            component={Link}
            to="/planner"
            label="Planner"
            icon={
              <PlannerIcon className={classnames(styles.navOption, styles.planner, isPlannerActive() && styles.navOptionSelected)} />
            }
          />
          <BottomNavigationAction
            className={isFavouritesActive() && styles.navOptionSelected}
            component={Link}
            to="/favourites"
            label="Favourites"
            icon={
              <HeartIcon className={classnames(styles.navOption, isFavouritesActive() && styles.navOptionSelected)} />
            }
          />
          <BottomNavigationAction
            className={isSettingsActive() && styles.navOptionSelected}
            component={Link}
            to="/settings"
            label="Settings"
            icon={
              <SettingsIcon className={classnames(styles.navOption, isSettingsActive() && styles.navOptionSelected)} />
            }
          />
        </BottomNavigation>
      </Box>
    </Box>
  );
};

export default App;
