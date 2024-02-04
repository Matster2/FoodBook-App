import NiceModal from '@ebay/nice-modal-react';
import {
    Box,
    Dialog,
    DialogTitle
} from '@mui/material';
import { useTranslation } from "react-i18next";
import EquipmentForm from 'src/forms/EquipmentForm';

export default NiceModal.create(({ open, pieceOfEquipment, onClose, onComplete, transitionComponent }) => {
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
        {`${t("common.words.actions.create")} ${t("types.equipment.name")}`}
      </DialogTitle>
      
      <Box sx={{ px: 4 }}>        
        <EquipmentForm
          pieceOfEquipment={{
            ...pieceOfEquipment,
            personal: true
          }}
          onSubmit={onComplete}
          admin={true}
        />
      </Box>
    </Dialog>
  );
});