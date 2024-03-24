import { Masonry } from '@mui/lab';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from 'react-router-dom';
import api from 'src/api';
import AuthorLink from 'src/components/AuthorLink';
import CardSection from 'src/components/CardSection';
import RecipeTile from 'src/components/RecipeTile';
import PageLayout from 'src/layouts/PageLayout';
import { includeResizeQueryParameters } from 'src/utils/imageUtils';
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

const Author = () => {
  const { t } = useTranslation();
  const { id } = useParams<{
    id?: string
  }>();
  const navigate = useNavigate();

  const [showFullBiography, setShowFullBiography] = useState(false);

  const {
    isFetching: loadingAuthor,
    data: author
  } = useQuery({
    queryKey: ["author", id],
    queryFn: () => api.authors.getAuthor(id!)
      .then(({ data }) => data),
  })

  const {
    isFetching: loadingRecipes,
    data: recipes
  } = useQuery({
    queryKey: ["recipes"],
    queryFn: () => api.recipes.getRecipes({
      authorId: id
    })
      .then(({ data }) => data.results),
    initialData: []
  })

  /* Handlers */
  const handleRecipeClick = (id: string) => {
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
  const renderBiographyText = (biography: string) => {
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

  return (
    <PageLayout
      title={t('pages.author.title')}
      loading={loadingAuthor}
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

      {recipes.length > 0 && (
        <CardSection
          sx={{ mt: 2 }}
          title={t('pages.author.sections.authorRecipes')}
          loading={loadingRecipes}
          showSeeAll
          onSeeAllClick={handleSeeAllClick}
        >
          <Masonry columns={{ xs: 2, sm: 4, md: 6 }} spacing={1}>
            {recipes.map((recipe, index) => (
              <RecipeTile
                key={index}
                recipe={{
                  ...recipe,
                  images: recipe.images.map((image) => ({
                    ...image,
                    url: includeResizeQueryParameters(image.url, 300, 0)
                  }))
                }}
                onClick={handleRecipeClick}
              />
            ))}
          </Masonry>
        </CardSection>
      )}

    </PageLayout >
  );
};

export default Author;