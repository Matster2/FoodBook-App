import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { useMutation } from '@tanstack/react-query';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import api from 'src/api';
import FormTextField from 'src/components/form-components/FormTextField';
import { ResetPasswordCommand } from "src/generatedAPI";
import * as yup from "yup";

interface FormValues {
    password: string;
    confirmPassword: string;
}

interface ResetPasswordFormProps {
    email: string;
    resetToken: string;
    onSuccess: () => void;
}

const ResetPasswordForm = ({
    email,
    resetToken,
    onSuccess = () => { }
}: ResetPasswordFormProps) => {
    const { t } = useTranslation();

    const schema = yup.object().shape({
        password: yup.string()
            .required(t('forms.auth.register.inputs.resetPassword.validationMessages.empty')),
        confirmPassword: yup.string()
            .required(t('forms.auth.register.inputs.resetPassword.validationMessages.empty'))
            .oneOf([yup.ref("password")], t('forms.auth.resetPassword.inputs.confirmPassword.validationMessages.notSame'))
    });

    const methods = useForm({
        defaultValues: {
            password: "",
            confirmPassword: ""
        },
        resolver: yupResolver(schema),
    });
    const { handleSubmit, reset } = methods;

    const {
        mutate: resetPassword,
        isFetching: isFetchingForgotPassword
    } = useMutation({
        mutationFn: (data: {
            body: ResetPasswordCommand
        }) => {
            return api.resetPassword.resetPassword(data.body);
        },
        onSuccess: () => {
            toast.success(t('requests.auth.resetPassword.success'));
            onSuccess();
            reset();
        },
        onError: () => {
            toast.error(t('requests.auth.resetPassword.error'));
        }
    })

    const onSubmitHandler: SubmitHandler<FormValues> = (data: any) => {
        resetPassword({
            body: {
                email: email,
                resetToken: resetToken,
                newPassword: data.password
            }
        })
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <FormTextField
                    type="password"
                    required
                    name="email"
                    fullWidth
                    label={t('forms.auth.resetPassword.inputs.newPassword.label')}
                />

                <FormTextField
                    type="password"
                    required
                    name="confirm-password"
                    fullWidth
                    label={t('forms.auth.resetPassword.inputs.confirmPassword.label')}
                />

                <LoadingButton
                    sx={{ mt: 2 }}
                    type="submit"
                    fullWidth
                    variant="contained"
                    loading={isFetchingForgotPassword}
                >
                    {t('forms.auth.resetPassword.buttons.submit.label')}
                </LoadingButton>
            </form>
        </FormProvider>
    )
}

export default ResetPasswordForm;