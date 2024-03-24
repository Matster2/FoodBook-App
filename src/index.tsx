import {
  QueryCache,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import App from './App';
import Providers from './contexts/Providers';
import './i18n';
import './index.css';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (_, query: any) => {
      // if (query.meta.errorMessage) {
      //   toast.error(query.meta.errorMessage)
      // }
    },
  }),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Providers>
      <App />
    </Providers>
  </QueryClientProvider>
)