import React from "react";

export default function EditStudentModal({
  isEditing,
  editForm,
  editErrors,
  sigOptions,
  roleOptions,
  handleEditChange,
  updateStudent,
  cancelEdit,
}) {
  if (!isEditing) return null;

  return (
    isEditing && (
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
        )
  );
}
