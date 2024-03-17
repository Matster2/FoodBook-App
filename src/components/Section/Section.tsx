import { Box, CircularProgress, List, Stack, SxProps, Typography } from '@mui/material';
import { useTranslation } from "react-i18next";
import styles from './styles.module.css';

interface SectionProps {
  sx?: SxProps;
  title?: string;
  loading?: boolean;
  showSeeAll?: boolean;
  onSeeAllClick?: () => void;
  children?: React.ReactNode;
}

const Section = ({
  sx,
  title,
  loading = false,
  showSeeAll = false,
  onSeeAllClick = () => { },
  children
}: SectionProps) => {
  const { t } = useTranslation();

  return (
    <Box className={styles.section} sx={{ mb: 2, ...sx }} >
      <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1}>
        <Typography variant="h6">{title}</Typography>
        {showSeeAll && <Typography className={styles.seeAll} onClick={onSeeAllClick}>{t('components.section.seeAll')}</Typography>}
      </Stack>

      <List disablePadding className={styles.listContainer}>
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

export default Section;
