import { Box, Button, Chip, Dialog, DialogActions, DialogContent, Stack, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import api from 'src/api';
import { SupportTicketStatus } from 'src/generatedAPI';

interface SupportTicketDialogProps {
  supportTicket: {
    id: string;
    status: SupportTicketStatus;
    createdOn: Date;
    email: string;
    message: string;
  },
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const SupportTicketDialog = ({
  supportTicket,
  open,
  onClose,
  onSuccess
}: SupportTicketDialogProps) => {
  const { t } = useTranslation();

  const {
    isPending: isResolving,
    mutate: resolve
  } = useMutation({
    mutationFn: () => api.admin.admin_ResolveSupportTicket(supportTicket.id),
    onSuccess: () => {
      toast.success(t('requests.support.resolve.success'));
      onSuccess();
      onClose();
    },
    onError: () => toast.error(t('requests.support.resolve.error'))
  })

  /* Handlers */
  const handleResolveClick = () => {
    resolve();
  }

  /* Rendering */
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
    >
      <DialogContent>
        <Stack direction="row" display="flex" justifyContent="space-between" alignItems="center">
          <Typography>{supportTicket.createdOn.toString()}</Typography>
          <Chip label={supportTicket.status} />
        </Stack>

        <Typography sx={{ mt: 2 }}><b>{t('types.supportTicket.fields.from.name')}:</b> {supportTicket.email}</Typography>

        <Box sx={{ mt: 2 }}>
          <Typography variant='h6'>{t('types.supportTicket.fields.message.name')}</Typography>
          <Typography>{supportTicket.message}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        {supportTicket.status === SupportTicketStatus.Open && (
          <Button disabled={isResolving} variant="contained" onClick={handleResolveClick}>{t('types.supportTicket.actions.resolve')}</Button>
        )}
      </DialogActions>
    </Dialog>
  )
};

export default SupportTicketDialog;