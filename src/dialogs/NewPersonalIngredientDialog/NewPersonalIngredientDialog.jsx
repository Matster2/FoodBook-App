import NiceModal from '@ebay/nice-modal-react';
import {
  Box,
  Dialog,
  DialogTitle
} from '@mui/material';
import IngredientForm from 'forms/IngredientForm';
import { useTranslation } from "react-i18next";

export default NiceModal.create(({ open, ingredient, onClose, onComplete, transitionComponent }) => {  
  const { t } = useTranslation();
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
      TransitionComponent={transitionComponent}
      PaperProps={{
        style: {
          backgroundColor: '#F6F6F6',
        },
      }}
    >
      <DialogTitle sx={{ mt: 2 }}>
        {`${t("common.words.actions.create")} ${t("types.ingredient.name")}`}
      </DialogTitle>
      
      <Box sx={{ px: 4 }}>
        <IngredientForm
          ingredient={{
            ...ingredient,
            personal: true
          }}
          onSubmit={onComplete}
          admin={true}
        />
      </Box>
    </Dialog>
  );
});