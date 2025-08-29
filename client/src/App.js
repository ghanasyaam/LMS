import './App.css';
import StudentsApp from './components/student/StudentsApp';
import AttendancePage from './components/attendance/attendancePage';

function App() {
  return (
    <div className="App">
      <StudentsApp/>
      <AttendancePage/>
    </div>
  );
}

export default App;