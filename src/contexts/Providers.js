import React, { createElement } from 'react';
import PropTypes from 'prop-types';

import { AppProvider } from './AppContext';
import { AuthProvider } from './AuthContext';
import { UserProvider } from './UserContext';
import { TagProvider } from './TagContext';

const Providers = ({ children }) => (
  <AppProvider>
    <AuthProvider>
      <UserProvider>
        <TagProvider>{children}</TagProvider>
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
