import React, { useState, useEffect, useMemo } from 'react';

const Card = ({ children, className = '' }) => (
  <div className={`bg-black border-2 border-yellow-400 rounded-2xl p-8 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, variant = 'primary', type = 'button', disabled = false }) => {
  const baseClasses = "px-8 py-3 font-['Orbitron'] font-bold text-base rounded-lg cursor-pointer transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: 'bg-yellow-400 text-black hover:bg-white',
    secondary: 'bg-black text-white border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black',
  };
  return (
    <button type={type} onClick={onClick} className={`${baseClasses} ${variants[variant]}`} disabled={disabled}>
      {children}
    </button>
  );
};

// --- Main App Component ---

export default function AttendancePage() {
  // --- State Management ---
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSig, setSelectedSig] = useState('All');
  const [attendanceData, setAttendanceData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // --- Constants & Memos ---
  const STUDENTS_API_URL = process.env.REACT_APP_STUDENTS_API_URL;
const ATTENDANCE_API_URL = process.env.REACT_APP_ATTENDANCE_API_URL;
  
  const today = useMemo(() => new Date(), []);
  const formattedDate = today.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  
  const sigs = useMemo(() => {
      if (!students || students.length === 0) return ['All'];
      return ['All', ...new Set(students.map(s => s.sig))]
    }, [students]);

  const filteredStudents = useMemo(() => {
    if (selectedSig === 'All') return students;
    return students.filter(s => s.sig === selectedSig);
  }, [students, selectedSig]);

  // --- Effects ---
  useEffect(() => {
    const fetchStudents = async () => {
        try {
            // Fetch from your actual student API endpoint
            const response = await fetch(STUDENTS_API_URL);
            if (!response.ok) throw new Error('Could not fetch students. Make sure the API is running.');
            const data = await response.json();
            setStudents(data);

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    fetchStudents();
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    const initialData = {};
    if (students && students.length > 0) {
        students.forEach(student => {
          initialData[student._id] = 'present';
        });
        setAttendanceData(initialData);
    }
  }, [students]);

  // --- Event Handlers ---
  const handleStatusChange = (studentId, status) => {
    setAttendanceData(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSubmitAll = async () => {
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage('');
    const recordsToSubmit = filteredStudents.map(student => ({
      student_id: student._id,
      date: today.toISOString(),
      status: attendanceData[student._id],
    }));

    try {
      const submissionPromises = recordsToSubmit.map(record => {
        return fetch(ATTENDANCE_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(record)
        });
      });
      const responses = await Promise.all(submissionPromises);
      if (responses.some(res => !res.ok)) throw new Error('Some records failed to submit.');
      setSuccessMessage(`Successfully submitted for ${filteredStudents.length} students.`);
    } catch (err) {
      console.error("Submission error:", err);
      setError("Failed to submit attendance. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Render ---
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap');`}</style>
      <div className="bg-black min-h-screen p-6 font-['Orbitron'] text-white">
        <header className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-bold text-yellow-400 tracking-wider mb-4">ATTENDANCE</h1>
          <div className="h-1 w-32 mx-auto bg-yellow-400"></div>
        </header>

        <main className="container mx-auto">
          <Card>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-yellow-400 tracking-wider">MARK RECORDS</h2>
                <p className="text-gray-400 mt-1">{formattedDate}</p>
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="sigFilter" className="font-bold">SIG:</label>
                <select
                  id="sigFilter"
                  value={selectedSig}
                  onChange={(e) => setSelectedSig(e.target.value)}
                  className="w-full md:w-auto p-3 bg-black border-2 border-yellow-400 rounded-lg text-white font-['Orbitron'] text-base focus:outline-none focus:border-white transition-colors"
                >
                  {sigs.map(sig => <option key={sig} value={sig} className="bg-black text-white">{sig}</option>)}
                </select>
              </div>
            </div>

            {error && <div className="mb-6 p-4 bg-[#330000] border-2 border-red-500 rounded-lg text-red-500 text-center">{error}</div>}
            {successMessage && <div className="mb-6 p-4 bg-green-900 bg-opacity-50 border-2 border-green-500 rounded-lg text-green-400 text-center">{successMessage}</div>}

            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="text-center py-10 text-yellow-400">Loading Students...</div>
              ) : (
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-bold text-yellow-400 uppercase tracking-widest">Student Name</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-yellow-400 uppercase tracking-widest">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map(student => (
                      <tr key={student._id} className="border-t border-gray-800">
                        <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-white">{student.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-x-6">
                            {['present', 'absent', 'late'].map(status => (
                              <label key={status} className="flex items-center gap-x-2 cursor-pointer">
                                <input
                                  type="radio"
                                  name={`status-${student._id}`}
                                  value={status}
                                  checked={attendanceData[student._id] === status}
                                  onChange={() => handleStatusChange(student._id, status)}
                                  className="h-4 w-4 accent-yellow-400 bg-black border-yellow-400 focus:ring-yellow-400"
                                />
                                <span className="capitalize text-base text-gray-300">{status}</span>
                              </label>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            
            <div className="mt-8 flex justify-end">
              <Button onClick={handleSubmitAll} disabled={isSubmitting || isLoading || filteredStudents.length === 0}>
                {isSubmitting ? 'SUBMITTING...' : `SUBMIT FOR ${selectedSig.toUpperCase()} SIG`}
              </Button>
            </div>
          </Card>
        </main>
      </div>
    </>
  );
}

