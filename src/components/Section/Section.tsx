import { Box, CircularProgress, SxProps, Typography } from '@mui/material';

interface SectionProps {
  sx?: SxProps;
  title?: string;
  loading?: boolean;
  children?: React.ReactNode;
}

const Section = ({
  sx,
  title,
  loading = false,
  children
}: SectionProps) => {
  return (
    <Box sx={{ mb: 2, ...sx }} >
      <Typography variant="h6">{title}</Typography>

      {loading && (
        <Box>
          <CircularProgress />
        </Box>
      )}

      {children}
    </Box>
  )
}

export default Section;
