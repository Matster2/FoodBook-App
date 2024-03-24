import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { useMutation } from '@tanstack/react-query';
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import api from 'src/api';
import FormTextField from 'src/components/form-components/FormTextField';
import { AdminCreatePieceOfEquipmentDto, AdminUpdatePieceOfEquipmentDto } from "src/generatedAPI";
import usePrevious from 'src/hooks/usePrevious';
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
  const { handleSubmit, formState: { isDirty, isValid }, reset, setValue, watch } = methods;

  const {
    isPending: isCreatingPieceOfEquipment,
    mutate: createPieceOfEquipment,
  } = useMutation({
    mutationFn: async (data: {
      body: AdminCreatePieceOfEquipmentDto
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
      body: AdminUpdatePieceOfEquipmentDto
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
      personal: false,
      search: name
    });

    if (results.filter((x) => x.name.toLowerCase() === name.toLowerCase()).length > 0) {
      toast.error(t("requests.equipment.create.validation.nameAlreadyExists"));
      throw Error("")
    }

    if (mode === Operation.Create) {
      createPieceOfEquipment({
        body: {
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

  const name = watch("name");
  const previousName = usePrevious(name);
  const pluralName = watch("pluralName");
  useEffect(() => {
    if (!isUndefined(previousName)) {
      if (previousName === pluralName) {
        setValue("pluralName", name)
      }
    }
  }, [name]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <FormTextField
          required
          name="name"
          fullWidth
          label={t("types.pieceOfEquipment.fields.name.name")}
          capitalizeFirstLetter
        />
        <FormTextField
          required
          name="pluralName"
          fullWidth
          label={t("types.pieceOfEquipment.fields.pluralName.name")}
          capitalizeFirstLetter
        />

        <LoadingButton
          sx={{ mt: 5 }}
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