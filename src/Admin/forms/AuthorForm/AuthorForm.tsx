import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import { useMutation } from '@tanstack/react-query';
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import api from 'src/api';
import Section from "src/components/Section";
import FormAuthorLink from "src/components/form-components/FormAuthorLink";
import FormTextField from 'src/components/form-components/FormTextField';
import { AdminCreateAuthorDto, AdminUpdateAuthorDto } from "src/generatedAPI";
import { Operation } from 'src/types';
import { isUndefined } from "src/utils/utils";
import * as yup from "yup";

interface FormValues {
  name: string;
  biography: string;
  links: {
    name: string;
    url: string;
  }
}

const defaultValues: FormValues = {
  name: '',
  biography: '',
  links: []
}

interface AuthorFormProps {
  author: any;
  onSuccess: () => void
}

const AuthorForm = ({
  author,
  onSuccess = () => { }
}: AuthorFormProps) => {
  const { t } = useTranslation();

  const mode = isUndefined(author?.id) ? Operation.Create : Operation.Update;

  const schema = yup.object().shape({
    name: yup.string().required(),
    biography: yup.string(),
    links: yup.array().of(yup.object({
      name: yup.string(),
      url: yup.string().required()
    }))
  });

  const methods = useForm({
    defaultValues: {
      ...defaultValues,
      ...author
    },
    resolver: yupResolver(schema),
  });
  const { handleSubmit, control, formState: { isDirty, isValid }, reset } = methods;
  const { fields: links, append: addLink, remove: removeLink } = useFieldArray({ control, name: "links", keyName: "key" });

  const {
    isPending: isCreatingAuthor,
    mutate: createAuthor,
  } = useMutation({
    mutationFn: async (data: {
      body: AdminCreateAuthorDto
    }) => {
      return api.admin.admin_CreateAuthor(data.body)
    },
    onSuccess: () => {
      toast.success(t("requests.authors.create.success"));
      onSuccess();
      reset();
    },
    onError: () => {
      toast.error(t("requests.authors.create.error"));
    }
  })

  const {
    isPending: isUpdatingAuthor,
    mutate: updatePieceOfEquipment,
  } = useMutation({
    mutationFn: (data: {
      id: string,
      body: AdminUpdateAuthorDto
    }) => {
      return api.admin.admin_UpdateAuthor(data.id, data.body)
    },
    onSuccess: () => {
      toast.success(t("requests.authors.update.success"));
      onSuccess();
      reset();
    },
    onError: () => {
      toast.error(t("requests.authors.update.error"));
    }
  })

  const onSubmitHandler: SubmitHandler<FormValues> = async (data: FormValues) => {
    if (mode === Operation.Create) {
      createAuthor({
        body: {
          name: data.name,
          biography: data.biography,
          links: data.links
        }
      })
    } else {
      updatePieceOfEquipment({
        id: author.id,
        body: {
          id: author.id,
          name: data.name,
          biography: data.biography,
          links: data.links
        }
      })
    }
  };

  const handleAddLinkClick = () => {
    addLink({
      name: "",
      url: "",
    })
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <FormTextField
          required
          name="name"
          fullWidth
          label={t("types.author.fields.name.name")}
        />
        <FormTextField
          name="biography"
          fullWidth
          label={t("types.author.fields.biography.name")}
          multiline
          rows={2}
        />

        <Section title={t("types.author.fields.links.name")}>
          {links.map((link, index) => (
            <FormAuthorLink
              key={index}
              name={`links.${index}`}
              onDelete={() => removeLink(index)}
            />
          ))}

          <Button sx={{ mt: 2 }} type="button" onClick={handleAddLinkClick} variant="contained">
            {`${t("common.words.actions.add")} ${t("types.author.fields.links.singularName")}`}
          </Button>
        </Section>

        <LoadingButton
          sx={{ mt: 5 }}
          type="submit"
          fullWidth
          variant="contained"
          disabled={!isDirty || !isValid}
          loading={isCreatingAuthor || isUpdatingAuthor}
        >
          {mode === Operation.Create ? t("common.words.actions.create") : t("common.words.actions.update")}
        </LoadingButton>
      </form>
    </FormProvider >
  )
}

export default AuthorForm;