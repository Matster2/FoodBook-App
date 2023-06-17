import React, { createElement } from 'react';
import PropTypes from 'prop-types';

import { AppProvider } from './AppContext';
import { LanguageProvider } from './LanguageContext';
import { AuthProvider } from './AuthContext';
import { UserProvider } from './UserContext';
import { UnitOfMeasurementProvider } from './UnitOfMeasurementContext';
import { TagProvider } from './TagContext';

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
