
import { Autocomplete, AutocompleteProps, TextField } from "@mui/material";
import { Controller, useFormContext } from 'react-hook-form';

interface FormAutoCompleteProps<
    T,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
    name: string;
    label?: string;
    helperText?: React.ReactNode;
}

const FormAutoComplete = <
    T,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined
>({
    name,
    options,
    label,
    ...props
}: Omit<FormAutoCompleteProps<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'>) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Autocomplete
                    {...field}
                    options={options}
                    renderInput={(params) => (
                        <TextField
                            label={label}
                            {...params}
                        />
                    )}
                    {...props}
                />
            )}
        />
    );
}

export default FormAutoComplete;