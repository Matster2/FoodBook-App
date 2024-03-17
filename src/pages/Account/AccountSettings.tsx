import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import DeleteAccountDialog from 'src/dialogs/DeleteAccountDialog';
import useAuth from 'src/hooks/useAuth';
import PageLayout from 'src/layouts/PageLayout';

const Option = ({
  primary = "",
  onClick = () => { }
}) => (
  <ListItem disablePadding>
    <ListItemButton onClick={onClick}>
      <ListItemText primary={primary} />
    </ListItemButton>
  </ListItem>
)

const AccountSettings = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [deleteAccountDialogOpen, setDeleteAccountDialogOpen] = useState(false);

  const onAccountDeletedSuccess = () => {
    logout();
    navigate('/');
  }

  return (
    <>
      <DeleteAccountDialog
        open={deleteAccountDialogOpen}
        onClose={() => setDeleteAccountDialogOpen(false)}
        onSuccess={onAccountDeletedSuccess}
      />

      <PageLayout
        title={t('pages.accountSettings.title')}
      >
        <List sx={{ mt: 1 }}>
          <Option
            primary={t('pages.accountSettings.options.changeEmail')}
            onClick={() => navigate("/change-email")}
          />
          <Option
            primary={t('pages.accountSettings.options.changePassword')}
            onClick={() => navigate("/change-password")}
          />

          <Option
            primary={t('pages.accountSettings.options.deleteAccount')}
            onClick={() => setDeleteAccountDialogOpen(true)}
          />
        </List>
      </PageLayout>
    </>
  );
};

export default AccountSettings;