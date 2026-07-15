import EmployeeDirectory from './pages/EmployeeDirectory.jsx';
import { Routes, Route } from 'react-router-dom';
import EmployeeDetails from './components/EmployeeDetails.jsx';

function App() {
  return (
    <main className="app">
    
      <Routes>
        <Route path="/" element={<EmployeeDirectory />} />
        <Route path="/employees/:id" element={<EmployeeDetails />} />
      </Routes>
      
    </main>
  );
}

export default App;
