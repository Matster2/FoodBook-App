import { Box, Dialog, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useTranslation } from "react-i18next";


const RecipeImageActionDialog = ({ open, onClose, onDeleteCick, transitionComponent }) => {
  const { t } = useTranslation();

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
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Delete" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Dialog>
  );
};

export default RecipeImageActionDialog;
