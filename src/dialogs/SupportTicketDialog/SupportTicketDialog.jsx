import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Typography, Box, Dialog, Button, CircularProgress, Stack, Chip } from '@mui/material';

import styles from './SupportTicketDialog.module.css';
import useAPI from '../../hooks/useAPI';
import { useEffect } from 'react';

const SupportTicketDialog = ({ open, onClose, id, transitionComponent }) => {
  const api = useAPI();

  const [loadingSupportTicket, setLoadingSupportTicket] = useState();
  const [supportTicket, setSupportTicket] = useState();

  const fetchSupportTicket = async () => {
    setLoadingSupportTicket(true);
    try {
      const { data } = await api.getSupportTicket(id);
      setSupportTicket({
        ...data,
        dateCreated: new Date(data.dateCreated)
      });
    } catch {
      console.log('error fetching recipe');
    }
    setLoadingSupportTicket(false);
  };

  const handleResolveClick = async () => {
    try {
      await api.resolveSupportTicket(id);
      setSupportTicket({
        ...supportTicket,
        status: "Resolved"
      });
      toast.success('Support ticket has been resolved');
      onClose();
    } catch {
      toast.error('Unable to resolve support ticket');
    }
  }

  /* Effects */
  useEffect(() => {
    fetchSupportTicket();
  }, [open])

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
    var time = supportTicket.dateCreated.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    var date = formatDate(supportTicket.dateCreated)
    return `${time} ${date}`;
  }

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
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
        {loadingSupportTicket && (
          <Box sx={{ mt: 2, mb: 3 }} display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )}

        {supportTicket && (
          <Box>
            <Stack direction="row" display="flex" justifyContent="space-between" alignItems="center">
              <Typography>{getDateString()}</Typography>
              <Chip label={supportTicket.status} />
            </Stack>

            <Typography sx={{ mt: 2 }}><b>From:</b> {supportTicket.email}</Typography>

            <Box sx={{ mt: 2 }}>
              <Typography variant='h6'>Message</Typography>
              <Typography>{supportTicket.message}</Typography>
            </Box>

            {supportTicket.status.toLowerCase() === "open" && (
              <Box
                sx={{ mt: 3, display: "flex", justifyContent: "center" }}
              >
                <Button
                  type="button"
                  variant="contained"
                  onClick={handleResolveClick}
                >
                  Resolve
                </Button>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Dialog>
  );
};

export default SupportTicketDialog;
