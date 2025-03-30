import express from "express";
import sequelize from "./db";
import teacherRoutes from "./routes/teachers";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

// Routes
app.use("/api/teachers", teacherRoutes);

// Testing DB connection
// app.get("/", async (_req, res) => {
//   try {
//     await sequelize.authenticate();
//     res.send("DB connected");
//   } catch (err) {
//     console.error("DB connection failed:", err);
//     res.status(500).send("DB connection error");
//   }
// });

app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});
