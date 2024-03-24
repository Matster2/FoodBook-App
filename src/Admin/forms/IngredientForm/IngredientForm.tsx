import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { useMutation } from '@tanstack/react-query';
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import api from 'src/api';
import FormDropdown from "src/components/form-components/FormDropdown";
import FormTextField from 'src/components/form-components/FormTextField';
import { AdminCreateIngredientDto, AdminUpdateIngredientDto, UnitOfMeasurement } from "src/generatedAPI";
import useUnitOfMeasurementsQuery from "src/hooks/queries/useUnitOfMeasurementsQuery";
import usePrevious from 'src/hooks/usePrevious';
import { Operation } from 'src/types';
import { isUndefined } from "src/utils/utils";
import * as yup from "yup";

interface FormValues {
  name: string;
  pluralName: string;
  defaultUnitOfMeasurementId?: string;
}

const defaultValues: FormValues = {
  name: '',
  pluralName: '',
  defaultUnitOfMeasurementId: undefined
}

interface IngredientFormProps {
  ingredient: any;
  onSuccess: () => void
}

const IngredientForm = ({
  ingredient,
  onSuccess = () => { }
}: IngredientFormProps) => {
  const { t } = useTranslation();
  const {
    data: unitOfMeasurements
  } = useUnitOfMeasurementsQuery();

  const mode = isUndefined(ingredient?.id) ? Operation.Create : Operation.Update;

  const schema = yup.object().shape({
    name: yup.string().required(),
    pluralName: yup.string().required(),
  });

  const methods = useForm({
    defaultValues: {
      ...defaultValues,
      ...ingredient,
      defaultUnitOfMeasurementId: ingredient?.defaultUnitOfMeasurement?.id
    },
    resolver: yupResolver(schema),
  });
  const { handleSubmit, formState: { isDirty, isValid }, reset, setValue, watch } = methods;

  const {
    isPending: isCreatingIngredient,
    mutate: createIngredient,
  } = useMutation({
    mutationFn: async (data: {
      body: AdminCreateIngredientDto
    }) => {
      return api.admin.admin_CreateIngredient(data.body)
    },
    onSuccess: () => {
      toast.success(t("requests.ingredients.create.success"));
      onSuccess();
      reset();
    },
    onError: () => {
      toast.error(t("requests.ingredients.create.error"));
    }
  })

  const {
    isPending: isUpdatingIngreident,
    mutate: updateIngredient,
  } = useMutation({
    mutationFn: (data: {
      id: string,
      body: AdminUpdateIngredientDto
    }) => {
      return api.admin.admin_UpdateIngredient(data.id, data.body)
    },
    onSuccess: () => {
      toast.success(t("requests.ingredients.update.success"));
      onSuccess();
      reset();
    },
    onError: () => {
      toast.error(t("requests.ingredients.update.error"));
    }
  })

  const onSubmitHandler: SubmitHandler<FormValues> = async (data: FormValues) => {
    const { name } = data;
    const results = await api.admin.admin_GetIngredients({
      personal: false,
      search: name
    })
      .then(({ data }) => data.results.filter(x => x.id !== ingredient?.id));

    if (results.filter((x) => x.name.toLowerCase() === name.toLowerCase()).length > 0) {
      toast.error(t("requests.ingredients.create.validation.nameAlreadyExists"));
      throw Error("")
    }

    if (mode === Operation.Create) {
      createIngredient({
        body: {
          name: data.name,
          pluralName: data.pluralName,
          defaultUnitOfMeasurementId: data.defaultUnitOfMeasurementId!
        }
      })
    } else {
      updateIngredient({
        id: ingredient.id,
        body: {
          name: data.name,
          pluralName: data.pluralName,
          defaultUnitOfMeasurementId: data.defaultUnitOfMeasurementId!
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
          label={t("types.ingredient.fields.name.name")}
          capitalizeFirstLetter
        />
        <FormTextField
          required
          name="pluralName"
          fullWidth
          label={t("types.ingredient.fields.pluralName.name")}
          capitalizeFirstLetter
        />
        <FormDropdown
          required
          name="defaultUnitOfMeasurementId"
          fullWidth
          label={t("types.ingredient.fields.defaultUnitOfMeasurement.name")}
          options={unitOfMeasurements.map((unitOfMeasurements: UnitOfMeasurement) => ({
            value: unitOfMeasurements.id,
            label: unitOfMeasurements.name
          }))}
        />

        <LoadingButton
          sx={{ mt: 5 }}
          type="submit"
          fullWidth
          variant="contained"
          disabled={!isDirty || !isValid}
          loading={isCreatingIngredient || isUpdatingIngreident}
        >
          {mode === Operation.Create ? t("common.words.actions.create") : t("common.words.actions.update")}
        </LoadingButton>
      </form>
    </FormProvider>
  )
}

export default IngredientForm;