import {
  Box,
  Button,
  Card,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Alert,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllTeachers } from "../../api/teachers";
import { ErrorType, TeacherResponse } from "../../types";
import { SUBJECT_OPTIONS } from "../classes/constants";

const Teachers = () => {
  const navigate = useNavigate();

  const [teachersData, setTeachersData] = useState<TeacherResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data } = await fetchAllTeachers();
        setTeachersData(data);
      } catch (err) {
        console.error("Failed to fetch teachers:", err);
        const errorObj = err as ErrorType;
        const message =
          errorObj.error ||
          errorObj.message ||
          "Something went wrong. Please try again.";

        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    initData();
  }, []);

  const getSubjectLabel = (value: string) => {
    const match = SUBJECT_OPTIONS.find((opt) => opt.value === value);
    return match ? match.label : value;
  };

  return (
    <Box p={4}>
      <Typography variant="h4" mb={2}>
        Teachers
      </Typography>

      {isLoading ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="320px"
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : teachersData.length === 0 ? (
        <Card
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "320px",
          }}
        >
          <Typography variant="body1" mb={2}>
            There are no existing teachers yet
          </Typography>
          <Button
            variant="contained"
            sx={{ textTransform: "none" }}
            onClick={() => navigate("/teachers/add")}
            startIcon={<Add />}
          >
            Add Teacher
          </Button>
        </Card>
      ) : (
        <Box>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Button
              variant="contained"
              onClick={() => navigate("/teachers/add")}
              sx={{ textTransform: "none" }}
              startIcon={<Add />}
            >
              Add Teacher
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>#</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Subject</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Work Contact
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teachersData.map((teacher, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{teacher.name}</TableCell>
                    <TableCell>{getSubjectLabel(teacher.subject)}</TableCell>

                    <TableCell>{teacher.email}</TableCell>
                    <TableCell>{teacher.contactNumber}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default Teachers;
