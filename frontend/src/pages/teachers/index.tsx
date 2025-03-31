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
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
interface TeacherResponse {
  id: number;
  name: string;
  subject: string;
  contactNumber: string;
  email: string;
}
const Teachers = () => {
  const navigate = useNavigate();

  const [teachersData, setTeachersData] = useState<TeacherResponse[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          name: "Ms. Rachel Tan",
          subject: "Mathematics",
          contactNumber: "+65 9123 4567",
          email: "rachel.tan@example.com",
        },
        {
          id: 2,
          name: "Mr. John Lee",
          subject: "Science",
          contactNumber: "+65 8234 5678",
          email: "john.lee@example.com",
        },
      ];
      setTeachersData(mockData);
      setIsLoading(false);
    }, 1500); // 1.5s fake delay
  }, []);

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
      ) : teachersData?.length === 0 ? (
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
            >
              Add Teacher
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Contact Number</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teachersData!.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>{teacher.name}</TableCell>
                    <TableCell>{teacher.subject}</TableCell>
                    <TableCell>{teacher.contactNumber}</TableCell>
                    <TableCell>{teacher.email}</TableCell>
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
