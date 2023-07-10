import jwtDecode from 'jwt-decode';

import claimTypes from 'config/jwtClaimTypes';

export const actions = {
  LOGIN_REQUESTED: 'LOGIN_REQUESTED',
  LOGIN_SUCCESSFUL: 'LOGIN_SUCCESSFUL',
  LOGIN_FAILED: 'LOGIN_FAILED',
  LOGOUT: 'LOGOUT',
  REFRESHING_TOKENS_REQUESTED: 'REFRESHING_TOKENS_REQUESTED',
  REFRESHING_TOKENS_SUCCESSFUL: 'REFRESHING_TOKENS_SUCCESSFUL',
  REFRESHING_TOKENS_FAILED: 'REFRESHING_TOKENS_FAILED',
};

export const getClaims = (accessToken) => {
  const decoded = jwtDecode(accessToken);

  const claims = {
    userId: decoded[claimTypes.userId],
    email: decoded[claimTypes.email],
    role: decoded[claimTypes.role],
  };

  return claims;
};

export const reducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    // login
    case actions.LOGIN_REQUESTED:
      return {
        ...state,
        authenticating: true,
      };
    case actions.LOGIN_SUCCESSFUL:
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
    case actions.LOGIN_FAILED:
      return {
        ...state,
        authenticating: false,
        authenticated: false,
      };

    // Logout
    case actions.LOGOUT:
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
    case actions.REFRESHING_TOKENS_REQUESTED:
      return {
        ...state,
        refreshingRokens: true,
      };
    case actions.REFRESHING_TOKENS_SUCCESSFUL:
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
    case actions.REFRESHING_TOKENS_FAILED:
      return {
        ...state,
        refreshingRokens: false,
        authenticated: false,
      };

    default:
      return state;
  }
};
