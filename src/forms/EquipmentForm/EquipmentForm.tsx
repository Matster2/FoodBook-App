import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { useMutation } from '@tanstack/react-query';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import api from 'src/api';
import FormCheckbox from 'src/components/form-components/FormCheckbox';
import FormTextField from 'src/components/form-components/FormTextField';
import { CreateEquipmentCommand, UpdateEquipmentCommand } from "src/generatedAPI";
import { Operation } from 'src/types';
import { isUndefined } from "src/utils/utils";
import * as yup from "yup";

interface FormValues {
  name: string;
  pluralName: string;
}

const defaultValues: FormValues = {
  name: '',
  pluralName: ''
}

interface EquipmentFormProps {
  pieceOfEquipment: any;
  onSuccess: () => void
}

const EquipmentForm = ({
  pieceOfEquipment,
  onSuccess = () => { }
}: EquipmentFormProps) => {
  const { t } = useTranslation();

  const mode = isUndefined(pieceOfEquipment?.id) ? Operation.Create : Operation.Update;

  const schema = yup.object().shape({
    name: yup.string().required(),
    pluralName: yup.string().required(),
  });

  const methods = useForm({
    defaultValues: {
      ...defaultValues,
      ...pieceOfEquipment
    },
    resolver: yupResolver(schema),
  });
  const { handleSubmit, formState: { isDirty, isValid }, reset } = methods;

  const {
    isPending: isCreatingPieceOfEquipment,
    mutate: createPieceOfEquipment,
  } = useMutation({
    mutationFn: async (data: {
      body: CreateEquipmentCommand
    }) => {
      return api.admin.admin_CreatePieceOfEquipment(data.body)
    },
    onSuccess: () => {
      toast.success(t("requests.equipment.create.success"));
      onSuccess();
      reset();
    },
    onError: () => {
      toast.error(t("requests.equipment.create.error"));
    }
  })

  const {
    isPending: isUpdatingPieceOfEquipment,
    mutate: updatePieceOfEquipment,
  } = useMutation({
    mutationFn: (data: {
      id: string,
      body: UpdateEquipmentCommand
    }) => {
      return api.admin.admin_UpdatePieceOfEquipment(data.id, data.body)
    },
    onSuccess: () => {
      toast.success(t("requests.equipment.update.success"));
      onSuccess();
      reset();
    },
    onError: () => {
      toast.error(t("requests.equipment.update.error"));
    }
  })

  const onSubmitHandler: SubmitHandler<FormValues> = async (data: FormValues) => {
    const { name } = data;
    const { data: { results } } = await api.admin.admin_GetEquipment({
      hidden: false,
      promoted: false,
      search: name
    });

    if (results.filter((x) => x.name.toLowerCase() === name.toLowerCase()).length > 0) {
      toast.error(t("requests.equipment.create.validation.nameAlreadyExists"));
      throw Error("")
    }

    if (mode === Operation.Create) {
      createPieceOfEquipment({
        body: {
          languageCode: "en",
          name: data.name,
          pluralName: data.pluralName
        }
      })
    } else {
      updatePieceOfEquipment({
        id: pieceOfEquipment.id,
        body: {
          name: data.name,
          pluralName: data.pluralName,
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
          label={t("types.equipment.fields.name.name")}
        />

        <FormTextField
          name="name"
          fullWidth
          label={t("types.equipment.fields.name.name")}
        />

        {mode === Operation.Update && (
          <>
            <FormCheckbox
              name="hidden"
              label={t("types.equipment.fields.hidden.name")}
            />
            <FormCheckbox
              name="promoted"
              label={t("types.equipment.fields.promoted.name")}
            />
          </>
        )}

        <LoadingButton
          sx={{ mt: 2 }}
          type="submit"
          fullWidth
          variant="contained"
          disabled={!isDirty || !isValid}
          loading={isCreatingPieceOfEquipment || isUpdatingPieceOfEquipment}
        >
          {mode === Operation.Create ? t("common.words.actions.create") : t("common.words.actions.update")}
        </LoadingButton>
      </form>
    </FormProvider>
  )
}

export default EquipmentForm;