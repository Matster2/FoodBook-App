import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import { API } from 'src/apiClient';
import FormTextField from 'src/components/form-components/FormTextField';
import useAuth from 'src/hooks/useAuth';
import * as yup from "yup";

interface FormValues {
    email: string;
    password: string;
}

interface SignInFormProps {
    onSuccess: () => void;
}

const SignInForm = ({
    onSuccess = () => { }
}: SignInFormProps) => {
    const { t } = useTranslation();
    const auth = useAuth();

    const schema = yup.object().shape({
        email: yup.string()
            .email(t('forms.auth.signIn.inputs.email.validationMessages.invalid'))
            .required(t('forms.auth.signIn.inputs.email.validationMessages.required')),
        password: yup.string()
            .required(t('forms.auth.signIn.inputs.password.validationMessages.required')),
    });

    const methods = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
        resolver: yupResolver(schema),
    });
    const { handleSubmit, reset } = methods;

    const {
        mutate: signIn,
        isFetching: isFetchingSignIn
    } = useMutation({
        mutationFn: (data: {
            body: API.LoginCommand
        }) => {
            return auth.login(data.body.email, data.body.password);
        },
        onSuccess: () => {
            toast.success(t('requests.auth.signIn.success'));
            onSuccess();
            reset();
        },
        onError: (error: AxiosError) => {
            if (error.response?.status === 400) {
                toast.error(t('requests.auth.signIn.invalid'));
            } else {
                toast.error(t('requests.auth.signIn.error'));
            }
        }
    })

    const onSubmitHandler: SubmitHandler<FormValues> = (data: any) => {
        signIn({
            body: new API.LoginCommand({
                email: data.email,
                password: data.password
            })
        })
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <FormTextField
                    required
                    name="email"
                    fullWidth
                    label={t('forms.auth.signIn.inputs.email.label')}
                    autoComplete="email"
                />

                <Box sx={{ mb: 4 }} display="flex" justifyContent="flex-end">
                    <Link to="/forgot-password">{t('pages.signIn.links.forgottenPassword')}</Link>
                </Box>

                <FormTextField
                    type="password"
                    required
                    name="password"
                    fullWidth
                    label={t('forms.auth.signIn.inputs.password.label')}
                    autoComplete="password"
                />

                <LoadingButton
                    sx={{ mt: 2 }}
                    type="submit"
                    fullWidth
                    variant="contained"
                    loading={isFetchingSignIn}
                >
                    {t('forms.auth.signIn.buttons.submit.label')}
                </LoadingButton>
            </form>
        </FormProvider>
    )
}

export default SignInForm;