import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Container from "@mui/material/Container";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default RootLayout;
