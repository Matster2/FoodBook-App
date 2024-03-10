import PropTypes from 'prop-types';
import { createElement } from 'react';
import { AppProvider } from './AppContext';
import { AuthProvider } from './AuthContext';
import { LanguageProvider } from './LanguageContext';
import { UserProvider } from './UserContext';

const Providers = ({ children }) => (
  <AppProvider>
    <LanguageProvider>
      <AuthProvider>
        <UserProvider>
          {children}
        </UserProvider>
      </AuthProvider>
    </LanguageProvider>
  </AppProvider>
);

Providers.propTypes = {
  children: PropTypes.node,
};

Providers.defaultProps = {
  children: createElement('div'),
};

export default Providers;
