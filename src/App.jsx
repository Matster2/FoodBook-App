import NiceModal from '@ebay/nice-modal-react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import axios from 'axios';
import { LanguageContext } from 'src/contexts/LanguageContext';
import { useContext, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import apiAxiosInstance from 'src/config/axios';
import { AppContext } from 'src/contexts/AppContext';
import useAPI from 'src/hooks/useAPI';
import useAuth from 'src/hooks/useAuth';
import router from 'src/router';

import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { useQuery } from '@tanstack/react-query';

const App = () => {
  const { authenticated, tokens, refreshTokens, logout } = useAuth();
  const { currentLanguage } = useContext(LanguageContext);
  const api = useAPI();

  const { initialized, setInitialized, maintenance, setMaintenance } = useContext(AppContext);

  useEffect(() => {
    apiAxiosInstance.defaults.headers.common.Authorization = `Bearer ${tokens?.accessToken}`;
    apiAxiosInstance.defaults.headers.common.Language = currentLanguage;
  }, [tokens]);

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
        if (isRefreshing && authenticated) {
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

  useQuery({
    queryKey: ["system"],
    queryFn: () => api.getSystem()
      .then(({ data }) => data),
    onSuccess: () => setMaintenance(false)
  });

  useQuery({
    queryKey: ["languages"],
    queryFn: () => api.getSupportedLanguages()
      .then(({ data }) => data.results),
  });

  useQuery({
    queryKey: ["tags"],
    queryFn: () => api.getTags()
      .then(({ data }) => data.results)
  });

  useQuery({
    queryKey: ["profile"],
    queryFn: () => api.getMe()
      .then(({ data }) => data),
    enabled: authenticated,
  });

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

  useEffect(() => {
    setMaintenance(false);
    setInitialized(true);
  }, [])

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
      <NiceModal.Provider>
        <CssBaseline />

        {!isOnline && (
          <OfflinePage />
        )}

        {(isOnline && initialized) && (<RouterProvider router={router} />)}

        <Toaster />
      </NiceModal.Provider>
    </ThemeProvider>
  );
};

export default App;
