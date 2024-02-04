import { Box, Dialog, Stack, Typography } from '@mui/material';
import { useTranslation } from "react-i18next";

import useAPI from 'src/hooks/useAPI';

const LogDialog = ({ open, onClose, log, transitionComponent }) => {
  const { t } = useTranslation();
  const api = useAPI();

  /* Rendering */
  const formatDate = (inputDate) => {
    let date, month, year;

    date = inputDate.getDate();
    month = inputDate.getMonth() + 1;
    year = inputDate.getFullYear();

    date = date
      .toString()
      .padStart(2, '0');

    month = month
      .toString()
      .padStart(2, '0');

    return `${date}/${month}/${year}`;
  }

  const getDateString = () => {
    var time = log.dateCreated.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    var date = formatDate(log.dateCreated)
    return `${time} ${date}`;
  }

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={open}
      onClose={onClose}
      TransitionComponent={transitionComponent}
      PaperProps={{
        style: {
          backgroundColor: '#F6F6F6',
        },
      }}
    >
      <Box sx={{ p: 4 }}>
        <Stack direction="row" display="flex" justifyContent="space-between" alignItems="center">
          <Typography>{getDateString()}</Typography>
        </Stack>

        <Box sx={{ mt: 2 }}>
          <Typography variant='h6'>{t('types.log.fields.message.name')}</Typography>
          <Typography>{log.message}</Typography>
        </Box>
      </Box>
    </Dialog>
  );
};

export default LogDialog;
