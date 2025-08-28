import React, { useEffect, useState } from "react";
import StudentsList from "./StudentsList.jsx";
import AddStudentForm from "./AddStudentForm.jsx";

export default function StudentsApp() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ 
    name: "", 
    rollno: "", 
    email: "", 
    sig: "", 
    role: "", 
    password: "", 
    phone: "" 
  });
  const [editForm, setEditForm] = useState({ 
    id: "",
    name: "", 
    rollno: "", 
    email: "", 
    sig: "", 
    role: "", 
    password: "", 
    phone: "" 
  });
  const [errors, setErrors] = useState({});
  const [editErrors, setEditErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  // Fetch all students
  const fetchStudents = async () => {
    try {
      let res = await fetch("http://localhost:5051/");
      let data = await res.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
      // For demo purposes, set empty array
      setStudents([
        {
          _id: "demo1",
          name: "John Doe",
          rollno: "AM.SC.U4CSE23001",
          email: "am.sc.u4cse23001@am.students.amrita.edu",
          phone: "9876543210",
          sig: "WEB",
          role: "CORE",
          createdAt: new Date().toISOString()
        }
      ]);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Handle edit form change
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
    // Clear error when user starts typing
    if (editErrors[name]) {
      setEditErrors({ ...editErrors, [name]: "" });
    }
  };

  // Validation functions
  const validateRollNo = (rollno) => {
    const rollPattern = /^AM\.(SC|SE|SB|SA|EN|CB)\.(U[1-9])[A-Z]{2,4}\d{5}$/;
    return rollPattern.test(rollno);
  };

  const validateEmail = (email) => {
    const emailPattern = /^am\.(sc|se|sb|sa|en|cb)\.u\d{1}[a-z]{2,4}\d{5}@am\.students\.amrita\.edu$/;
    return emailPattern.test(email);
  };

  const validatePhone = (phone) => {
    const phonePattern = /^[6-9]\d{9}$/;
    return phonePattern.test(phone);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.rollno.trim()) {
      newErrors.rollno = "Roll number is required";
    } else if (!validateRollNo(form.rollno)) {
      newErrors.rollno = "Roll number format: AM.SC.U4CSE23000";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Email format: am.sc.u4cse23000@am.students.amrita.edu";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(form.phone)) {
      newErrors.phone = "Phone number must be a valid 10-digit Indian number";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!form.sig.trim()) {
      newErrors.sig = "SIG is required";
    }

    if (!form.role) {
      newErrors.role = "Role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateEditForm = () => {
    const newErrors = {};

    // Name validation - same as add form
    if (!editForm.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Roll number validation - same as add form
    if (!editForm.rollno.trim()) {
      newErrors.rollno = "Roll number is required";
    } else if (!validateRollNo(editForm.rollno)) {
      newErrors.rollno = "Roll number format: AM.SC.U4CSE23000";
    }

    // Email validation - same as add form
    if (!editForm.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(editForm.email)) {
      newErrors.email = "Email format: am.sc.u4cse23000@am.students.amrita.edu";
    }

    // Phone validation - same as add form (now required for edit too)
    if (!editForm.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(editForm.phone)) {
      newErrors.phone = "Phone number must be a valid 10-digit Indian number";
    }

    // Password validation - only validate if provided (optional for edit)
    if (editForm.password && editForm.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // SIG validation - same as add form
    if (!editForm.sig.trim()) {
      newErrors.sig = "SIG is required";
    }

    // Role validation - same as add form
    if (!editForm.role) {
      newErrors.role = "Role is required";
    }

    setEditErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add student
  const addStudent = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    
    try {
      const response = await fetch("http://localhost:5051/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      
      if (response.ok) {
        setForm({ name: "", rollno: "", email: "", sig: "", role: "", password: "", phone: "" });
        setErrors({});
        fetchStudents();
      } else {
        const errorText = await response.text();
        setErrors({ submit: errorText });
      }
    } catch (error) {
      setErrors({ submit: "Network error occurred" });
    }
  };

  // Start editing a student
  const startEdit = (student) => {
    setEditForm({
      id: student._id,
      name: student.name,
      rollno: student.rollno,
      email: student.email,
      sig: student.sig,
      role: student.role,
      password: "", // Don't populate password for security
      phone: student.phone
    });
    setEditErrors({});
    setIsEditing(true);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditForm({ 
      id: "",
      name: "", 
      rollno: "", 
      email: "", 
      sig: "", 
      role: "", 
      password: "", 
      phone: "" 
    });
    setEditErrors({});
    setIsEditing(false);
  };

  // Update student
  const updateStudent = async (e) => {
    e.preventDefault();
    if (!validateEditForm()) {
      return;
    }
    
    try {
      // Prepare update data (exclude id and don't send empty password)
      const { id, password, ...updateData } = editForm;
      
      // Only include password if it's provided
      if (password.trim()) {
        updateData.password = password;
      }

      const response = await fetch(`http://localhost:5051/student/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });
      
      if (response.ok) {
        setIsEditing(false);
        setEditForm({ 
          id: "",
          name: "", 
          rollno: "", 
          email: "", 
          sig: "", 
          role: "", 
          password: "", 
          phone: "" 
        });
        setEditErrors({});
        fetchStudents();
      } else {
        const errorText = await response.text();
        setEditErrors({ submit: errorText });
      }
    } catch (error) {
      setEditErrors({ submit: "Network error occurred" });
    }
  };

  // Delete student
  const deleteStudent = async (id) => {
    try {
      await fetch(`http://localhost:5051/student/${id}`, { method: "DELETE" });
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const sigOptions = ["WEB", "APP", "AI", "GLITCH", "CYBER"];
  const roleOptions = ["CORE", "CO-LEAD", "LEAD", "CHAIRPERSON", "VICE-CHAIRPERSON", "WEB-MASTER", "SECRETARY", "MEMBER"];

  return (
    <div className="students-app-container">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="app-header">
          <h1>STUDENTS</h1>
          <div className="underline"></div>
        </div>

        {/* Add Form */}
        <AddStudentForm
          form={form}
          errors={errors}
          sigOptions={sigOptions}
          roleOptions={roleOptions}
          handleChange={handleChange}
          addStudent={addStudent}
        />

        {/* Edit Modal */}
        {isEditing && (
          <div className="edit-modal-backdrop">
            <div className="edit-modal-content">
              <h3>EDIT STUDENT</h3>
              
              {editErrors.submit && (
                <div className="form-submit-error">
                  <p>{editErrors.submit}</p>
                </div>
              )}

              {/* Form fields with new classes */}
              <div className="form-grid">
                <div className="form-field">
                  <input name="name" placeholder="Name" value={editForm.name} onChange={handleEditChange} className="form-input" />
                  {editErrors.name && <p className="form-error-text">{editErrors.name}</p>}
                </div>
                
                <div className="form-field">
                  <input name="rollno" placeholder="Roll No (AM.SC.U4CSE23000)" value={editForm.rollno} onChange={handleEditChange} className="form-input" />
                  {editErrors.rollno && <p className="form-error-text">{editErrors.rollno}</p>}
                </div>
                
                <div className="form-field">
                  <input name="email" placeholder="Email" value={editForm.email} onChange={handleEditChange} className="form-input" />
                  {editErrors.email && <p className="form-error-text">{editErrors.email}</p>}
                </div>

                <div className="form-field">
                  <input name="phone" placeholder="Phone (10-digit number)" value={editForm.phone} onChange={handleEditChange} maxLength="10" className="form-input" />
                  {editErrors.phone && <p className="form-error-text">{editErrors.phone}</p>}
                </div>

                <div className="form-field">
                  <input name="password" type="password" placeholder="New Password (optional)" value={editForm.password} onChange={handleEditChange} className="form-input" />
                  {editErrors.password && <p className="form-error-text">{editErrors.password}</p>}
                </div>
                
                <div className="form-field">
                  <select name="sig" value={editForm.sig} onChange={handleEditChange} className="form-select">
                    <option value="">Select SIG</option>
                    {sigOptions.map(sig => <option key={sig} value={sig}>{sig}</option>)}
                  </select>
                  {editErrors.sig && <p className="form-error-text">{editErrors.sig}</p>}
                </div>
                
                <div className="form-field">
                  <select name="role" value={editForm.role} onChange={handleEditChange} className="form-select">
                    <option value="">Select Role</option>
                    {roleOptions.map(role => <option key={role} value={role}>{role}</option>)}
                  </select>
                  {editErrors.role && <p className="form-error-text">{editErrors.role}</p>}
                </div>
              </div>
              
              <div className="form-actions">
                <button onClick={updateStudent} className="app-button app-button-primary">
                  UPDATE STUDENT
                </button>
                <button onClick={cancelEdit} className="app-button app-button-secondary">
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        )}

        <StudentsList 
          students={students} 
          startEdit={startEdit} 
          deleteStudent={deleteStudent} 
        />
      </div>
    </div>
  );
}