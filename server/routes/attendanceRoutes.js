import express from "express";
import Attendance from "../models/attendanceModels.js";

const router = express.Router();

// 1. Create attendance record
router.post("/", async (req, res) => {
  try {
    const attendance = new Attendance(req.body);
    await attendance.save();
    res.status(201).json(attendance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 2. Get all attendance records
router.get("/", async (req, res) => {
  try {
    const records = await Attendance.find().populate("student_id");
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Get single record by ID
router.get("/:id", async (req, res) => {
  try {
    const record = await Attendance.findById(req.params.id).populate("student_id");
    if (!record) return res.status(404).json({ error: "Not found" });
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Get attendance history for a student
router.get("/student/:studentId", async (req, res) => {
  try {
    const records = await Attendance.find({ student_id: req.params.studentId });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Update attendance
router.put("/:id", async (req, res) => {
  try {
    const record = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!record) return res.status(404).json({ error: "Not found" });
    res.json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 6. Delete record
router.delete("/:id", async (req, res) => {
  try {
    const record = await Attendance.findByIdAndDelete(req.params.id);
    if (!record) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
