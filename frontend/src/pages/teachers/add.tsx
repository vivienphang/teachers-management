import { Box, Typography, Button, Card, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { KeyboardBackspace } from "@mui/icons-material";
import { useState } from "react";
import InputField, { InputFieldChangeEvent } from "../../ui/InputField/index";
import { createTeacher } from "../../api/teachers";
import { ErrorType, TeacherInput } from "../../types";
import { SUBJECT_OPTIONS } from "../classes/constants";

const AddTeacher = () => {
  const navigate = useNavigate();

  const [formInput, setFormInput] = useState<TeacherInput>({
    name: "",
    subject: "",
    contactNumber: "",
    email: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof TeacherInput, string>>
  >({}); // partial: make keys of ClassInput optional in error handling
  const [isSuccess, setIsSuccess] = useState(true);
  const [alertText, setAlertText] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e: InputFieldChangeEvent) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name as string]: value,
    }));
    // Reset error
    setErrors((prev) => ({
      ...prev,
      [name as keyof TeacherInput]: "",
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/\D/g, "");
    setFormInput((prev) => ({
      ...prev,
      [e.target.name]: onlyDigits,
    }));
    setErrors((prev) => ({
      ...prev,
      contactNumber: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // console.log("Form input", formInput);
    e.preventDefault();

    const newErrors: typeof errors = {};

    // Ensure only alphabets
    const validNamePattern = /^[A-Za-z ]+$/;

    if (!formInput.name) {
      newErrors.name = "Name is required.";
    } else if (formInput.name.length > 30) {
      newErrors.name = "Name must not be more than 30 characters.";
    } else if (!validNamePattern.test(formInput.name)) {
      newErrors.name = "Only alphabets and spaces are allowed.";
    }
    if (!formInput.subject) newErrors.subject = "Subject is required.";

    // Ensure email is not empty and valid with symbol @
    if (!formInput.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formInput.email)) {
      newErrors.email = "Please enter a valid email.";
    }

    // Maximum 8 numerics allowed
    if (!formInput.contactNumber) {
      newErrors.contactNumber = "Contact number is required.";
    } else if (!/^\d{8}$/.test(formInput.contactNumber)) {
      newErrors.contactNumber = "Maximum of 8-digits allowed.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await createTeacher(formInput);
      setAlertText("Teacher added successfully!");
      setIsSuccess(true);
      setShowAlert(true);
      setTimeout(() => navigate("/teachers"), 2000);
    } catch (err) {
      const errorObj = err as ErrorType;
      console.error("error:", err);

      let message =
        errorObj.error || errorObj.message || "Failed to create teacher";

      // Type check first
      if (errorObj.details && typeof errorObj.details === "object") {
        const messages: string[] = [];

        Object.entries(errorObj.details).forEach(([field, fieldMessages]) => {
          fieldMessages.forEach((msg) => {
            messages.push(`${field}: ${msg}`);
          });
        });

        message = messages.join("\n");
      }
      setAlertText(message);
      setIsSuccess(false);
      setShowAlert(true);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" mb={2}>
        Add Teacher
      </Typography>

      <Card sx={{ p: 4 }}>
        <form
          id="add-teacher-form"
          onSubmit={handleSubmit}
          style={{ width: "50%" }}
        >
          <InputField
            label="Name"
            name="name"
            type="text"
            placeholder="Name"
            value={formInput.name}
            onChange={handleChange}
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
          <InputField
            label="Subject"
            name="subject"
            type="select"
            placeholder="Select a subject"
            value={formInput.subject}
            onChange={handleChange}
            options={SUBJECT_OPTIONS}
            error={Boolean(errors.subject)}
            helperText={errors.subject}
          />
          <InputField
            label="Email Address"
            name="email"
            type="text" // To keep error handling consistent
            placeholder="Email Address"
            value={formInput.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
          <InputField
            label="Contact Number"
            name="contactNumber"
            type="tel"
            placeholder="Contact number"
            value={formInput.contactNumber}
            onChange={handleNumberChange}
            error={Boolean(errors.contactNumber)}
            helperText={errors.contactNumber}
          />
        </form>
      </Card>

      <Box mt={3} display="flex" justifyContent="flex-end">
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{ mr: 2 }}
          startIcon={<KeyboardBackspace />}
        >
          Back
        </Button>
        <Button type="submit" variant="contained" form="add-teacher-form">
          Add Teacher
        </Button>
      </Box>
      <Snackbar
        open={showAlert}
        autoHideDuration={4000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={isSuccess ? "success" : "error"}
          sx={{ width: "100%", whiteSpace: "pre-line" }}
          onClose={() => setShowAlert(false)}
        >
          {alertText}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddTeacher;
