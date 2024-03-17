import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { useMutation } from '@tanstack/react-query';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import api from 'src/api';
import FormCheckbox from 'src/components/form-components/FormCheckbox';
import FormTextField from 'src/components/form-components/FormTextField';
import { CreateTagCommand, UpdateTagCommand } from "src/generatedAPI";
import { Operation } from 'src/types';
import { isUndefined } from "src/utils/utils";
import * as yup from "yup";

interface FormValues {
  name: string;
  icon: string;
  hidden: boolean;
  promoted: boolean;
}

const defaultValues: FormValues = {
  name: '',
  icon: '',
  hidden: true,
  promoted: false,
}

interface TagFormProps {
  tag: any;
  onSuccess: () => void
}

const TagForm = ({
  tag,
  onSuccess = () => { }
}: TagFormProps) => {
  const { t } = useTranslation();

  const mode = isUndefined(tag?.id) ? Operation.Create : Operation.Update;

  const schema = yup.object().shape({
    name: yup.string().required(),
    icon: yup.string()
  });

  const methods = useForm({
    defaultValues: {
      ...defaultValues,
      ...tag
    },
    resolver: yupResolver(schema),
  });
  const { handleSubmit, formState: { isDirty, isValid }, reset } = methods;

  const {
    isPending: isCreatingTag,
    mutate: createTag,
  } = useMutation({
    mutationFn: async (data: {
      body: CreateTagCommand
    }) => {
      return api.admin.admin_CreateTag(data.body)
    },
    onSuccess: () => {
      toast.success(t("requests.tags.create.success"));
      onSuccess();
      reset();
    },
    onError: () => {
      toast.error(t("requests.tags.create.error"));
    }
  })

  const {
    isPending: isUpdatingTag,
    mutate: updateTag,
  } = useMutation({
    mutationFn: (data: {
      id: string,
      body: UpdateTagCommand
    }) => {
      return api.admin.admin_UpdateTag(data.id, data.body)
    },
    onSuccess: () => {
      toast.success(t("requests.tags.update.success"));
      onSuccess();
      reset();
    },
    onError: () => {
      toast.error(t("requests.tags.update.error"));
    }
  })

  const onSubmitHandler: SubmitHandler<FormValues> = async (data: FormValues) => {
    const { name } = data;
    const { data: { results } } = await api.tags.getTags({
      hidden: false,
      promoted: false,
      search: name
    });

    if (results.filter((x) => x.name.toLowerCase() === name.toLowerCase()).length > 0) {
      toast.error(t("requests.tags.create.validation.nameAlreadyExists"));
      throw Error("")
    }

    if (mode === Operation.Create) {
      createTag({
        body: {
          languageCode: "en",
          name: data.name,
          icon: data.icon
        }
      })
    } else {
      updateTag({
        id: tag.id,
        body: {
          name: data.name,
          icon: data.icon,
          hidden: data.hidden,
          promoted: data.promoted,
        }
      })
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <FormTextField
          name="name"
          fullWidth
          label={t("types.tag.fields.name.name")}
        />
        <FormTextField
          name="icon"
          fullWidth
          label={t("types.tag.fields.icon.name")}
        />

        {mode === Operation.Update && (
          <>
            <FormCheckbox
              name="hidden"
              label={t("types.tag.fields.hidden.name")}
            />
            <FormCheckbox
              name="promoted"
              label={t("types.tag.fields.promoted.name")}
            />
          </>
        )}

        <LoadingButton
          sx={{ mt: 2 }}
          type="submit"
          fullWidth
          variant="contained"
          disabled={!isDirty || !isValid}
          loading={isCreatingTag || isUpdatingTag}
        >
          {mode === Operation.Create ? t("common.words.actions.create") : t("common.words.actions.update")}
        </LoadingButton>
      </form>
    </FormProvider>
  )
}

export default TagForm;