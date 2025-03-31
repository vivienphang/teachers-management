import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";

export type InputFieldChangeEvent =
  | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  | SelectChangeEvent;

interface InputFieldProps {
  label: string;
  name?: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange:
    | ((e: React.ChangeEvent<HTMLInputElement>) => void)
    | ((e: SelectChangeEvent) => void);
  options?: { label: string; value: string }[];
  errorText?: string;
}

const InputField = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  options = [],
  errorText,
}: InputFieldProps) => {
  const lowerType = type.toLowerCase();
  const hasError = Boolean(errorText);

  return (
    <FormControl fullWidth error={hasError} sx={{ mb: 2 }}>
      <Typography mb={1}>{label}</Typography>
      {lowerType === "select" ? (
        <Select
          size="small"
          displayEmpty
          name={name}
          value={value}
          onChange={onChange as (e: SelectChangeEvent) => void}
        >
          <MenuItem disabled value="">
            {placeholder}
          </MenuItem>
          {options.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      ) : (
        <TextField
          size="small"
          variant="outlined"
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
          aria-label={label}
        />
      )}
      {hasError && <FormHelperText>{errorText}</FormHelperText>}
    </FormControl>
  );
};

export default InputField;
