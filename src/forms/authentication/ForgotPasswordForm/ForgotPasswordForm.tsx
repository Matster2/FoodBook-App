import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { useMutation } from '@tanstack/react-query';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import api from 'src/api';
import FormTextField from 'src/components/form-components/FormTextField';
import { ForgotPasswordCommand } from "src/generatedAPI";
import * as yup from "yup";

interface FormValues {
    email: string;
}

interface ForgotPasswordFormProps {
    onSuccess: () => void;
}

const ForgotPasswordForm = ({
    onSuccess = () => { }
}: ForgotPasswordFormProps) => {
    const { t } = useTranslation();

    const schema = yup.object().shape({
        email: yup.string()
            .email(t('forms.auth.forgotPassword.inputs.email.validationMessages.invalid'))
            .required(t('forms.auth.forgotPassword.inputs.email.validationMessages.empty'))
    });

    const methods = useForm({
        defaultValues: {
            email: "",
        },
        resolver: yupResolver(schema),
    });
    const { handleSubmit, reset } = methods;

    const {
        mutate: forgotPassword,
        isFetching: isFetchingForgotPassword
    } = useMutation({
        mutationFn: (data: {
            body: ForgotPasswordCommand
        }) => {
            return api.forgotPassword.forgotPassword(data.body);
        },
        onSuccess: () => {
            toast.success(t('requests.auth.forgottenPassword.success'));
            onSuccess();
            reset();
        },
        onError: () => {
            toast.error(t('requests.auth.forgottenPassword.error'));
        }
    })

    const onSubmitHandler: SubmitHandler<FormValues> = (data: any) => {
        forgotPassword({
            body: {
                email: data.email
            }
        })
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <FormTextField
                    required
                    name="email"
                    fullWidth
                    label={t('forms.auth.forgotPassword.inputs.email.label')}
                    autoComplete="email"
                />

                <LoadingButton
                    sx={{ mt: 2 }}
                    type="submit"
                    fullWidth
                    variant="contained"
                    loading={isFetchingForgotPassword}
                >
                    {t('forms.auth.forgotPassword.buttons.submit.label')}
                </LoadingButton>
            </form>
        </FormProvider>
    )
}

export default ForgotPasswordForm;