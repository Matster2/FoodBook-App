import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import styles from './RecipeTile.module.css';

const RecipeTile = ({ recipe, onClick }) => {
  const handleClick = () => {
    onClick(recipe.id);
  };

  return (
    <Card onClick={handleClick}>
      <div className={styles.imageContainer}>
        <CardMedia
          className={styles.img}
          component="img"
          sx={{ p: 1, maxWidth: 150, maxHeight: 150 }}
          image="https://www.acouplecooks.com/wp-content/uploads/2021/03/Cheese-Tortellini-011.jpg"
          alt="recipe"
        />
      </div>
      <CardContent>
        <Grid xs={12} container justifyContent="space-between" alignItems="center">
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            <Typography className={styles.name}>{recipe.name}</Typography>
          </Grid>
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Typography>{recipe.rating}</Typography>
          </Grid>
        </Grid>

        <Typography>{recipe.totalTime}</Typography>
      </CardContent>
    </Card>
  );
};

RecipeTile.propTypes = {
  recipe: PropTypes.objectOf({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    totalTime: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
};

RecipeTile.defaultProps = {
  onClick: () => {},
};

export default RecipeTile;
