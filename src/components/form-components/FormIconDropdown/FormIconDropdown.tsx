
import { FormControl, FormControlLabelProps, InputLabel, ListItemIcon, ListItemText, MenuItem, Select } from "@mui/material";
import { Controller, useFormContext } from 'react-hook-form';

interface IconDropdownOption {
    value: string;
    label: string;
    icon: React.ReactNode;
}

interface FormIconDropdownProps extends Omit<FormControlLabelProps, 'control'> {
    name: string;
    options: IconDropdownOption[];
    label: string;
    fullWidth?: boolean;
}

const FormIconDropdown = ({
    name,
    options,
    label,
    fullWidth,
    ...props
}: FormIconDropdownProps) => {
    const { control } = useFormContext();

    const generateOption = (option: IconDropdownOption) => {
        return (
            <MenuItem key={option.value} value={option.value}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                    {option.icon}
                </ListItemIcon>
                <ListItemText primary={option.label} sx={{ my: 0 }} />
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
                        SelectDisplayProps={{
                            style: { display: 'flex', alignItems: 'center' },
                        }}
                    >
                        {options.map((option) => generateOption(option))}
                    </Select>
                )}
            />
        </FormControl>
    );
}

export default FormIconDropdown;