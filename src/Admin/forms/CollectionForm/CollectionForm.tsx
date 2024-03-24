import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { useMutation } from '@tanstack/react-query';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import api from 'src/api';
import FormCheckbox from 'src/components/form-components/FormCheckbox';
import FormTextField from 'src/components/form-components/FormTextField';
import { AdminCreateCollectionDto, AdminUpdateCollectionDto } from "src/generatedAPI";
import { Operation } from 'src/types';
import { isUndefined } from "src/utils/utils";
import * as yup from "yup";

interface FormValues {
  title: string;
  hidden: boolean;
  promoted: boolean;
}

const defaultValues: FormValues = {
  title: '',
  hidden: true,
  promoted: false,
}

interface CollectionFormProps {
  collection: any;
  onSuccess: () => void
}

const CollectionForm = ({
  collection,
  onSuccess = () => { }
}: CollectionFormProps) => {
  const { t } = useTranslation();

  const mode = isUndefined(collection?.id) ? Operation.Create : Operation.Update;

  const schema = yup.object().shape({
    title: yup.string().required(),
  });

  const methods = useForm({
    defaultValues: {
      ...defaultValues,
      ...collection
    },
    resolver: yupResolver(schema),
  });
  const { handleSubmit, formState: { isDirty, isValid }, reset } = methods;

  const {
    isPending: isCreatingCollection,
    mutate: createCollection,
  } = useMutation({
    mutationFn: async (data: {
      body: AdminCreateCollectionDto
    }) => {
      return api.admin.admin_CreateCollection(data.body)
    },
    onSuccess: () => {
      toast.success(t("requests.collections.create.success"));
      onSuccess();
      reset();
    },
    onError: () => {
      toast.error(t("requests.collections.create.error"));
    }
  })

  const {
    isPending: isUpdatingCollection,
    mutate: updateCollection,
  } = useMutation({
    mutationFn: (data: {
      id: string,
      body: AdminUpdateCollectionDto
    }) => {
      return api.admin.admin_UpdateCollection(data.id, data.body)
    },
    onSuccess: () => {
      toast.success(t("requests.collections.update.success"));
      onSuccess();
      reset();
    },
    onError: () => {
      toast.error(t("requests.collections.update.error"));
    }
  })

  const onSubmitHandler: SubmitHandler<FormValues> = async (data: FormValues) => {
    const { title } = data;
    const { data: { results } } = await api.admin.admin_GetCollections({
      search: title
    });

    if (results.filter((x) => x.title.toLowerCase() === title.toLowerCase()).length > 0) {
      toast.error(t("requests.collections.create.validation.nameAlreadyExists"));
      throw Error("")
    }

    if (mode === Operation.Create) {
      createCollection({
        body: {
          title: data.title,
        }
      })
    } else {
      updateCollection({
        id: collection.id,
        body: {
          title: data.title,
          hidden: data.hidden,
          promoted: data.promoted,
        }
      })
    }
  };

  /* Rendering */
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <FormTextField
          required
          name="title"
          fullWidth
          label={t("types.collection.fields.title.name")}
          capitalizeFirstLetter
        />

        {mode === Operation.Update && (
          <>
            <FormCheckbox
              sx={{ display: 'block' }}
              name="hidden"
              label={t("types.collection.fields.hidden.name")}
            />
            <FormCheckbox
              sx={{ display: 'block' }}
              name="promoted"
              label={t("types.collection.fields.promoted.name")}
            />
          </>
        )}

        <LoadingButton
          sx={{ mt: 5 }}
          type="submit"
          fullWidth
          variant="contained"
          disabled={!isDirty || !isValid}
          loading={isCreatingCollection || isUpdatingCollection}
        >
          {mode === Operation.Create ? t("common.words.actions.create") : t("common.words.actions.update")}
        </LoadingButton>
      </form>
    </FormProvider>
  )
};

export default CollectionForm;