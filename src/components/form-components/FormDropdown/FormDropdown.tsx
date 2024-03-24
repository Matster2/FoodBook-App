
import { FormControl, FormControlLabelProps, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller, useFormContext } from 'react-hook-form';

interface DropdownOption {
    value: string;
    label: string;
}

interface FormDropdownProps extends Omit<FormControlLabelProps, 'control'> {
    name: string;
    options: DropdownOption[];
    label: string;
    fullWidth?: boolean;
}

const FormDropdown = ({
    name,
    options,
    label,
    fullWidth,
    ...props
}: FormDropdownProps) => {
    const { control } = useFormContext();

    const generateOption = (option: DropdownOption) => {
        return (
            <MenuItem key={option.value} value={option.value}>
                {option.label}
            </MenuItem>
        );
    };

    return (
        <FormControl
            margin="normal"
            fullWidth={fullWidth}
            {...props}
        >
            <InputLabel id={name}>{label}</InputLabel>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Select
                        label={label}
                        onChange={onChange}
                        value={value}

                    >
                        {options.map((option) => generateOption(option))}
                    </Select>
                )}
            />
        </FormControl>
    );
}

export default FormDropdown;