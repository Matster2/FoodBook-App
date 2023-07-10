import { BottomNavigation, BottomNavigationAction, Box, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import axios from 'axios';
import classnames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import { Link, Outlet, RouterProvider, createBrowserRouter, matchPath, useLocation } from 'react-router-dom';

import { AppContext } from './contexts/AppContext';
import { LanguageContext } from './contexts/LanguageContext';
import { UserContext } from './contexts/UserContext';
import useAPI from './hooks/useAPI';
import useAuth from './hooks/useAuth';

import AdminRoute from './routings/AdminRoute';
import AuthRoute from './routings/AuthRoute';
import UnAuthRoute from './routings/UnAuthRoute';

import AccountSettings from './pages/Account/AccountSettings';
import ChangePassword from './pages/Account/ChangePassword';
import AdminAddAuthor from './pages/Admin/AddAuthor';
import AdminAuthors from './pages/Admin/Authors';
import AdminIngredient from './pages/Admin/Ingredient';
import AdminIngredients from './pages/Admin/Ingredients';
import AdminLogs from './pages/Admin/Logs';
import AdminRecipe from './pages/Admin/Recipe';
import AdminRecipes from './pages/Admin/Recipes';
import AdminSettings from './pages/Admin/Settings';
import AdminSupportTickets from './pages/Admin/SupportTickets';
import AdminTag from './pages/Admin/Tag';
import AdminTags from './pages/Admin/Tags';
import Author from './pages/Author';
import ContactUs from './pages/ContactUs';
import Favourites from './pages/Favourites';
import ForgottenPassword from './pages/ForgottenPassword';
import Homepage from './pages/Homepage';
import IngredientList from './pages/IngredientList';
import NotFound from './pages/NotFound';
import OfflinePage from './pages/Offline';
import Planner from './pages/Planner';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Recipe from './pages/Recipe';
import Recipes from './pages/Recipes';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import Settings from './pages/Settings';
import SignIn from './pages/SignIn';
import TermsOfService from './pages/TermsOfService';

import AuthenticationModal from './modals/AuthenticationModal';

import { ReactComponent as SettingsIcon } from './assets/icons/cog.svg';
import { ReactComponent as DiscoverIcon } from './assets/icons/discover.svg';
import { ReactComponent as HeartIcon } from './assets/icons/heart.svg';
import { ReactComponent as HomeIcon } from './assets/icons/home.svg';
import { ReactComponent as PlannerIcon } from './assets/icons/planner.svg';

import '@fancyapps/ui/dist/fancybox/fancybox.css';
import styles from './App.module.css';

const App = () => {
  const { authenticated, refreshTokens } = useAuth();
  const api = useAPI();

  const { setSupportedLanguages } = useContext(LanguageContext);
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

  const fetchSupportedLanguages = async () => {
    try {
      const { data } = await api.getSupportedLanguages();
      setSupportedLanguages(data.results.map(x => x.code));
    } catch {
      console.log('error fetching supported languages');
    }
  }

  useEffect(() => {
    fetchSupportedLanguages();
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
          path: '/',
          element: <Homepage />,
        },
        {
          path: '/home',
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
          path: '/account',
          element: (
            <AuthRoute>
              <AccountSettings />
            </AuthRoute>
          ),
        },
        {
          path: '/change-password',
          element: (
            <AuthRoute>
              <ChangePassword />
            </AuthRoute>
          ),
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
          path: '/ingredient-list',
          element: (
            <AdminRoute>
              <IngredientList />
            </AdminRoute>
          ),
        },
        {
          path: '/authors/:id',
          element: <Author />,
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
              <AdminTag />
            </AdminRoute>
          ),
        },
        {
          path: '/admin/tags/:id',
          element: (
            <AdminRoute>
              <AdminTag />
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
              <AdminIngredient />
            </AdminRoute>
          ),
        },
        {
          path: '/admin/ingredients/:id',
          element: (
            <AdminRoute>
              <AdminIngredient />
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
          path: '/admin/recipes',
          element: (
            <AdminRoute>
              <AdminRecipes />
            </AdminRoute>
          ),
        },
        {
          path: '/admin/recipes/add',
          element: (
            <AdminRoute>
              <AdminRecipe />
            </AdminRoute>
          ),
        },
        {
          path: '/admin/recipes/:id',
          element: (
            <AdminRoute>
              <AdminRecipe />
            </AdminRoute>
          ),
        },
        {
          path: '/admin/support-tickets',
          element: (
            <AdminRoute>
              <AdminSupportTickets />
            </AdminRoute>
          ),
        },
        {
          path: '/admin/logs',
          element: (
            <AdminRoute>
              <AdminLogs />
            </AdminRoute>
          ),
        },
      ]
    },
    {
      children: [
        {
          path: '/sign-in',
          element: (
            <UnAuthRoute>
              <SignIn />
            </UnAuthRoute>
          ),
        },
        {
          path: '/forgotten-password',
          element: (
            <UnAuthRoute>
              <ForgottenPassword />
            </UnAuthRoute>
          ),
        },
        {
          path: '/register',
          element: (
            <UnAuthRoute>
              <Register />
            </UnAuthRoute>
          ),
        },
        {
          path: '/reset-password',
          element: <ResetPassword />
        },
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
    {
      children: [
        {
          path: '*',
          element: <NotFound />,
        },
      ]
    }
  ]);

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Update network status
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    // Listen to the online status
    window.addEventListener('online', handleStatusChange);

    // Listen to the offline status
    window.addEventListener('offline', handleStatusChange);

    // Specify how to clean up after this effect for performance improvment
    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, [isOnline]);

  return (
    <ThemeProvider theme={theme}>
      {!isOnline && (
        <OfflinePage />
      )}
        
      {(isOnline && initialized) && (<RouterProvider router={router} />)}

      <Toaster />
    </ThemeProvider>
  );
};

