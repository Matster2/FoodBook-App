import axios from 'axios';

import useAuth from './useAuth';

const useAPI = () => {
  const { tokens } = useAuth();

  const queryEmail = async (email) => {
    return axios.get(`${process.env.REACT_APP_API_URL}/users/email/${email}`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
  };

  const forgotPassword = async (email) => {
    return axios.post(
      `${process.env.REACT_APP_API_URL}/auth/forgot-password`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
  };

  const register = async (email, password) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/register`, { email, password });
  };

  const getMe = async () => {
    return axios.get(`${process.env.REACT_APP_API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
  };

  const getRecipes = async (parameters = {}) => {
    const url = new URL(`${process.env.REACT_APP_API_URL}/recipes`);
    url.search = new URLSearchParams(parameters);

    return axios.get(url.href, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
  };

  const getRecipe = async (id) => {
    return axios.get(`${process.env.REACT_APP_API_URL}/recipes/${id}`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
  };

  const getIngredients = async (parameters = {}) => {
    const url = new URL(`${process.env.REACT_APP_API_URL}/ingredients`);
    url.search = new URLSearchParams(parameters);

    return axios.get(url.href, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
  };

  const getTags = async (parameters = {}) => {
    const url = new URL(`${process.env.REACT_APP_API_URL}/tags`);
    url.search = new URLSearchParams(parameters);

    return axios.get(url.href, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
  };

  return {
    queryEmail,
    forgotPassword,
    register,
    getMe,
    getRecipes,
    getRecipe,
    getIngredients,
    getTags,
  };
};

export default useAPI;
