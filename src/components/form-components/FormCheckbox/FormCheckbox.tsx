
import { useFormContext, Controller } from 'react-hook-form';
import { Checkbox, FormControlLabel, FormControlLabelProps } from '@mui/material';

interface FormCheckboxProps extends Omit<FormControlLabelProps, 'control'> {
    name: string;
    helperText?: React.ReactNode;
}

const FormCheckbox = ({
    name,
    helperText,
    ...props
}: FormCheckboxProps) => {
    const { control } = useFormContext();

    return (
        <FormControlLabel
            control={
                <Controller
                    name={name}
                    render={({ field }) => {
                        return (
                            <Checkbox
                                {...field}
                                checked={field.value}
                            />
                        );
                    }}
                    control={control}
                />
            }
            {...props}
        />
    );
}

export default FormCheckbox;