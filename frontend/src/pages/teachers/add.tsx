import { Box, Typography, Button, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { KeyboardBackspace } from "@mui/icons-material";
import { useState } from "react";
import InputField, { InputFieldChangeEvent } from "../../ui/InputField/index";

const AddTeacher = () => {
  const navigate = useNavigate();

  const [formInput, setFormInput] = useState({
    name: "",
    subject: "",
    contactNumber: "",
    email: "",
  });

  const handleChange = (e: InputFieldChangeEvent) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/\D/g, "");
    setFormInput((prev) => ({
      ...prev,
      [e.target.name]: onlyDigits,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Form input", formInput);
    e.preventDefault();
    try {
      // TODO: API query
      // await createTeacher(formInput);
      navigate("/teachers");
    } catch (err) {
      console.error("Submit error:", err);
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
          />
          <InputField
            label="Subject"
            name="subject"
            type="select"
            placeholder="Select a subject"
            value={formInput.subject}
            onChange={handleChange}
            options={[
              { label: "Math", value: "math" },
              { label: "Science", value: "science" },
            ]}
          />
          <InputField
            label="Email Address"
            name="email"
            type="email"
            placeholder="Email Address"
            value={formInput.email}
            onChange={handleChange}
          />
          <InputField
            label="Contact Number"
            name="contactNumber"
            type="tel"
            placeholder="Contact number"
            value={formInput.contactNumber}
            onChange={handleNumberChange}
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
    </Box>
  );
};

export default AddTeacher;
