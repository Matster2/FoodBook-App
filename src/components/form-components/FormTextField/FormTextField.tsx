import { useFormContext, Controller } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

type FormTextFieldProps = TextFieldProps & {
    name: string;
};

const FormTextField = ({
    name,
    helperText,
    ...props
}: FormTextFieldProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    fullWidth
                    value={field.value}
                    error={!!error}
                    helperText={error ? error?.message : helperText}
                    {...props}
                />
            )}
        />
    );
}

export default FormTextField;