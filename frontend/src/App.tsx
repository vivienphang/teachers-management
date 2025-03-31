import { Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Teachers from "./pages/teachers/index";
import AddTeacher from "./pages/teachers/add";
import Classes from "./pages/Classes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Navigate to="/teachers" replace />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/teachers/add" element={<AddTeacher />} />
        <Route path="/classes" element={<Classes />} />
      </Route>
    </Routes>
  );
}

export default App;
