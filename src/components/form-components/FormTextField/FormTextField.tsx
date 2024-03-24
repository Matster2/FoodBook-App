import { TextField, TextFieldProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { capitalizeFirstLetter as capitalizeFirstLetterFn } from 'src/utils/stringUtils';

type FormTextFieldProps = TextFieldProps & {
    name: string;
    capitalizeFirstLetter?: boolean;
};

const FormTextField = ({
    name,
    helperText,
    capitalizeFirstLetter = false,
    ...props
}: FormTextFieldProps) => {
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
                    onChange={(e) => {
                        var value = e.target.value;
                        if (capitalizeFirstLetter) value = capitalizeFirstLetterFn(value);
                        field.onChange(value)
                    }}
                />
            )}
        />
    );
}

export default FormTextField;