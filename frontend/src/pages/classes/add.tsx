import { Box, Typography, Button, Card, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { KeyboardBackspace } from "@mui/icons-material";
import { useState, useEffect } from "react";
import InputField, { InputFieldChangeEvent } from "../../ui/InputField/index";
import { fetchAllTeachers } from "../../api/teachers";
import { createClass, getClassList } from "../../api/classes";
import { ClassInput, ErrorType, TeacherResponse } from "../../types";
import { PRIMARY_SCHOOL_LEVELS } from "./constants";

const AddClass = () => {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState<TeacherResponse[]>([]);
  const [isLoadingTeachers, setIsLoadingTeachers] = useState(true);
  const [assignedTeacherEmails, setAssignedTeacherEmails] = useState<string[]>(
    []
  );
  const [formInput, setFormInput] = useState<ClassInput>({
    level: "",
    name: "",
    teacherEmail: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ClassInput, string>>
  >({}); // partial: make keys of ClassInput optional in error handling
  const [isSuccess, setIsSuccess] = useState(true);
  const [alertText, setAlertText] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const initData = async () => {
      try {
        const [{ data: teacherList }, { data: classList }] = await Promise.all([
          fetchAllTeachers(),
          getClassList(),
        ]);

        setTeachers(teacherList);

        // Match class.formTeacher.name with teacherList.name to get email
        const assignedEmails = classList
          .map((cls) => {
            const matched = teacherList.find(
              (t) => t.name === cls.formTeacher.name
            );
            return matched?.email;
          })
          .filter((email): email is string => Boolean(email));

        setAssignedTeacherEmails(assignedEmails);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoadingTeachers(false);
      }
    };
    initData();
  }, []);

  const handleChange = (e: InputFieldChangeEvent) => {
    const { name, value } = e.target;

    setFormInput((prev) => ({
      ...prev,
      [name as string]: value,
    }));

    // Check for teacher's availability on the fly
    if (name === "teacherEmail") {
      if (assignedTeacherEmails.includes(value)) {
        setErrors((prev) => ({
          ...prev,
          teacherEmail: "This teacher is already assigned to a class.",
        }));
      } else {
        // Reset error
        setErrors((prev) => ({
          ...prev,
          teacherEmail: "",
        }));
      }
    } else {
      // Reset error
      setErrors((prev) => ({ ...prev, [name as string]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};

    if (!formInput.level) newErrors.level = "Class level is required.";
    if (!formInput.name) newErrors.name = "Class name is required.";
    if (!formInput.teacherEmail) {
      newErrors.teacherEmail = "Form teacher is required.";
    } else if (assignedTeacherEmails.includes(formInput.teacherEmail)) {
      newErrors.teacherEmail = "This teacher is already assigned to a class.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Transform display values
      const displayLevel =
        PRIMARY_SCHOOL_LEVELS.find((opt) => opt.value === formInput.level)
          ?.label || formInput.level;

      const payload = {
        level: displayLevel,
        name: `Class ${formInput.name}`,
        teacherEmail: formInput.teacherEmail,
      };
      try {
        await createClass(payload);
        setAlertText("Class added successfully!");
        setIsSuccess(true);
        setShowAlert(true);
        setTimeout(() => navigate("/classes"), 2000);
      } catch (err) {
        const errorObj = err as ErrorType;

        console.error("error:", err);

        let message =
          errorObj.error || errorObj.message || "Failed to create class";

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
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" mb={2}>
        Add Class
      </Typography>

      <Card sx={{ p: 4 }}>
        <form
          id="add-class-form"
          onSubmit={handleSubmit}
          style={{ width: "50%" }}
        >
          <InputField
            label="Class Level"
            name="level"
            type="select"
            placeholder="Select a level"
            value={formInput.level}
            onChange={handleChange}
            options={PRIMARY_SCHOOL_LEVELS}
            error={errors.level ? true : false}
            helperText={errors.level}
          />
          <InputField
            label="Class Name"
            name="name"
            type="text"
            placeholder="Class Name (e.g. 1A, 1B)"
            value={formInput.name}
            onChange={handleChange}
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
          <InputField
            label="Form Teacher"
            name="teacherEmail"
            type="select"
            placeholder="Assign a form teacher"
            value={formInput.teacherEmail}
            onChange={handleChange}
            options={teachers.map((teacher) => ({
              label: teacher.name,
              value: teacher.email,
            }))}
            error={Boolean(errors.teacherEmail)}
            helperText={errors.teacherEmail}
            isTeacherEmpty={teachers.length === 0 ? true : false}
            isLoadingTeachers={isLoadingTeachers}
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
        <Button type="submit" variant="contained" form="add-class-form">
          Add Class
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

export default AddClass;
