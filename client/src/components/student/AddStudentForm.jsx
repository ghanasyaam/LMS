import React from "react";
import "./StudentsApp.css";

export default function AddStudentForm({
  form,
  errors,
  sigOptions,
  roleOptions,
  handleChange,
  addStudent,
}) {
  return (
    <div className="add-student-form">
      <h3>ADD NEW STUDENT</h3>
      
      {errors.submit && (
        <div className="form-submit-error">
          <p>{errors.submit}</p>
        </div>
      )}
      
      <div className="form-grid">
        {/* Name Field */}
        <div className="form-field">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className={`form-input ${errors.name ? 'error' : ''}`}
          />
          {errors.name && <p className="form-error-text">{errors.name}</p>}
        </div>
        
        {/* Roll Number Field */}
        <div className="form-field">
          <input
            name="rollno"
            placeholder="Roll No (AM.SC.U4CSE23000)"
            value={form.rollno}
            onChange={handleChange}
            className={`form-input ${errors.rollno ? 'error' : ''}`}
          />
          {errors.rollno && <p className="form-error-text">{errors.rollno}</p>}
        </div>
        
        {/* Email Field */}
        <div className="form-field">
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={`form-input ${errors.email ? 'error' : ''}`}
          />
          {errors.email && <p className="form-error-text">{errors.email}</p>}
        </div>

        {/* Phone Field */}
        <div className="form-field">
          <input
            name="phone"
            placeholder="Phone (10-digit number)"
            value={form.phone}
            onChange={handleChange}
            maxLength="10"
            className={`form-input ${errors.phone ? 'error' : ''}`}
          />
          {errors.phone && <p className="form-error-text">{errors.phone}</p>}
        </div>

        {/* Password Field */}
        <div className="form-field">
          <input
            name="password"
            type="password"
            placeholder="Password (min 6 characters)"
            value={form.password}
            onChange={handleChange}
            className={`form-input ${errors.password ? 'error' : ''}`}
          />
          {errors.password && <p className="form-error-text">{errors.password}</p>}
        </div>
        
        {/* SIG Field */}
        <div className="form-field">
          <select
            name="sig"
            value={form.sig}
            onChange={handleChange}
            className={`form-select ${errors.sig ? 'error' : ''}`}
          >
            <option value="">Select SIG</option>
            {sigOptions.map(sig => (
              <option key={sig} value={sig}>{sig}</option>
            ))}
          </select>
          {errors.sig && <p className="form-error-text">{errors.sig}</p>}
        </div>
        
        {/* Role Field */}
        <div className="form-field">
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className={`form-select ${errors.role ? 'error' : ''}`}
          >
            <option value="">Select Role</option>
            {roleOptions.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          {errors.role && <p className="form-error-text">{errors.role}</p>}
        </div>
      </div>
      
      <div className="form-actions">
        <button
          onClick={addStudent}
          className="app-button app-button-primary"
        >
          ADD STUDENT
        </button>
      </div>
    </div>
  );
}