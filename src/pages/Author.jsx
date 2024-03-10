import {
  Avatar,
  Box,
  CircularProgress, Grid,
  Stack,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from 'react-router-dom';
import AuthorLink from 'src/components/AuthorLink';
import RecipeTile from 'src/components/RecipeTile';
import Section from 'src/components/Section';
import api from 'src/api';
import { truncateText } from 'src/utils/stringUtils';
import styles from './Author.module.css';
import PageLayout from 'src/layouts/PageLayout';

/*
  TODO:
    - Profile picture & Basic information (name)
    - Biography
    - Their recipes
    - links
    - follow?
*/

export default () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [showFullBiography, setShowFullBiography] = useState(false);

  const {
    isFetched: hasFetchedAuthor,
    data: author
  } = useQuery({
    queryKey: ["author", id],
    queryFn: () => api.getAuthor(id)
  })

  const {
    isFetched: hasFetchedRecipes,
    data: recipes
  } = useQuery({
    queryKey: ["recipes"],
    queryFn: () => api.getRecipes(authorId = id),
    initialData: []
  })

  /* Handlers */
  const handleRecipeClick = (id) => {
    navigate(`/recipes/${id}`);
  };

  const handleSeeAllClick = () => {
    navigate(`/recipes`, {
      state: {
        filters: {
          authorId: id,
        },
      },
    });
  }

  /* Rendering */
  const renderBiographyText = (biography) => {
    const maxLength = 300;

    if (biography.length <= maxLength) {
      return <Typography style={{ whiteSpace: "pre-wrap" }} variant="body2">{biography}</Typography>;
    }

    const text = showFullBiography ? biography : truncateText(biography, maxLength);

    return (
      <>
        <Typography
          style={{ whiteSpace: "pre-wrap" }} variant="body2">
          {text}
          {showFullBiography ? ' ' : '...  '}
          {!showFullBiography && (
            <Typography
              display="inline"
              onClick={() => setShowFullBiography(true)}
              className={styles.showMoreLink}
              variant="body2"
            >
              {t('pages.author.biography.showMore')}
            </Typography>
          )}
        </Typography>
        {showFullBiography && (
          <Typography
            sx={{ mt: 1 }}
            onClick={() => setShowFullBiography(false)}
            className={styles.showLessLink}
            variant="body2"
          >
            {t('pages.author.biography.showLess')}
          </Typography>
        )}
      </>
    );
  };

  const renderRecipeTile = (recipe) => (
    <Box sx={{ mb: 1 }}>
      <RecipeTile key={recipe.id} recipe={recipe} onClick={handleRecipeClick} />
    </Box>
  );

  return (
    <PageLayout
      title={t('pages.author.title')}
      loading={!hasFetchedAuthor}
    >
      {author && (
        <>
          <Stack direction="column" display="flex" alignItems="center" justifyContent="center">
            <Avatar sx={{ mb: 1, height: 80, width: 80 }} src={author.profilePictureUrl} />
            <Typography className={styles.name}>{author.name}</Typography>
          </Stack>

          {author.links.length > 0 && (
            <Stack sx={{ mt: 2 }} direction="row" display="flex" alignItems="center" justifyContent="center" gap={2}>
              {author.links.map((link) => (
                <AuthorLink link={link} />
              ))}
            </Stack>
          )}

          <Box sx={{ mt: 2 }}>
            {renderBiographyText(author.biography)}
          </Box>
        </>
      )}

      {!hasFetchedRecipes && (
        <Box sx={{ mt: 2, mb: 3 }} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}

      {recipes.length > 0 && (
        <Section
          sx={{ mt: 2 }}
          title={t('pages.author.sections.authorRecipes')}
          showSeeAllLink={true}
          loading={!hasFetchedRecipes}
          onSeeAllClick={handleSeeAllClick}
        >
          <Grid container spacing={1}>
            <Grid item xs={6}>
              {recipes
                .filter((_, index) => !(index % 2))
                .map((recipe) => renderRecipeTile(recipe))}
            </Grid>
            <Grid item xs={6}>
              {recipes
                .filter((_, index) => index % 2)
                .map((recipe) => renderRecipeTile(recipe))}
            </Grid>
          </Grid>
        </Section>
      )}

    </PageLayout >
  );
};
