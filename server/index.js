import express from "express"
import cors from "cors"
import students from "./routes/students.js"
import mongoose from "mongoose";
import attendanceRoutes from "./routes/attendanceRoutes.js";

// Connect to MongoDB with error handling
async function connectDB() {
  try {
    await mongoose.connect(process.env.ATLAS_URI);
    console.log("Connected to mongoDB and pinged successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit if connection fails
  }
}
connectDB();

const PORT = process.env.PORT || 5051;
const app = express()

app.use(cors());
app.use(express.json());
app.use("/student",students);
app.use("/", students);
app.use("/attendance", attendanceRoutes);

app.listen(PORT, ()=> {
    console.log(`Server listening on port ${PORT}`);
});