import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

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
  error?: boolean;
  helperText?: string;
  isTeacherEmpty?: boolean;
  renderLink?: ReactNode;
  isLoadingTeachers?: boolean;
}

const InputField = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  options = [],
  error,
  helperText,
  isTeacherEmpty,
  isLoadingTeachers,
}: InputFieldProps) => {
  const lowerType = type.toLowerCase();

  return (
    <FormControl fullWidth error={error} sx={{ mb: 2 }}>
      <Typography mb={1}>{label}</Typography>
      {lowerType === "select" ? (
        <>
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
          {!isLoadingTeachers && isTeacherEmpty && (
            <Typography variant="caption" sx={{ mt: 1 }}>
              No teachers found.{" "}
              <Link to="/teachers/add" style={{ textDecoration: "underline" }}>
                Add a teacher
              </Link>
            </Typography>
          )}
        </>
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
      <FormHelperText sx={{ minHeight: "20px" }}>
        {error ? helperText : " "}
      </FormHelperText>
    </FormControl>
  );
};

export default InputField;
