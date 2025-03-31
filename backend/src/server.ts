import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./db";
import teacherRoutes from "./routes/teachers";
import classRoutes from "./routes/classes";
import "../models";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

// Routes
app.use("/api/teachers", teacherRoutes);
app.use("/api/classes", classRoutes);

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
