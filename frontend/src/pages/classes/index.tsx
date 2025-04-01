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
import { ClassListItem, ErrorType } from "../../types";
import { getClassList } from "../../api/classes";

const Classes = () => {
  const navigate = useNavigate();

  const [classesData, setClassesData] = useState<ClassListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data } = await getClassList();
        setClassesData(data);
      } catch (err) {
        console.error("Failed to fetch classes:", err);

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

  return (
    <Box p={4}>
      <Typography variant="h4" mb={2}>
        Classes
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
      ) : classesData.length === 0 ? (
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
            There are no existing classes yet
          </Typography>
          <Button
            variant="contained"
            sx={{ textTransform: "none" }}
            onClick={() => navigate("/classes/add")}
            startIcon={<Add />}
          >
            Add Class
          </Button>
        </Card>
      ) : (
        <Box>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Button
              variant="contained"
              onClick={() => navigate("/classes/add")}
              sx={{ textTransform: "none" }}
              startIcon={<Add />}
            >
              Add Class
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>#</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Class Level</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Class Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Form Teacher
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {classesData.map((classItem, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{classItem.level}</TableCell>
                    <TableCell>{classItem.name}</TableCell>
                    <TableCell>{classItem.formTeacher.name}</TableCell>
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

export default Classes;