const Layout = () => {
  const { t } = useTranslation();
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
    if (matchPath('/recipes/*', pathname)) {
      return true;
    }

    return false;
  };

  const isPlannerActive = () => {
    if (matchPath('/planner/*', pathname)) {
      return true;
    }
    return false;
  };

  const isFavouritesActive = () => {
    if (matchPath('/favourites/*', pathname)) {
      return true;
    }
    return false;
  };

  const isSettingsActive = () => {
    if (matchPath('/settings/*', pathname)) {
      return true;
    }

    if (matchPath('/contact-us/*', pathname)) {
      return true;
    }

    return false;
  };

  return (
    <Box sx={{ pb: 4 }}>
      <AuthenticationModal id="authentication-modal" />

      <Outlet />

      <BottomNavigation showLabels className={styles.bottomNav} sx={{ position: 'fixed', bottom: 0, zIndex: 999 }} elevation={3}>
        <BottomNavigationAction
          className={classnames(styles.navOption, isHomeActive() ? styles.navOptionSelected : '')}
          component={Link}
          to="/"
          label={t("pages.home.title")}
          icon={<HomeIcon className={classnames(styles.navOptionIcon, isHomeActive() ? styles.navOptionSelected : '')} />}
        />
        <BottomNavigationAction
          className={classnames(styles.navOption, isDiscoverActive() ? styles.navOptionSelected : '')}
          component={Link}
          to="/recipes"
          label={t("components.bottomNavBar.discover")}
          icon={
            <DiscoverIcon className={classnames(styles.navOptionIcon, isDiscoverActive() ? styles.navOptionSelected : '')} />
          }
        />
        <BottomNavigationAction
          className={classnames(styles.navOption, isPlannerActive() ? styles.navOptionSelected : '')}
          component={Link}
          to="/planner"
          label={t("pages.planner.title")}
          icon={
            <PlannerIcon className={classnames(styles.navOptionIcon, styles.planner, isPlannerActive() ? styles.navOptionSelected : '')} />
          }
        />
        <BottomNavigationAction
          className={classnames(styles.navOption, isFavouritesActive() ? styles.navOptionSelected : '')}
          component={Link}
          to="/favourites"
          label={t("pages.favourites.title")}
          icon={
            <HeartIcon className={classnames(styles.navOptionIcon, isFavouritesActive() ? styles.navOptionSelected : '')} />
          }
        />
        <BottomNavigationAction
          className={classnames(styles.navOption, isSettingsActive() ? styles.navOptionSelected : '')}
          component={Link}
          to="/settings"
          label={t("pages.settings.title")}
          icon={
            <SettingsIcon className={classnames(styles.navOptionIcon, isSettingsActive() ? styles.navOptionSelected : '')} />
          }
        />
      </BottomNavigation>
    </Box>
  );
};

export default App;
