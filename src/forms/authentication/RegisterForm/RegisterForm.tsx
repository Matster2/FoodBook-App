import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import api from 'src/api';
import FormTextField from 'src/components/form-components/FormTextField';
import { RegisterUserCommand } from "src/generatedAPI";
import * as yup from "yup";

interface FormValues {
    email: string;
    password: string;
    confirmPassword: string;
}

interface RegisterFormProps {
    onSuccess: () => void;
}

const RegisterForm = ({
    onSuccess = () => { }
}: RegisterFormProps) => {
    const { t } = useTranslation();

    const schema = yup.object().shape({
        email: yup.string()
            .email(t('forms.auth.register.inputs.email.validationMessages.invalid'))
            .required(t('forms.auth.register.inputs.email.validationMessages.required')),
        password: yup.string()
            .required(t('forms.auth.register.inputs.currentPassword.validationMessages.empty')),
        confirmPassword: yup.string()
            .required(t('forms.auth.register.inputs.currentPassword.validationMessages.empty'))
            .oneOf([yup.ref("password")], t('forms.auth.register.inputs.confirmPassword.validationMessages.notSame'))
    });

    const methods = useForm({
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        },
        resolver: yupResolver(schema),
    });
    const { handleSubmit, reset } = methods;

    const {
        mutate: register,
        isFetching: isRegistering
    } = useMutation({
        mutationFn: (data: {
            body: RegisterUserCommand
        }) => {
            return api.register.registerUser(data.body);
        },
        onSuccess: () => {
            toast.success(t('requests.auth.register.success'));
            onSuccess();
            reset();
        },
        onError: (error: AxiosError) => {
            if (error.response?.status === 400) {
                toast.error(t('requests.auth.register.invalid'));
            } else {
                toast.error(t('requests.auth.register.error'));
            }
        }
    })

    const onSubmitHandler: SubmitHandler<FormValues> = async (data: any) => {
        const { data: { isUsed } } = await api.users.queryEmail(data.email);

        if (isUsed) {
            toast.error(t('requests.auth.register.emailAlreadyUsed'));
            throw Error("")
        }

        register({
            body: {
                email: data.email,
                password: data.password
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
                    label={t('forms.auth.register.inputs.email.label')}
                    autoComplete="email"
                />

                <FormTextField
                    type="password"
                    required
                    name="email"
                    fullWidth
                    label={t('forms.auth.register.inputs.password.label')}
                />

                <FormTextField
                    type="password"
                    required
                    name="confirm-password"
                    fullWidth
                    label={t('forms.auth.register.inputs.confirmPassword.label')}
                />

                <LoadingButton
                    sx={{ mt: 2 }}
                    type="submit"
                    fullWidth
                    variant="contained"
                    loading={isRegistering}
                >
                    {t('forms.auth.register.buttons.submit.label')}
                </LoadingButton>
            </form>
        </FormProvider>
    )
}

export default RegisterForm;