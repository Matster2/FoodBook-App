import { useMutation } from "@tanstack/react-query";
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import api from "src/api";
import GenericConfirmationDialog from '../GenericConfirmationDialog/GenericConfirmationDialog';

interface DeleteAccountDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const DeleteAccountDialog = ({
    open,
    onClose,
    onSuccess
}: DeleteAccountDialogProps) => {
    const { t } = useTranslation();

    const {
        isPending: isDeletingAccount,
        mutate: deleteAccount
    } = useMutation({
        mutationFn: () => api.me.deleteAccount(),
        onSuccess: () => {
            toast.success(t('requests.accounts.delete.success'));
            onSuccess();
            onClose();
        },
        onError: () => toast.error(t('requests.accounts.delete.failed')),
    })

    return (
        <GenericConfirmationDialog
            open={open}
            onClose={onClose}
            title={t('forms.accounts.delete.title')}
            description={t('forms.accounts.delete.description')}
            cancelText={t('forms.accounts.delete.buttons.cancel.label')}
            confirmText={t('forms.accounts.delete.buttons.submit.label')}
            onConfirm={deleteAccount}
            disableActions={isDeletingAccount}
        />
    )
};

export default DeleteAccountDialog;