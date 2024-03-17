import { FormControl, InputLabel, MenuItem, Select, SelectProps, SxProps } from "@mui/material";
import uuid from "react-uuid";

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
}: DropdownProps) => (
    <FormControl fullWidth={fullWidth} sx={{ ...sx }}>
        <InputLabel>{label}</InputLabel>
        <Select
            {...props}
        >
            {options.map(((option) => (
                <MenuItem key={uuid()} value={option.value}>{option.label}</MenuItem>
            )))}
        </Select>
    </FormControl>
);

export default Dropdown;