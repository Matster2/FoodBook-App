import NiceModal from '@ebay/nice-modal-react';
import {
  Avatar,
  Box,
  Container,
  Dialog,
  Grid,
  InputAdornment,
  Slide,
  TextField,
  Typography
} from '@mui/material';
import CategoryChip from 'components/CategoryChip';
import FilterButton from 'components/FilterButton';
import RecipeTile from 'components/RecipeTile';
import Section from 'components/Section';
import { UserContext } from 'contexts/UserContext';
import useInput from 'hooks/useInput';
import usePagedFetch from 'hooks/usePagedFetch';
import useTags from 'hooks/useTags';
import React, { useContext, useMemo, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import PullToRefresh from 'react-simple-pull-to-refresh';
import Filters from './Filters';

import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import useAuth from 'hooks/useAuth';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import styles from './Homepage.module.css';

const Transition = React.forwardRef((props, ref) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide direction="left" ref={ref} {...props} />;
});

export default () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { authenticated } = useAuth();

  const { tags, fetch: fetchTags } = useTags();
  const { user } = useContext(UserContext);

  const { value: search, onChange: onSearchChange } = useInput('');
  const [filters] = useState({});
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const { results: categories, totalResults: totalCategories } = usePagedFetch(
    `${process.env.REACT_APP_API_URL}/tags?random=true&pageSize=10`
  );

  const sevenDaysAgo = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date;
  }, []);

  const { results: recentlyAddedRecipes, totalResults: totalRecentlyAddedRecipes, loading: loadingRecentlyAddedRecipes, refetch: refetchRecentlyAddedRecipes } = usePagedFetch(
    `${process.env.REACT_APP_API_URL
    }/recipes?random=true&pageSize=25&publishedAfter=${sevenDaysAgo.toISOString()}&sortBy=datepublished&sortDesc=true`
  );
  const { results: recommendedRecipes, totalResults: totalRecommendedRecipes, loading: loadingRecommendedRecipes, refetch: refetchRecommendedRecipes } = usePagedFetch(
    `${process.env.REACT_APP_API_URL}/recipes?random=true&pageSize=25&personal=false`
  );
  const { results: favouriteRecipes, totalResults: totalFavouriteRecipes, loading: loadingFavouriteRecipes, refetch: refetchFavouriteRecipes } = usePagedFetch(
    `${process.env.REACT_APP_API_URL}/recipes?random=true&pageSize=25&favourited=true`
  );
  const { results: personalRecipes, totalResults: totalPersonalRecipes, loading: loadingPersonalRecipes, refetch: refetchPersonalRecipes } = usePagedFetch(
    `${process.env.REACT_APP_API_URL}/recipes?random=true&pageSize=25&favourited=true&personal=true`
  );

  /* Handlers */
  const handleRefresh = async () => {
    refetchRecentlyAddedRecipes();
    refetchRecommendedRecipes();
    refetchFavouriteRecipes();
    refetchPersonalRecipes();
    fetchTags();
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

  const handleCategoryClick = (id) => {
    navigate(`/recipes`, {
      state: {
        filters: {
          tagIds: [id],
        },
      },
    });
  };

  const handleRecipeClick = (id) => {
    navigate(`/recipes/${id}`);
  };

  const handleAdvancedFiltersClick = () => {
    setShowAdvancedFilters(true);
  };

  const handleFiltersApplied = (newFilters) => {
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

  const renderRecipeTile = (recipe) => (
    <Box
      sx={{
        maxWidth: 150,
      }}
    >
      <RecipeTile key={recipe.id} recipe={recipe} onClick={handleRecipeClick} />
    </Box>
  );

  return (
    <Container sx={{ pb: 7 }}>
      <Dialog
        fullScreen
        open={showAdvancedFilters}
        onClose={() => { }}
        TransitionComponent={Transition}
        PaperProps={{
          style: {
            backgroundColor: '#F6F6F6',
          },
        }}
      >
        <Filters onApply={handleFiltersApplied} onClose={() => setShowAdvancedFilters(false)} />
      </Dialog>

      <PullToRefresh onRefresh={handleRefresh}>
        <Box sx={{ mb: 3, mt: 5 }}>
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

        {categories.length > 0 && (
          <Section
            title={t('pages.home.sections.categories')}
            //showSeeAllLink={categories.length < totalCategories}
            loading={loadingTags}
          >
            {categories.map((category) => (
              <CategoryChip key={category.id} category={category} onClick={handleCategoryClick} />
            ))}
          </Section>
        )}

        {recommendedRecipes.length > 0 && (
          <Section
            title={t('pages.home.sections.recommended')}
            //showSeeAllLink={recommendedRecipes.length < totalRecommendedRecipes}
            loading={loadingRecommendedRecipes}
          >
            {recommendedRecipes.map((recipe) => renderRecipeTile(recipe))}
          </Section>
        )}

        {recentlyAddedRecipes.length > 0 && (
          <Section
            title={t('pages.home.sections.recentlyAdded')}
            showSeeAllLink={recentlyAddedRecipes.length < totalRecentlyAddedRecipes}
            onClick={() => {
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
            showSeeAllLink={favouriteRecipes.length < totalFavouriteRecipes}
            loading={loadingFavouriteRecipes}
            onSeeAllClick={() => navigate('/favourites')}
          >
            {favouriteRecipes.map((recipe) => renderRecipeTile(recipe))}
          </Section>
        )}

        {personalRecipes.length > 0 && (
          <Section
            title={t('pages.home.sections.personal')}
            // showSeeAllLink={favouriteRecipes.length < totalFavouriteRecipes}
            loading={loadingPersonalRecipes}
            // onSeeAllClick={() => navigate('/favourites')}
          >
            {personalRecipes.map((recipe) => renderRecipeTile(recipe))}
          </Section>
        )}
      </PullToRefresh>
    </Container>
  );
};
