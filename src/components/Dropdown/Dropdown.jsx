import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import uuid from "react-uuid"

export default ({
    sx,
    options = [],
    fullWidth,
    placeholder="",
    value,
    label,
    onChange,
    ...props
}) => (
    <FormControl fullWidth={fullWidth} sx={{ ...sx }}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label={label}
            placeholder={placeholder}
            onChange={onChange}
            {...props}
        >
            {options.map((option => (
                <MenuItem key={uuid()} value={option.value}>{option.label}</MenuItem>
            )))}
        </Select>
    </FormControl>
)