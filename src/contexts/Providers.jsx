import PropTypes from 'prop-types';
import { createElement } from 'react';
import { AppProvider } from './AppContext';
import { AuthProvider } from './AuthContext';
import { LanguageProvider } from './LanguageContext';
import { TagProvider } from './TagContext';
import { UnitOfMeasurementProvider } from './UnitOfMeasurementContext';
import { UserProvider } from './UserContext';

const Providers = ({ children }) => (
  <AppProvider>
    <LanguageProvider>
      <AuthProvider>
        <UserProvider>
          <UnitOfMeasurementProvider>
            <TagProvider>{children}</TagProvider>
          </UnitOfMeasurementProvider>
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
