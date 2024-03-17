import NiceModal from '@ebay/nice-modal-react';
import { Avatar, Box, CircularProgress, Container, Dialog, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import { useQuery } from "@tanstack/react-query";
import dayjs from 'dayjs';
import { useContext, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import PullToRefresh from 'react-simple-pull-to-refresh';
import uuid from 'react-uuid';
import api from 'src/api';
import SearchIcon from 'src/assets/icons/search.svg?react';
import CategoryChip from 'src/components/CategoryChip';
import CollectionSection from 'src/components/CollectionSection/CollectionSection';
import FilterButton from 'src/components/FilterButton';
import RecipeTile from 'src/components/RecipeTile';
import Section from 'src/components/Section';
import { UserContext } from 'src/contexts/UserContext';
import { RecipeState } from 'src/generatedAPI';
import useAuth from 'src/hooks/useAuth';
import useInput from 'src/hooks/useInput';
import { includeResizeQueryParameters } from 'src/utils/imageUtils';
import Filters from './Filters';
import styles from './Homepage.module.css';

const Homepage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { authenticated } = useAuth();

  const sevenDaysAgo = dayjs().subtract(7, "days");

  const {
    isFetching: loadingTags,
    data: tags,
    refetch: refetchTags
  } = useQuery({
    queryKey: ["tags", { hidden: false, random: true, pageSize: 100 }],
    queryFn: () => api.tags.getTags({
      hidden: false,
      random: true,
      pageSize: 100
    })
      .then(({ data }) => {
        console.log(data);
        return data.results;
      }),
    initialData: []
  });

  const {
    isFetching: loadingPromotedCollections,
    data: promotedCollections,
    refetch: refetchPromotedCollections
  } = useQuery({
    queryKey: ["collections", { promoted: true, random: true, pageSize: 10 }],
    queryFn: () => api.collections.getCollections({
      promoted: true,
      random: true,
      pageSize: 10
    })
      .then(({ data }) => data.results),
    initialData: []
  });

  const {
    isFetching: loadingCollections,
    data: collections,
    refetch: refetchCollections
  } = useQuery({
    queryKey: ["collections", { promoted: false, random: true, pageSize: 10 }],
    queryFn: () => api.collections.getCollections({
      promoted: false,
      random: true,
      pageSize: 10
    })
      .then(({ data }) => data.results),
    initialData: []
  });

  const {
    isFetching: loadingRecentlyAddedRecipes,
    data: recentlyAddedRecipes,
    refetch: refetchRecentlyAddedRecipes
  } = useQuery({
    queryKey: ["recipes", { states: [RecipeState.Published], publishedAfter: sevenDaysAgo.toDate(), random: true, sortBy: "publishedOn", sortDesc: true, pageSize: 25 }],
    queryFn: () => api.recipes.getRecipes({
      states: [RecipeState.Published],
      publishedAfter: sevenDaysAgo.toDate(),
      random: true,
      sortBy: "publishedOn",
      sortDesc: true,
      pageSize: 25
    })
      .then(({ data }) => data.results),
    initialData: []
  });

  const {
    isFetching: loadingRecommendedRecipes,
    data: recommendedRecipes,
    refetch: refetchRecommendedRecipes
  } = useQuery({
    queryKey: ["recipes"],
    queryFn: () => api.recipes.getRecipes({
      states: [RecipeState.Published],
      personal: false,
      random: true,
      pageSize: 25
    })
      .then(({ data }) => data.results),
    initialData: []
  });

  const {
    isFetching: loadingFavouriteRecipes,
    data: favouriteRecipes,
    refetch: refetchFavouriteRecipes
  } = useQuery({
    queryKey: ["recipes"],
    queryFn: () => api.recipes.getRecipes({
      favourited: true,
      random: true,
      pageSize: 25
    })
      .then(({ data }) => data.results),
    initialData: []
  });

  const {
    isFetching: loadingPersonalRecipes,
    data: personalRecipes,
    refetch: refetchPersonalRecipes
  } = useQuery({
    queryKey: ["recipes"],
    queryFn: () => api.recipes.getRecipes({
      personal: true,
      random: true,
      pageSize: 25
    })
      .then(({ data }) => data.results),
    initialData: []
  });




  const { user } = useContext(UserContext);

  const { value: search, onChange: onSearchChange } = useInput('');
  const [filters] = useState({});
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);



  /* Handlers */
  const handleRefresh = async () => {
    refetchRecentlyAddedRecipes();
    refetchRecommendedRecipes();
    refetchFavouriteRecipes();
    refetchPersonalRecipes();
    refetchTags();
    refetchPromotedCollections();
    refetchCollections();
  }

  const handleAvatarClick = () => {
    if (authenticated) {
      navigate('/settings');
    } else {
      NiceModal.show('authentication-modal');
    }
  };

  const handleApplySearch = () => {
    navigate(`/recipes`, {
      state: {
        filters: {
          search: search,
        },
      },
    });
  }

  const handleCategoryClick = (id: string) => {
    navigate(`/recipes`, {
      state: {
        filters: {
          tagIds: [id],
        },
      },
    });
  };

  const handleRecipeClick = (id: string) => {
    navigate(`/recipes/${id}`);
  };

  const handleAdvancedFiltersClick = () => {
    setShowAdvancedFilters(true);
  };

  const handleFiltersApplied = (newFilters: any) => {
    setShowAdvancedFilters(false);
    navigate(`/recipes`, {
      state: {
        filters: newFilters,
      },
    });
  };

  /* Rendering */
  const getWelcomeMessage = () => {
    if (user?.firstName) {
      return `${t('pages.home.welcome.greeting')}, ${user.firstName}`;
    }

    return t('pages.home.welcome.greeting');
  };

  const renderRecipeTile = (recipe: any) => (
    <Box
      key={uuid()}
      sx={{
        maxWidth: 140,
      }}
    >
      <RecipeTile
        key={recipe.id}
        recipe={{
          ...recipe,
          images: recipe.images.map((image: any) => ({
            ...image,
            url: includeResizeQueryParameters(image.url, 300, 0)
          }))
        }}
        onClick={handleRecipeClick}
      />
    </Box>
  );

  const isLoading = () => {
    return loadingTags || loadingRecommendedRecipes || loadingRecentlyAddedRecipes || loadingFavouriteRecipes || loadingPersonalRecipes;
  }

  return (
    <>
      <Dialog
        fullScreen
        open={showAdvancedFilters}
        onClose={() => { }}
        PaperProps={{
          style: {
            backgroundColor: '#F6F6F6',
          },
        }}
      >
        <Filters onApply={handleFiltersApplied} onClose={() => setShowAdvancedFilters(false)} />
      </Dialog>

      <PullToRefresh onRefresh={handleRefresh}>
        <Container sx={{ mb: 7 }}>
          <Box sx={{ mb: 3, mt: 3 }}>
            <Grid item xs={12} container justifyContent="space-between" alignItems="center">
              <Grid item xs>
                <Typography variant="subtitle2">{getWelcomeMessage()}</Typography>
                <Typography variant="h3">{t('pages.home.welcome.message')}</Typography>
              </Grid>
              <Grid item xs="auto">
                <Avatar sx={{ bgcolor: authenticated ? '#fb6b1c' : 'grey' }} onClick={handleAvatarClick} />
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Grid item xs={12} container gap={2} justifyContent="space-between" alignItems="center">
              <Grid item xs>
                <TextField
                  fullWidth
                  id="input-with-icon-adornment"
                  placeholder={t('pages.home.components.inputs.recipeSearch.placeholder')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon className={styles.searchIcon} />
                      </InputAdornment>
                    ),
                  }}
                  value={search}
                  onChange={onSearchChange}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      handleApplySearch();
                    }
                  }}
                />
              </Grid>
              <Grid item xs="auto">
                <FilterButton onClick={handleAdvancedFiltersClick} />
              </Grid>
            </Grid>
          </Box>

          {tags.length > 0 && (
            <Section
              sx={{ mb: 0.5 }}
              title={t('pages.home.sections.categories')}
              loading={loadingTags}
            >
              {tags.map((category) => (
                <CategoryChip key={category.id} sx={{ mb: 1.5 }} category={category} onClick={handleCategoryClick} />
              ))}
            </Section>
          )}


          {promotedCollections.map(collection => (
            <CollectionSection
              key={collection.id}
              collection={collection}
            />
          ))}

          {recommendedRecipes.length > 0 && (
            <Section
              title={t('pages.home.sections.recommended')}
              loading={loadingRecommendedRecipes}
            >
              {recommendedRecipes.map((recipe) => renderRecipeTile(recipe))}
            </Section>
          )}

          {collections.map(collection => (
            <CollectionSection
              collection={collection}
            />
          ))}

          {recentlyAddedRecipes.length > 0 && (
            <Section
              title={t('pages.home.sections.recentlyAdded')}
              showSeeAll
              onSeeAllClick={() => {
                navigate('/recipes', {
                  state: {
                    filters: {
                      publishedAfter: `${sevenDaysAgo.toISOString()}`,
                      sortBy: 'datepublished',
                      sortDesc: true
                    }
                  }
                })
              }}
              loading={loadingRecentlyAddedRecipes}
            >
              {recentlyAddedRecipes.map((recipe) => renderRecipeTile(recipe))}
            </Section>
          )}

          {favouriteRecipes.length > 0 && (
            <Section
              title={t('pages.home.sections.favourites')}
              loading={loadingFavouriteRecipes}
              showSeeAll
              onSeeAllClick={() => navigate('/favourites')}
            >
              {favouriteRecipes.map((recipe) => renderRecipeTile(recipe))}
            </Section>
          )}

          {personalRecipes.length > 0 && (
            <Section
              title={t('pages.home.sections.personal')}
              loading={loadingPersonalRecipes}
            >
              {personalRecipes.map((recipe) => renderRecipeTile(recipe))}
            </Section>
          )}

          {isLoading() && (
            <Box sx={{ mt: 2, mb: 3 }} display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          )}
        </Container>
      </PullToRefresh>
    </>
  );
};

export default Homepage;