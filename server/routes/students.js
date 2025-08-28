import express from "express";
import bcrypt from "bcrypt";
import db from "../db/connection.js"
import { ObjectId } from "mongodb";

const router = express.Router();

// Get all students
router.get("/", async(req,res) => {
    let collection = db.collection("students");
    // Don't return passwords in the response
    let results = await collection.find({}, { projection: { password: 0 } }).toArray();
    res.status(200).send(results);
})

// Get student by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID format");
  }
  let collection = db.collection("students");
  let query = { _id: new ObjectId(id) };
  // Don't return password in the response
  let result = await collection.findOne(query, { projection: { password: 0 } });

  if (!result) res.status(404).send("Not found");
  else res.status(200).send(result);
});

// Create new student
router.post("/", async (req, res) => {
  try {
    // Validate required fields
    const { name, rollno, email, sig, role, password, phone } = req.body;
    
    if (!name || !rollno || !email || !sig || !role) {
      return res.status(400).send("Name, roll number, email, SIG, and role are required");
    }
    
    if (!password) {
      return res.status(400).send("Password is required");
    }
    
    if (!phone) {
      return res.status(400).send("Phone number is required");
    }

    // Check if student with same email or roll number already exists
    let collection = db.collection("students");
    const existingStudent = await collection.findOne({
      $or: [{ email }, { rollno }]
    });
    
    if (existingStudent) {
      return res.status(409).send("Student with this email or roll number already exists");
    }

    // Hash the password with salt rounds of 12
    const hashedPassword = await bcrypt.hash(password, 12);

    let newDocument = {
      name,
      rollno,
      email,
      sig,
      role,
      password: hashedPassword,
      phone,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    let result = await collection.insertOne(newDocument);
    
    // Don't return the password in response
    const { password: _, ...responseData } = newDocument;
    res.status(201).send({ ...result, student: responseData });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// Update student details (PATCH - partial update)
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID format");
  }
  
  try {
    const query = { _id: new ObjectId(id) };
    const { password, ...otherFields } = req.body;
    
    // Check if student exists
    let collection = db.collection("students");
    const existingStudent = await collection.findOne(query);
    if (!existingStudent) {
      return res.status(404).send("Student not found");
    }

    // If updating email or rollno, check for duplicates
    if (otherFields.email || otherFields.rollno) {
      const duplicateQuery = {
        _id: { $ne: new ObjectId(id) }, // Exclude current student
        $or: []
      };
      
      if (otherFields.email) {
        duplicateQuery.$or.push({ email: otherFields.email });
      }
      if (otherFields.rollno) {
        duplicateQuery.$or.push({ rollno: otherFields.rollno });
      }
      
      const duplicateStudent = await collection.findOne(duplicateQuery);
      if (duplicateStudent) {
        return res.status(409).send("Another student with this email or roll number already exists");
      }
    }
    
    let updates = {
      $set: {
        ...otherFields,
        updatedAt: new Date()
      },
    };

    // Only hash and update password if it's provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      updates.$set.password = hashedPassword;
    }

    let result = await collection.updateOne(query, updates);
    
    if (result.matchedCount === 0) {
      return res.status(404).send("Student not found");
    }
    
    if (result.modifiedCount === 0) {
      return res.status(200).send({ message: "No changes made", result });
    }
    
    res.status(200).send({ message: "Student updated successfully", result });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

// Delete student
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID format");
  }
  try {
    const query = { _id: new ObjectId(id) };

    const collection = db.collection("students");
    let result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      return res.status(404).send("Student not found");
    }

    res.status(200).send({ message: "Student deleted successfully", result });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

// Login route for password verification
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    let collection = db.collection("students");
    let student = await collection.findOne({ email });

    if (!student) {
      return res.status(401).send("Invalid credentials");
    }

    // Compare provided password with stored hash
    const isPasswordValid = await bcrypt.compare(password, student.password);

    if (!isPasswordValid) {
      return res.status(401).send("Invalid credentials");
    }

    // Don't return password in successful login response
    const { password: _, ...studentData } = student;
    res.status(200).send({ 
      message: "Login successful", 
      student: studentData 
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Error during login");
  }
});

export default router;