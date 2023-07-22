import NiceModal from '@ebay/nice-modal-react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Providers from './contexts/Providers';
import './index.css';
import reportWebVitals from './reportWebVitals';

import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Providers>
    <NiceModal.Provider>
      <App />
    </NiceModal.Provider>
  </Providers>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
