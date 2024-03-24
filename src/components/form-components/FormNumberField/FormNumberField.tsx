import { TextField, TextFieldProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type FormNumberFieldProps = TextFieldProps & {
    name: string;
    min?: number;
    max?: number;
};

const FormNumberField = ({
    name,
    min,
    max,
    helperText,
    ...props
}: FormNumberFieldProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    margin="normal"
                    {...field}
                    fullWidth
                    value={field.value}
                    error={!!error}
                    helperText={error ? error?.message : helperText}
                    {...props}
                    InputProps={{ inputProps: { min: min } }}
                    type="number"
                />
            )}
        />
    );
}

export default FormNumberField;