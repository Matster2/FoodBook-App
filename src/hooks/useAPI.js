import axios from 'axios';

import useAuth from './useAuth';
import { isNullOrEmpty, isUndefined } from '../utils/utils';

const getSearchParams = (parameters) => {
  const filters = parameters;
  Object.keys(filters).forEach((key) => {
    const value = filters[key];
    if (isNullOrEmpty(value) || isUndefined(value) || (Array.isArray(value) && value.length === 0)) {
      delete filters[key];
    }
  });

  return new URLSearchParams(filters);
};

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
    url.search = getSearchParams(parameters);

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
    url.search = getSearchParams(parameters);

    return axios.get(url.href, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
  };

  const getTags = async (parameters = {}) => {
    const url = new URL(`${process.env.REACT_APP_API_URL}/tags`);
    url.search = getSearchParams(parameters);

    return axios.get(url.href, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
  };

  const getUnitOfMeasurements = async (parameters = {}) => {
    const url = new URL(`${process.env.REACT_APP_API_URL}/unit-of-measurements`);
    url.search = getSearchParams(parameters);

    return axios.get(url.href, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
  };

  const favouriteRecipe = async (recipeId) => {
    return axios.post(
      `${process.env.REACT_APP_API_URL}/recipes/${recipeId}/favourite`,
      {},
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
  };

  const unfavouriteRecipe = async (recipeId) => {
    return axios.post(
      `${process.env.REACT_APP_API_URL}/recipes/${recipeId}/unfavourite`,
      {},
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
  };

  const contactUs = async (email, message) => {
    return axios.post(
      `${process.env.REACT_APP_API_URL}/contact-us`,
      {
        email,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
  };

  const deleteMyUser = async () => {
    return axios.delete(`${process.env.REACT_APP_API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
  };

  const rateRecipe = async (recipeId, rating) => {
    return axios.put(
      `${process.env.REACT_APP_API_URL}/recipes/${recipeId}/rate`,
      {
        rating,
      },
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
  };

  const getUserRecipeRating = async (recipeId, userId) => {
    return axios.get(`${process.env.REACT_APP_API_URL}/recipes/${recipeId}/rating/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
  };

  const getRecipeRating = async (recipeId) => {
    return axios.get(`${process.env.REACT_APP_API_URL}/recipes/${recipeId}/rating`, {
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
    getUnitOfMeasurements,
    favouriteRecipe,
    unfavouriteRecipe,
    contactUs,
    deleteMyUser,
    rateRecipe,
    getUserRecipeRating,
    getRecipeRating,
  };
};

export default useAPI;
