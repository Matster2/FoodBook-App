import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { useMutation } from '@tanstack/react-query';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import api from 'src/api';
import FormTextField from 'src/components/form-components/FormTextField';
import { ChangePasswordCommand } from "src/generatedAPI";
import * as yup from "yup";

interface FormValues {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

interface ChangePasswordFormProps {
    user: {
        id: string;
    };
    onSuccess: () => void
}

const ChangePasswordForm = ({
    user,
    onSuccess = () => { }
}: ChangePasswordFormProps) => {
    const { t } = useTranslation();

    const schema = yup.object().shape({
        currentPassword: yup.string()
            .required(t('forms.auth.changePassword.inputs.currentPassword.validationMessages.empty')),
        newPassword: yup.string()
            .required(t('forms.auth.changePassword.inputs.currentPassword.validationMessages.empty')),
        confirmPassword: yup.string()
            .required(t('forms.auth.changePassword.inputs.currentPassword.validationMessages.empty'))
            .oneOf([yup.ref("newPassword")], t('forms.auth.changePassword.inputs.confirmPassword.validationMessages.notSame'))
    });

    const methods = useForm({
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        },
        resolver: yupResolver(schema),
    });
    const { handleSubmit, formState: { isDirty, isValid }, reset } = methods;

    const {
        mutate: changePassword
    } = useMutation({
        mutationFn: (data: {
            userId: string;
            body: ChangePasswordCommand
        }) => {
            return api.users.changePassword(data.userId, data.body)
        },
        onSuccess: () => {
            toast.success(t('requests.auth.changePassword.success'));
            onSuccess();
            reset();
        },
        onError: () => {
            // if (!isUndefined(e.response) && e.response.status === 400) {
            //   toast.error(t('requests.auth.changePassword.invalid'));
            // } else {
            //   toast.error(t('requests.auth.changePassword.error'));
            // }
        }
    })

    const onSubmitHandler: SubmitHandler<FormValues> = (data: FormValues) => {
        changePassword({
            userId: user.id,
            body: {
                userId: user.id,
                currentPassword: data.currentPassword,
                newPassword: data.newPassword
            }
        })
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <FormTextField
                    required
                    type="password"
                    name="currentPassword"
                    fullWidth
                    label={t('forms.auth.changePassword.inputs.currentPassword.label')}
                />
                <FormTextField
                    required
                    type="password"
                    name="newPassword"
                    fullWidth
                    label={t('forms.auth.changePassword.inputs.newPassword.label')}
                />
                <FormTextField
                    required
                    type="password"
                    name="confirmPassword"
                    fullWidth
                    label={t('forms.auth.changePassword.inputs.confirmPassword.label')}
                />

                <LoadingButton
                    sx={{ mt: 2 }}
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={!isDirty || !isValid}
                >
                    {t('forms.auth.changePassword.buttons.submit.label')}
                </LoadingButton>
            </form>
        </FormProvider>
    )
}

export default ChangePasswordForm;