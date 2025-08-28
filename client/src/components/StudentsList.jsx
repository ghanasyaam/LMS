import React from "react";

export default function StudentsList({
    students,
    startEdit,
    deleteStudent
}){
    return(
        <div>
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent tracking-wide">
              ALL STUDENTS
            </h2>
            <div className="h-0.5 w-24 mx-auto bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full mt-3"></div>
          </div>
          
          {students.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 max-w-md mx-auto">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-500/20 to-pink-500/20 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-pink-400"></div>
                </div>
                <p className="text-cyan-300 text-lg font-medium">No students in database.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.map((s) => (
                <div
                  key={s._id}
                  className="group bg-black/40 backdrop-blur-xl border border-pink-500/20 rounded-2xl p-6 shadow-xl shadow-pink-500/10 hover:shadow-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-cyan-400 font-medium text-sm tracking-wider">ID:</span>
                      <span className="text-pink-300 font-mono text-sm bg-slate-800/50 px-2 py-1 rounded">
                        {s._id}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-cyan-400 font-medium">Name:</span>
                      <span className="text-white font-semibold">{s.name}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-cyan-400 font-medium">Roll:</span>
                      <span className="text-pink-300 font-mono">{s.rollno}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-cyan-400 font-medium">Email:</span>
                      <span className="text-purple-300 text-sm">{s.email}</span>
                    </div>

                    {s.phone && (
                      <div className="flex items-center space-x-2">
                        <span className="text-cyan-400 font-medium">Phone:</span>
                        <span className="text-green-300">{s.phone}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-cyan-400 font-medium">SIG:</span>
                      <span className="text-cyan-200">{s.sig}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-cyan-400 font-medium">Role:</span>
                      <span className="text-pink-200">{s.role}</span>
                    </div>

                    {s.createdAt && (
                      <div className="flex items-center space-x-2">
                        <span className="text-cyan-400 font-medium text-sm">Created:</span>
                        <span className="text-gray-300 text-sm">
                          {new Date(s.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-pink-500/20 space-y-3">
                    <button
                      onClick={() => startEdit(s)}
                      className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-lg shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/40 hover:shadow-xl transform hover:scale-105 transition-all duration-300 tracking-wide"
                    >
                      EDIT
                    </button>
                    <button
                      onClick={() => deleteStudent(s._id)}
                      className="w-full px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-lg shadow-lg shadow-red-500/25 hover:shadow-pink-500/40 hover:shadow-xl transform hover:scale-105 transition-all duration-300 tracking-wide"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
    )
}