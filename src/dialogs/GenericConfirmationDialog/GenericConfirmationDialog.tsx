import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';

interface GenericConfirmationDialogProps {
    open: boolean;
    loading?: boolean;
    showActions?: boolean;
    disableActions?: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description?: string;
    cancelText?: string;
    confirmText?: string;
    children?: React.ReactNode;
}

const GenericConfirmationDialog = ({
    open,
    loading = false,
    showActions = true,
    disableActions = false,
    onClose,
    onConfirm,
    title = "",
    description,
    cancelText = "No",
    confirmText = "Yes",
    children
}: GenericConfirmationDialogProps) => {
    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            open={open}
            onClose={onClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {description && (
                    <DialogContentText sx={{ mb: 1 }} id="alert-dialog-slide-description">{description}</DialogContentText>
                )}

                {loading && (
                    <Box sx={{ my: 1 }} display="flex" justifyContent="center">
                        <CircularProgress />
                    </Box>
                )}
                {children}
            </DialogContent>
            {showActions && (
                <DialogActions>
                    <Button disabled={disableActions} onClick={onCancel}>{cancelText}</Button>
                    <Button disabled={disableActions} variant="contained" onClick={onConfirm}>{confirmText}</Button>
                </DialogActions>
            )}
        </Dialog>
    )
};

export default GenericConfirmationDialog;