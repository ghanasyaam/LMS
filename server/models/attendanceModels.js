import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["present", "absent", "late"],
    required: true,
  },
});

export default mongoose.model("Attendance", AttendanceSchema);
