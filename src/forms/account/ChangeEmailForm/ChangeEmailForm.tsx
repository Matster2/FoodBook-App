import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { useMutation } from '@tanstack/react-query';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import api from 'src/api';
import FormTextField from 'src/components/form-components/FormTextField';
import { ChangeEmailCommand } from "src/generatedAPI";
import * as yup from "yup";

interface FormValues {
    newEmail: string;
    password: string;
}

interface ChangeEmailFormProps {
    user: {
        id: string;
    };
    onSuccess: () => void;
}

const ChangeEmailForm = ({
    user,
    onSuccess = () => { }
}: ChangeEmailFormProps) => {
    const { t } = useTranslation();

    const schema = yup.object().shape({
        newEmail: yup.string()
            .email(t('forms.auth.changeEmail.inputs.currentPassword.validationMessages.invalid'))
            .required(t('forms.auth.changeEmail.inputs.currentPassword.validationMessages.empty')),
        password: yup.string()
            .required(t('forms.auth.changeEmail.inputs.password.validationMessages.empty')),
    });

    const methods = useForm({
        defaultValues: {
            newEmail: "",
            password: ""
        },
        resolver: yupResolver(schema),
    });
    const { handleSubmit, formState: { isDirty, isValid }, reset } = methods;

    const {
        mutate: changeEmail
    } = useMutation({
        mutationFn: (data: {
            userId: string;
            body: ChangeEmailCommand
        }) => {
            return api.users.changeEmail(data.userId, data.body)
        },
        onSuccess: () => {
            toast.success(t('requests.auth.changeEmail.success'));
            onSuccess();
            reset();
        },
        onError: () => {
            // if (e?.response?.status === 403) {
            //     toast.error(t('requests.auth.changeEmail.invalid'));
            //   } else if (e?.response?.status === 400) {
            //     toast.error(t('requests.auth.changeEmail.emailAlreadyTaken'));
            //   } else {
            //     toast.error(t('requests.auth.changeEmail.error'));
            //   }
        }
    })

    const onSubmitHandler: SubmitHandler<FormValues> = (data: FormValues) => {
        changeEmail({
            userId: user.id,
            body: {
                userId: user.id,
                newEmail: data.newEmail,
                password: data.password
            }
        })
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <FormTextField
                    required
                    name="newEmail"
                    fullWidth
                    label={t('forms.auth.changeEmail.inputs.newEmail.label')}
                />
                <FormTextField
                    required
                    type="password"
                    name="password"
                    fullWidth
                    label={t('forms.auth.changeEmail.inputs.password.label')}
                />

                <LoadingButton
                    sx={{ mt: 2 }}
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={!isDirty || !isValid}
                >
                    {t('forms.auth.changeEmail.buttons.submit.label')}
                </LoadingButton>
            </form>
        </FormProvider>
    )
}

export default ChangeEmailForm;