import {
    Avatar,
    Box,
    CircularProgress,
    Container,
    Grid,
    Stack,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from 'react-router-dom';
import AuthorLink from 'src/components/AuthorLink';
import Header from 'src/components/Header';
import RecipeTile from 'src/components/RecipeTile';
import Section from 'src/components/Section';
import useAPI from 'src/hooks/useAPI';
import { truncateText } from 'src/utils/stringUtils';

import styles from './Author.module.css';
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

  const api = useAPI();

  const [loadingAuthor, setLoadingAuthor] = useState(false);
  const [author, setAuthor] = useState();

  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const [recipes, setRecipes] = useState([]);

  const [showFullBiography, setShowFullBiography] = useState(false);

  const fetchAuthor = async () => {
    setLoadingAuthor(true);
    try {
      const { data } = await api.getAuthor(id);
      setAuthor(data);
    } catch (e) {
      console.log('error fetching author');
    }
    setLoadingAuthor(false);
  };

  const fetchRecipes = async () => {
    setLoadingRecipes(true);
    try {
      const { data } = await api.getRecipes({
        authorId: id,
        pageSize: 100,
        sortBy: 'datepublished',
        sortDesc: 'true'
      });
      setRecipes(data.results);
    } catch {
      console.log('error fetching recipes');
    }
    setLoadingRecipes(false);
  };

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

  /* Effects */
  useEffect(() => {
    fetchAuthor();
    fetchRecipes();
  }, []);

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
    <Box sx={{  mb: 1 }}>
      <RecipeTile key={recipe.id} recipe={recipe} onClick={handleRecipeClick} />
    </Box>
  );

  return (
    <Container sx={{ pb: 7 }}>
      <Header title={t('pages.author.title')} onBackClick={() => navigate(-1)} />

      {loadingAuthor && (
        <Box sx={{ mt: 2, mb: 3 }} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}

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
      )
      }

      {
        loadingRecipes && (
          <Box sx={{ mt: 2, mb: 3 }} display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )
      }

      {
        recipes.length > 0 && (
          <Section
            sx={{ mt: 2 }}
            title={t('pages.author.sections.authorRecipes')}
            showSeeAllLink={true}
            loading={loadingRecipes}
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
        )
      }

    </Container >
  );
};
