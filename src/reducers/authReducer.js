import jwtDecode from 'jwt-decode';

import claimTypes from '../config/jwtClaimTypes';

export const getClaims = (accessToken) => {
  const decoded = jwtDecode(accessToken);

  const claims = {
    userId: parseInt(decoded[claimTypes.userId], 10),
    email: decoded[claimTypes.email],
    role: decoded[claimTypes.role],
    accountId: decoded[claimTypes.accountId],
  };

  return claims;
};

export const reducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    // login
    case 'login_requested':
      return {
        ...state,
        authenticating: true,
      };
    case 'login_successful':
      return {
        ...state,
        authenticating: false,
        authenticated: true,
        claims: getClaims(payload.tokens.accessToken),
        tokens: {
          accessToken: payload.tokens.accessToken,
          refreshToken: payload.tokens.refreshToken,
        },
      };
    case 'login_failed':
      return {
        ...state,
        authenticating: false,
        authenticated: false,
      };

    // Logout
    case 'logout':
      return {
        ...state,
        authenticated: false,
        authenticating: false,
        claims: undefined,
        tokens: {
          accessToken: undefined,
          refreshToken: undefined,
        },
      };

    // Refreshing Tokens
    // login
    case 'refreshing_tokens_requested':
      return {
        ...state,
        refreshingRokens: true,
      };
    case 'refreshing_tokens_successful':
      return {
        ...state,
        refreshingRokens: false,
        authenticated: true,
        claims: getClaims(payload.tokens.accessToken),
        tokens: {
          accessToken: payload.tokens.accessToken,
          refreshToken: payload.tokens.refreshToken,
        },
      };
    case 'refreshing_tokens_failed':
      return {
        ...state,
        refreshingRokens: false,
        authenticated: false,
      };

    default:
      return state;
  }
};
