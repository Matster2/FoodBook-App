import {
  Box,
  CircularProgress,
  Grid,
  List,
  Stack,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import styles from './Section.module.css';

const Section = ({ title, loading, showSeeAllLink, onSeeAllClick, children, ...props }) => {

  const { t } = useTranslation();

  return (
    <Box className={styles.section} sx={{ mb: 1 }} {...props} >
      <Grid item xs={12} container justifyContent="space-between" alignItems="center">
        <Grid item xs>
          <Typography variant="h5">{title}</Typography>
        </Grid>
        {showSeeAllLink && (
          <Grid item xs="auto">
            <Typography className={styles.seeAll} onClick={onSeeAllClick}>{t('components.section.seeAll')}</Typography>
          </Grid>
        )}
      </Grid>

      <List className={styles.listContainer}>
        <Stack direction="row" alignItems="start" gap={1.5} className={styles.listContent}>
          {loading && (
            <Box>
              <CircularProgress />
            </Box>
          )}

          {children}
        </Stack>
      </List>
    </Box>
  )
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  showSeeAllLink: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Section.defaultProps = {
  loading: false,
  showSeeAllLink: false,
  onSeeAllClick: () => { }
};

export default Section;
