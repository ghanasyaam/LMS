import React from "react";

export default function AddStudentForm({
  form,
  errors,
  sigOptions,
  roleOptions,
  handleChange,
  addStudent,
}) {
  return (
    <div className="mb-16">
          <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8 shadow-2xl shadow-cyan-500/20">
            <h3 className="text-2xl font-bold text-cyan-300 mb-6 text-center tracking-wide">ADD NEW STUDENT</h3>
            
            {errors.submit && (
              <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg">
                <p className="text-red-400 text-center">{errors.submit}</p>
              </div>
            )}

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Name Field */}
                <div className="relative group">
                  <input
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-slate-800/50 border ${errors.name ? 'border-red-500' : 'border-cyan-500/30'} rounded-lg text-cyan-100 placeholder-cyan-400/60 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300 hover:border-cyan-400/50`}
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                
                {/* Roll Number Field */}
                <div className="relative group">
                  <input
                    name="rollno"
                    placeholder="Roll No (AM.SC.U4CSE23029)"
                    value={form.rollno}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-slate-800/50 border ${errors.rollno ? 'border-red-500' : 'border-cyan-500/30'} rounded-lg text-cyan-100 placeholder-cyan-400/60 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300 hover:border-cyan-400/50`}
                  />
                  {errors.rollno && <p className="text-red-400 text-sm mt-1">{errors.rollno}</p>}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                
                {/* Email Field */}
                <div className="relative group">
                  <input
                    name="email"
                    placeholder="Email (am.sc.u4cse23029@am.students.amrita.edu)"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-slate-800/50 border ${errors.email ? 'border-red-500' : 'border-cyan-500/30'} rounded-lg text-cyan-100 placeholder-cyan-400/60 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300 hover:border-cyan-400/50`}
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                {/* Phone Field */}
                <div className="relative group">
                  <input
                    name="phone"
                    placeholder="Phone (10-digit number)"
                    value={form.phone}
                    onChange={handleChange}
                    maxLength="10"
                    className={`w-full px-4 py-3 bg-slate-800/50 border ${errors.phone ? 'border-red-500' : 'border-cyan-500/30'} rounded-lg text-cyan-100 placeholder-cyan-400/60 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300 hover:border-cyan-400/50`}
                  />
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                {/* Password Field */}
                <div className="relative group">
                  <input
                    name="password"
                    type="password"
                    placeholder="Password (min 6 characters)"
                    value={form.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-slate-800/50 border ${errors.password ? 'border-red-500' : 'border-cyan-500/30'} rounded-lg text-cyan-100 placeholder-cyan-400/60 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300 hover:border-cyan-400/50`}
                  />
                  {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                
                {/* SIG Field */}
                <div className="relative group">
                  <select
                    name="sig"
                    value={form.sig}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-slate-800/50 border ${errors.sig ? 'border-red-500' : 'border-cyan-500/30'} rounded-lg text-cyan-100 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300 hover:border-cyan-400/50`}
                  >
                    <option value="" className="bg-slate-800 text-cyan-400">Select SIG</option>
                    {sigOptions.map(sig => (
                      <option key={sig} value={sig} className="bg-slate-800 text-cyan-100">{sig}</option>
                    ))}
                  </select>
                  {errors.sig && <p className="text-red-400 text-sm mt-1">{errors.sig}</p>}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                
                {/* Role Field */}
                <div className="relative group">
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-slate-800/50 border ${errors.role ? 'border-red-500' : 'border-cyan-500/30'} rounded-lg text-cyan-100 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300 hover:border-cyan-400/50`}
                  >
                    <option value="" className="bg-slate-800 text-cyan-400">Select Role</option>
                    {roleOptions.map(role => (
                      <option key={role} value={role} className="bg-slate-800 text-cyan-100">{role}</option>
                    ))}
                  </select>
                  {errors.role && <p className="text-red-400 text-sm mt-1">{errors.role}</p>}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
              
              <div className="flex justify-center pt-4">
                <button
                  onClick={addStudent}
                  className="relative px-8 py-3 bg-gradient-to-r from-cyan-600 to-pink-600 text-white font-bold rounded-lg shadow-lg shadow-cyan-500/25 hover:shadow-pink-500/40 hover:shadow-xl transform hover:scale-105 transition-all duration-300 tracking-wide"
                >
                  <span className="relative z-10">ADD STUDENT</span>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-pink-600 to-cyan-600 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
  );
}
