import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import ContactUsForm from 'src/forms/ContactUsForm';
import PageLayout from 'src/layouts/PageLayout';
import { useState } from 'react';

const ContactUs = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [sentMessage, setSentMessage] = useState<boolean>(false);

  /* Handlers */
  const handleSuccess = () => setSentMessage(true);

  const handleContinueCookingClick = () => navigate('/');

  /* Rendering */
  return (
    <PageLayout
      title={t("pages.contactUs.title")}
    >
      {sentMessage && (
        <Box textAlign="center" sx={{ marginTop: '30%' }}>
          <Typography>{t("pages.contactUs.messageSent")}</Typography>

          <Button
            variant="contained"
            sx={{ mt: 4 }}
            onClick={handleContinueCookingClick}
          >
            {t("pages.contactUs.continueCooking")}
          </Button>
        </Box>
      )}

      {!sentMessage && (
        <ContactUsForm
          onSuccess={handleSuccess}
        />
      )}
    </PageLayout>
  );
};

export default ContactUs;