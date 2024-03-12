import { Button } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from "react-i18next";
import api from 'src/api';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { API } from 'src/apiClient';
import FormTextField from 'src/components/form-components/FormTextField';

interface FormValues {
    email: string
    message: string
}

interface ContactUsFormProps {
    onSuccess: () => void
}

const ContactUsForm = ({
    onSuccess = () => { }
}: ContactUsFormProps) => {
    const { t } = useTranslation();

    const {
        mutate: contactUs
    } = useMutation({
        mutationFn: (data: {
            body: API.ContactUsDto
        }) => {
            return api.contactUs(data.body)
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
    const { handleSubmit, reset } = methods;

    const onSubmitHandler: SubmitHandler<FormValues> = (data: any) => {
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
                    id="email"
                    name="email"
                    margin='normal'
                    fullWidth
                    label={t('forms.contactUs.inputs.email.label')}
                />

                <FormTextField
                    required
                    id="message"
                    name="message"
                    margin='normal'
                    fullWidth
                    label={t('forms.contactUs.inputs.message.label')}
                    multiline
                    rows={5}
                    maxRows={5}
                />

                <Button
                    sx={{ mt: 2 }}
                    type="submit"
                    fullWidth
                    variant="contained"
                >
                    {t('forms.contactUs.buttons.submit.label')}
                </Button>
            </form>
        </FormProvider>
    )
}

export default ContactUsForm;