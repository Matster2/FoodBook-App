import { FormControl, InputLabel, MenuItem, Select, SelectProps, SxProps } from "@mui/material";

export interface DropdownOption {
    value: string | ReadonlyArray<string> | number | undefined;
    label: string;
}

export interface DropdownProps extends SelectProps {
    sx?: SxProps;
    options: DropdownOption[]
    fullWidth?: boolean;
    label?: string;
}

const Dropdown = ({
    sx,
    options = [],
    fullWidth,
    placeholder = "",
    value,
    label,
    ...props
}: DropdownProps) => {
    const generateOption = (option: DropdownOption) => {
        return (
            <MenuItem key={option.value} value={option.value}>
                {option.label}
            </MenuItem>
        );
    };

    return (
        <FormControl fullWidth={fullWidth} sx={{ ...sx }}>
            <InputLabel>{label}</InputLabel>
            <Select
                label={label}
                {...props}
            >
                {options.map(((option) => generateOption(option)))}
            </Select>
        </FormControl>
    );
}

export default Dropdown;