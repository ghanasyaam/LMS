import React from "react";
import "./StudentsList.css"; // Make sure to import the new CSS file

export default function StudentsList({ students, startEdit, deleteStudent }) {
  return (
    <div className="students-list-container">
      <div className="list-header">
        <h2>ALL STUDENTS</h2>
        <div className="underline"></div>
      </div>

      {students.length === 0 ? (
        <div className="no-students-container">
          <div className="no-students-message">
            <p>No students in database.</p>
          </div>
        </div>
      ) : (
        <div className="students-grid">
          {students.map((s) => (
            <div key={s._id} className="student-card">
              {/* Main content area */}
              <div className="student-card-content">
                <h3>{s.name}</h3>
                <p className="roll-number">Roll: {s.rollno}</p>

                <div className="student-info">
                  <div className="student-info-row">
                    <span className="student-info-label">Email:</span>
                    <span className="student-info-value">{s.email}</span>
                  </div>

                  {s.phone && (
                    <div className="student-info-row">
                      <span className="student-info-label">Phone:</span>
                      <span className="student-info-value">{s.phone}</span>
                    </div>
                  )}

                  <div className="student-info-row">
                    <span className="student-info-label">SIG:</span>
                    <span className="student-info-value">{s.sig}</span>
                  </div>

                  <div className="student-info-row">
                    <span className="student-info-label">Role:</span>
                    <span className="student-info-value">{s.role}</span>
                  </div>
                </div>

                {/* Meta info */}
                <div className="card-meta-info">
                  <div className="meta-row">
                    <span className="meta-label">ID:</span>
                    <span className="meta-value">{s._id}</span>
                  </div>
                  {s.createdAt && (
                    <div className="meta-row">
                      <span className="meta-label">Created:</span>
                      <span>
                        {new Date(s.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action buttons area */}
              <div className="card-actions">
                <div className="card-buttons-container">
                  <button
                    onClick={() => startEdit(s)}
                    className="card-button edit-button"
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() => deleteStudent(s._id)}
                    className="card-button delete-button"
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}