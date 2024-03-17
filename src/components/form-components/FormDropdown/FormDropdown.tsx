
import { useFormContext, Controller } from 'react-hook-form';
import { MenuItem, Select, FormControlLabelProps, FormControl, InputLabel } from "@mui/material";

interface DropdownOption {
    value: string;
    label: string;
}

interface FormDropdownProps extends Omit<FormControlLabelProps, 'control'> {
    name: string;
    options: DropdownOption[];
    label: string;
}

const FormDropdown = ({
    name,
    options,
    label,
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
        <FormControl size={"small"}>
            <InputLabel>{label}</InputLabel>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Select onChange={onChange} value={value} >
                        {options.map((option) => generateOption(option))}
                    </Select>
                )}
            />
        </FormControl>
    );
}

export default FormDropdown;