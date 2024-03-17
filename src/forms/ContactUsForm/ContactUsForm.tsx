import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { useMutation } from '@tanstack/react-query';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import api from 'src/api';
import { API } from 'src/apiClient';
import FormTextField from 'src/components/form-components/FormTextField';
import * as yup from "yup";

interface FormValues {
    email: string;
    message: string;
}

interface ContactUsFormProps {
    onSuccess: () => void;
}

const ContactUsForm = ({
    onSuccess = () => { }
}: ContactUsFormProps) => {
    const { t } = useTranslation();

    const schema = yup.object().shape({
        email: yup.string()
            .email(t('forms.contactUs.inputs.email.validationMessages.invalid'))
            .required(t('forms.contactUs.inputs.email.validationMessages.required')),
        message: yup.string()
            .required(t('forms.contactUs.inputs.message.validationMessages.required')),
    });

    const methods = useForm({
        defaultValues: {
            email: "",
            message: ""
        },
        resolver: yupResolver(schema),
    });
    const { handleSubmit, formState: { isDirty, isValid }, reset } = methods;

    const {
        mutate: contactUs,
    } = useMutation({
        mutationFn: (data: {
            body: API.ContactUsDto
        }) => {
            return api.contactUs.contactUs(data.body)
        },
        onSuccess: () => {
            toast.success(t('requests.support.contactUs.success'));
            onSuccess();
            reset();
        },
        onError: () => {
            toast.error(t('requests.support.contactUs.error'));
        }
    })

    const onSubmitHandler: SubmitHandler<FormValues> = (data: FormValues) => {
        contactUs({
            body: new API.ContactUsDto({
                email: data.email,
                message: data.message
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
                    label={t('forms.contactUs.inputs.email.label')}
                />
                <FormTextField
                    required
                    name="message"
                    fullWidth
                    label={t('forms.contactUs.inputs.message.label')}
                    multiline
                    rows={5}
                    maxRows={5}
                />

                <LoadingButton
                    sx={{ mt: 2 }}
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={!isDirty || !isValid}
                >
                    {t('forms.contactUs.buttons.submit.label')}
                </LoadingButton>
            </form>
        </FormProvider>
    )
}

export default ContactUsForm;