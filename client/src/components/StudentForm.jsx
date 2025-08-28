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
      newErrors.rollno = "Roll number format: AM.SC.U4CSE23029";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Email format: am.sc.u4cse23029@am.students.amrita.edu";
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
      newErrors.rollno = "Roll number format: AM.SC.U4CSE23029";
    }

    // Email validation - same as add form
    if (!editForm.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(editForm.email)) {
      newErrors.email = "Email format: am.sc.u4cse23029@am.students.amrita.edu";
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
  const roleOptions = ["CORE", "CO-LEAD", "LEAD", "CHAIRPERSON", "VICE-CHAIRPERSON", "WEB-MASTER", "SECRETARY"];

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 bg-clip-text text-transparent mb-4 tracking-wider">
            STUDENTS
          </h1>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-cyan-400 to-pink-500 rounded-full shadow-lg shadow-cyan-500/50"></div>
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
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6 z-50">
            <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8 shadow-2xl shadow-cyan-500/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-cyan-300 mb-6 text-center tracking-wide">EDIT STUDENT</h3>
              
              {editErrors.submit && (
                <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg">
                  <p className="text-red-400 text-center">{editErrors.submit}</p>
                </div>
              )}

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Name Field */}
                  <div className="relative group">
                    <input
                      name="name"
                      placeholder="Name"
                      value={editForm.name}
                      onChange={handleEditChange}
                      className={`w-full px-4 py-3 bg-slate-800/50 border ${editErrors.name ? 'border-red-500' : 'border-cyan-500/30'} rounded-lg text-cyan-100 placeholder-cyan-400/60 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300 hover:border-cyan-400/50`}
                    />
                    {editErrors.name && <p className="text-red-400 text-sm mt-1">{editErrors.name}</p>}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  
                  {/* Roll Number Field */}
                  <div className="relative group">
                    <input
                      name="rollno"
                      placeholder="Roll No (AM.SC.U4CSE23029)"
                      value={editForm.rollno}
                      onChange={handleEditChange}
                      className={`w-full px-4 py-3 bg-slate-800/50 border ${editErrors.rollno ? 'border-red-500' : 'border-cyan-500/30'} rounded-lg text-cyan-100 placeholder-cyan-400/60 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300 hover:border-cyan-400/50`}
                    />
                    {editErrors.rollno && <p className="text-red-400 text-sm mt-1">{editErrors.rollno}</p>}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  
                  {/* Email Field */}
                  <div className="relative group">
                    <input
                      name="email"
                      placeholder="Email (am.sc.u4cse23029@am.students.amrita.edu)"
                      value={editForm.email}
                      onChange={handleEditChange}
                      className={`w-full px-4 py-3 bg-slate-800/50 border ${editErrors.email ? 'border-red-500' : 'border-cyan-500/30'} rounded-lg text-cyan-100 placeholder-cyan-400/60 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300 hover:border-cyan-400/50`}
                    />
                    {editErrors.email && <p className="text-red-400 text-sm mt-1">{editErrors.email}</p>}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>

                  {/* Phone Field */}
                  <div className="relative group">
                    <input
                      name="phone"
                      placeholder="Phone (10-digit number)"
                      value={editForm.phone}
                      onChange={handleEditChange}
                      maxLength="10"
                      className={`w-full px-4 py-3 bg-slate-800/50 border ${editErrors.phone ? 'border-red-500' : 'border-cyan-500/30'} rounded-lg text-cyan-100 placeholder-cyan-400/60 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300 hover:border-cyan-400/50`}
                    />
                    {editErrors.phone && <p className="text-red-400 text-sm mt-1">{editErrors.phone}</p>}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>

                  {/* Password Field */}
                  <div className="relative group">
                    <input
                      name="password"
                      type="password"
                      placeholder="New Password (leave empty to keep current)"
                      value={editForm.password}
                      onChange={handleEditChange}
                      className={`w-full px-4 py-3 bg-slate-800/50 border ${editErrors.password ? 'border-red-500' : 'border-cyan-500/30'} rounded-lg text-cyan-100 placeholder-cyan-400/60 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300 hover:border-cyan-400/50`}
                    />
                    {editErrors.password && <p className="text-red-400 text-sm mt-1">{editErrors.password}</p>}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  
                  {/* SIG Field */}
                  <div className="relative group">
                    <select
                      name="sig"
                      value={editForm.sig}
                      onChange={handleEditChange}
                      className={`w-full px-4 py-3 bg-slate-800/50 border ${editErrors.sig ? 'border-red-500' : 'border-cyan-500/30'} rounded-lg text-cyan-100 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300 hover:border-cyan-400/50`}
                    >
                      <option value="" className="bg-slate-800 text-cyan-400">Select SIG</option>
                      {sigOptions.map(sig => (
                        <option key={sig} value={sig} className="bg-slate-800 text-cyan-100">{sig}</option>
                      ))}
                    </select>
                    {editErrors.sig && <p className="text-red-400 text-sm mt-1">{editErrors.sig}</p>}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  
                  {/* Role Field */}
                  <div className="relative group">
                    <select
                      name="role"
                      value={editForm.role}
                      onChange={handleEditChange}
                      className={`w-full px-4 py-3 bg-slate-800/50 border ${editErrors.role ? 'border-red-500' : 'border-cyan-500/30'} rounded-lg text-cyan-100 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300 hover:border-cyan-400/50`}
                    >
                      <option value="" className="bg-slate-800 text-cyan-400">Select Role</option>
                      {roleOptions.map(role => (
                        <option key={role} value={role} className="bg-slate-800 text-cyan-100">{role}</option>
                      ))}
                    </select>
                    {editErrors.role && <p className="text-red-400 text-sm mt-1">{editErrors.role}</p>}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
                
                <div className="flex justify-center gap-4 pt-4">
                  <button
                    onClick={updateStudent}
                    className="relative px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg shadow-lg shadow-green-500/25 hover:shadow-emerald-500/40 hover:shadow-xl transform hover:scale-105 transition-all duration-300 tracking-wide"
                  >
                    <span className="relative z-10">UPDATE STUDENT</span>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-600 to-green-600 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                  
                  <button
                    onClick={cancelEdit}
                    className="relative px-8 py-3 bg-gradient-to-r from-gray-600 to-slate-600 text-white font-bold rounded-lg shadow-lg shadow-gray-500/25 hover:shadow-slate-500/40 hover:shadow-xl transform hover:scale-105 transition-all duration-300 tracking-wide"
                  >
                    <span className="relative z-10">CANCEL</span>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-slate-600 to-gray-600 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
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