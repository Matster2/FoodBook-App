import axios from 'axios';
import { useContext } from 'react';
import { LanguageContext } from 'src/contexts/LanguageContext';
import { isNullOrEmpty, isUndefined } from 'src/utils/utils';
import useAuth from './useAuth';

const getSearchParams = (parameters) => {
  const filters = { ...parameters };
  Object.keys(filters).forEach((key) => {
    const value = filters[key];
    if (isNullOrEmpty(value) || isUndefined(value) || (Array.isArray(value) && value.length === 0)) {
      delete filters[key];
    }
  });

  var searchParameters = new URLSearchParams(filters);

  Object.keys(filters).forEach((key) => {
    const value = filters[key];
    if (Array.isArray(value)) {
      searchParameters.delete(key);

      value.forEach((arrayValue) => {
        searchParameters.append(key, arrayValue);
      });
    }
  });

  return searchParameters;
};

const useAPI = () => {
  const { currentLanguage } = useContext(LanguageContext);
  const { tokens } = useAuth();

  const getSystem = async () => {
    return axios.get(`${import.meta.env.VITE_APP_API_URL}/system`);
  };

  const getSupportedLanguages = async () => {
    return axios.get(`${import.meta.env.VITE_APP_API_URL}/languages`);
  };

  const queryEmail = async (email) => {
    return axios.get(`${import.meta.env.VITE_APP_API_URL}/users/email/${email}`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        Language: currentLanguage
      },
    });
  };

  const register = async (email, password) => {
    return axios.post(`${import.meta.env.VITE_APP_API_URL}/register`, { email, password });
  };

  const forgotPassword = async (email) => {
    return axios.post(`${import.meta.env.VITE_APP_API_URL}/forgot-password`, { email });
  };

  const changeEmail = async (userId, newEmail, password) => {
    return axios.post(`${import.meta.env.VITE_APP_API_URL}/users/${userId}/change-email`, {
      newEmail,
      password
    });
  };

  const changePassword = async (userId, currentPassword, newPassword) => {
    return axios.post(`${import.meta.env.VITE_APP_API_URL}/users/${userId}/change-password`, {
      userId: userId,
      currentPassword,
      newPassword
    });
  };

  const resetPassword = async (email, resetToken, newPassword) => {
    return axios.post(`${import.meta.env.VITE_APP_API_URL}/reset-password`, {
      email,
      resetToken,
      newPassword,
    });
  };

  const getMe = async () => {
    return axios.get(`${import.meta.env.VITE_APP_API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        Language: currentLanguage
      },
    });
  };

  const getRecipes = async (parameters = {}) => {
    const url = new URL(`${import.meta.env.VITE_APP_API_URL}/recipes`);
    url.search = getSearchParams(parameters);

    return axios.get(url.href, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        Language: currentLanguage
      },
    });
  };

  const getRecipe = async (id) => {
    return axios.get(`${import.meta.env.VITE_APP_API_URL}/recipes/${id}`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        Language: currentLanguage
      },
    });
  };

  const getRecipeInstructions = async (id) => {
    return axios.get(`${import.meta.env.VITE_APP_API_URL}/recipes/${id}/instructions`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        Language: currentLanguage
      },
    });
  };

  const getRecipeIngredients = async (recipeId, parameters = {}) => {
    const url = new URL(`${import.meta.env.VITE_APP_API_URL}/recipes/${recipeId}/ingredients`);
    url.search = getSearchParams(parameters);

    return axios.get(url.href, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        Language: currentLanguage
      },
    });
  };

  const getIngredient = async (id) => {
    return axios.get(`${import.meta.env.VITE_APP_API_URL}/ingredients/${id}`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        Language: currentLanguage
      },
    });
  };

  const getIngredients = async (parameters = {}) => {
    const url = new URL(`${import.meta.env.VITE_APP_API_URL}/ingredients`);
    url.search = getSearchParams(parameters);

    return axios.get(url.href, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        Language: currentLanguage
      },
    });
  };

  const createIngredient = async (ingredient) => {
    return axios.post(
      `${import.meta.env.VITE_APP_API_URL}/ingredients`,
      {
        ...ingredient,
      },
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
  };

  const updateIngredient = async (id, data) => {
    return axios.put(
      `${import.meta.env.VITE_APP_API_URL}/ingredients/${id}`,
      {
        ...data,
      },
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
  };

  const getPieceOfEquipment = async (id) => {
    return axios.get(`${import.meta.env.VITE_APP_API_URL}/equipment/${id}`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        Language: currentLanguage
      },
    });
  };

  const getEquipment = async (parameters = {}) => {
    const url = new URL(`${import.meta.env.VITE_APP_API_URL}/equipment`);
    url.search = getSearchParams(parameters);

    return axios.get(url.href, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        Language: currentLanguage
      },
    });
  };


  const createPieceOfEquipment = async (pieceOfEquipment) => {
    return axios.post(
      `${import.meta.env.VITE_APP_API_URL}/equipment`,
      {
        ...pieceOfEquipment,
      },
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
  };

  const updatePieceOfEquipment = async (id, data) => {
    return axios.put(
      `${import.meta.env.VITE_APP_API_URL}/equipment/${id}`,
      {
        ...data,
      },
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
  };

  const getTag = async (id) => {
    return axios.get(`${import.meta.env.VITE_APP_API_URL}/tags/${id}`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        Language: currentLanguage
      },
    });
  };

  const getTags = async (parameters = {}) => {
    const url = new URL(`${import.meta.env.VITE_APP_API_URL}/tags`);
    url.search = getSearchParams(parameters);
    return axios.get(url.href, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        Language: currentLanguage
      },
    });
  };

  const getUnitOfMeasurements = async (parameters = {}) => {
    const url = new URL(`${import.meta.env.VITE_APP_API_URL}/unit-of-measurements`);
    url.search = getSearchParams(parameters);

    return axios.get(url.href, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        Language: currentLanguage
      },
    });
  };

  const favouriteRecipe = async (recipeId) => {
    return axios.post(
      `${import.meta.env.VITE_APP_API_URL}/recipes/${recipeId}/favourite`,
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
      `${import.meta.env.VITE_APP_API_URL}/recipes/${recipeId}/unfavourite`,
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
      `${import.meta.env.VITE_APP_API_URL}/contact-us`,
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
    return axios.delete(`${import.meta.env.VITE_APP_API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
  };

  const rateRecipe = async (recipeId, rating) => {
    return axios.put(
      `${import.meta.env.VITE_APP_API_URL}/recipes/${recipeId}/rate`,
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
    return axios.get(`${import.meta.env.VITE_APP_API_URL}/recipes/${recipeId}/rating/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        Language: currentLanguage
      },
    });
  };

  const getRecipeRating = async (recipeId) => {
    return axios.get(`${import.meta.env.VITE_APP_API_URL}/recipes/${recipeId}/rating`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        Language: currentLanguage
      },
    });
  };

  const createRecipe = async (recipe) => {
    return axios.post(
      `${import.meta.env.VITE_APP_API_URL}/recipes`,
      {
        ...recipe,
      },
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
  };


  const updateRecipe = async (id, data) => {
    return axios.put(
      `${import.meta.env.VITE_APP_API_URL}/recipes/${id}`, {
      ...data
    },
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
  };

  const uploadRecipeImage = async (recipeId, file, sequence) => {
    const formData = new FormData();
    formData.append('file', file);

    if (sequence) {
      formData.append('sequence', sequence);
    }

    return axios.post(`${import.meta.env.VITE_APP_API_URL}/recipes/${recipeId}/images`, formData, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const removeRecipeImage = async (id) => {
    return axios.delete(
      `${import.meta.env.VITE_APP_API_URL}/recipe-images/${id}`,
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
  };

  const updateRecipeImageIndex = async (id, sequence) => {
    return axios.put(
      `${import.meta.env.VITE_APP_API_URL}/recipe-images/${id}/index`, {
      sequence
    },
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
  };

  const createTag = async (tag) => {
    return axios.post(
      `${import.meta.env.VITE_APP_API_URL}/tags`,
      {
        ...tag,
      },
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
  };

  const updateTag = async (id, data) => {
    return axios.put(
      `${import.meta.env.VITE_APP_API_URL}/tags/${id}`,
      {
        ...data,
      },
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
  };

  const createAuthor = async (author) => {
    return axios.post(
      `${import.meta.env.VITE_APP_API_URL}/authors`,
      {
        ...author,
      },
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
  };

  const updateAuthor = async (id, data) => {
    return axios.put(
      `${import.meta.env.VITE_APP_API_URL}/authors/${id}`,
      {
        ...data,
      },
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
  };

  const uploadAuthorProfilePicture = async (authorId, file) => {
    const formData = new FormData();
    formData.append('file', file);

    return axios.put(`${import.meta.env.VITE_APP_API_URL}/authors/${authorId}/profile-picture`, formData, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const getUserPlanner = async (userId, parameters) => {
    const url = new URL(`${import.meta.env.VITE_APP_API_URL}/users/${userId}/planner`);
    url.search = getSearchParams(parameters);

    return axios.get(url.href, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        Language: currentLanguage
      },
    });
  };

  const planRecipe = async (userId, recipeId, servings, dates) => {
    return axios.post(
      `${import.meta.env.VITE_APP_API_URL}/users/${userId}/planner`,
      {
        recipeId, servings, dates
      },
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
  };

  const updatePlannedRecipe = async (id, servings) => {
    return axios.put(
      `${import.meta.env.VITE_APP_API_URL}/planned-recipes/${id}`,
      {
        servings
      },
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
  };

  const removePlannedRecipe = async (id) => {
    return axios.delete(
      `${import.meta.env.VITE_APP_API_URL}/planned-recipes/${id}`,
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
  };

  const getPlannerIngredientList = async (userId, parameters) => {
    const url = new URL(`${import.meta.env.VITE_APP_API_URL}/users/${userId}/planner/ingredients`);
    url.search = getSearchParams(parameters);

    return axios.get(url.href, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        Language: currentLanguage
      },
    });
  };

  const getAuthor = async (id) => {
    return axios.get(`${import.meta.env.VITE_APP_API_URL}/authors/${id}`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        Language: currentLanguage
      },
    });
  };

  const getAuthors = async (parameters = {}) => {
    const url = new URL(`${import.meta.env.VITE_APP_API_URL}/authors`);
    url.search = getSearchParams(parameters);

    return axios.get(url.href, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        Language: currentLanguage
      },
    });
  };

  const getSupportTicket = async (id) => {
    return axios.get(`${import.meta.env.VITE_APP_API_URL}/support-tickets/${id}`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        Language: currentLanguage
      },
    });
  };

  const getSupportTickets = async (parameters = {}) => {
    const url = new URL(`${import.meta.env.VITE_APP_API_URL}/support-tickets`);
    url.search = getSearchParams(parameters);

    return axios.get(url.href, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        Language: currentLanguage
      },
    });
  };

  const resolveSupportTicket = async (id) => {
    return axios.post(
      `${import.meta.env.VITE_APP_API_URL}/support-tickets/${id}/resolve`, {},
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
  };

  const getLog = async (id) => {
    return axios.get(`${import.meta.env.VITE_APP_API_URL}/logs/${id}`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        Language: currentLanguage
      },
    });
  };

  const getLogs = async (parameters = {}) => {
    const url = new URL(`${import.meta.env.VITE_APP_API_URL}/logs`);
    url.search = getSearchParams(parameters);

    return axios.get(url.href, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        Language: currentLanguage
      },
    });
  };

  const addTagToRecipe = async (recipeId, tagId) => {
    return axios.post(
      `${import.meta.env.VITE_APP_API_URL}/recipes/${recipeId}/tags/${tagId}`, {},
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
  };

  const removeTagFromRecipe = async (recipeId, tagId) => {
    return axios.delete(`${import.meta.env.VITE_APP_API_URL}/recipes/${recipeId}/tags/${tagId}`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
  };

  const publishRecipe = async (recipeId) => {
    return axios.post(
      `${import.meta.env.VITE_APP_API_URL}/recipes/${recipeId}/publish`, {},
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
  };

  const deleteRecipe = async (recipeId) => {
    return axios.delete(`${import.meta.env.VITE_APP_API_URL}/recipes/${recipeId}`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
  };

  const addRecipeVariantRelationship = async (recipeId, variantRecipeId) => {
    return axios.post(
      `${import.meta.env.VITE_APP_API_URL}/recipes/${recipeId}/variants`,
      {
        variantRecipeId,
      },
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
  };


  const getCollection = async (id) => {
    return axios.get(`${import.meta.env.VITE_APP_API_URL}/collections/${id}`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        Language: currentLanguage
      },
    });
  };

  const getCollections = async (parameters = {}) => {
    const url = new URL(`${import.meta.env.VITE_APP_API_URL}/collections`);
    url.search = getSearchParams(parameters);
    return axios.get(url.href, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        Language: currentLanguage
      },
    });
  };

  const createCollection = async (collection) => {
    return axios.post(
      `${import.meta.env.VITE_APP_API_URL}/collections`,
      {
        ...collection,
      },
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
  };

  const updateCollection = async (id, data) => {
    return axios.put(
      `${import.meta.env.VITE_APP_API_URL}/collections/${id}`,
      {
        ...data,
      },
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
  };

  const addRecipeToCollection = async (collectionId, recipeId) => {
    return axios.post(
      `${import.meta.env.VITE_APP_API_URL}/collections/${collectionId}/recipes/${recipeId}`, {},
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
  };

  const removeRecipeFromCollection = async (collectionId, recipeId) => {
    return axios.delete(`${import.meta.env.VITE_APP_API_URL}/collections/${collectionId}/recipes/${recipeId}`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
  };


  return {
    getSystem,
    getSupportedLanguages,
    queryEmail,
    forgotPassword,
    changeEmail,
    changePassword,
    resetPassword,
    register,
    getMe,
    getRecipes,
    getRecipe,
    getRecipeInstructions,
    getRecipeIngredients,
    getIngredient,
    getIngredients,
    createIngredient,
    updateIngredient,
    getPieceOfEquipment,
    createPieceOfEquipment,
    updatePieceOfEquipment,
    getEquipment,
    getTag,
    getTags,
    getUnitOfMeasurements,
    favouriteRecipe,
    unfavouriteRecipe,
    contactUs,
    deleteMyUser,
    rateRecipe,
    getUserRecipeRating,
    getRecipeRating,
    createRecipe,
    updateRecipe,
    uploadRecipeImage,
    removeRecipeImage,
    updateRecipeImageIndex,
    createTag,
    updateTag,
    createAuthor,
    updateAuthor,
    uploadAuthorProfilePicture,
    getUserPlanner,
    planRecipe,
    updatePlannedRecipe,
    removePlannedRecipe,
    getPlannerIngredientList,
    getAuthor,
    getAuthors,
    getSupportTicket,
    getSupportTickets,
    resolveSupportTicket,
    getLog,
    getLogs,
    addTagToRecipe,
    removeTagFromRecipe,
    publishRecipe,
    deleteRecipe,
    addRecipeVariantRelationship,
    getCollection,
    getCollections,
    createCollection,
    updateCollection,
    addRecipeToCollection,
    removeRecipeFromCollection
  };
};

export default useAPI;
