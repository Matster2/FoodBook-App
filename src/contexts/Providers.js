import React, { createElement } from 'react';
import PropTypes from 'prop-types';

import { AppProvider } from './AppContext';
import { AuthProvider } from './AuthContext';
import { UserProvider } from './UserContext';
import { UnitOfMeasurementProvider } from './UnitOfMeasurementContext';
import { TagProvider } from './TagContext';

const Providers = ({ children }) => (
  <AppProvider>
    <AuthProvider>
      <UserProvider>
        <UnitOfMeasurementProvider>
          <TagProvider>{children}</TagProvider>
        </UnitOfMeasurementProvider>
      </UserProvider>
    </AuthProvider>
  </AppProvider>
);

Providers.propTypes = {
  children: PropTypes.node,
};

Providers.defaultProps = {
  children: createElement('div'),
};

export default Providers;
