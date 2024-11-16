import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SuperAdminDashboard from './pages/superadmin/superadminView';
import AdminView from './pages/admin/adminView';
import Login from './login';

import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/superadmin" element={<SuperAdminDashboard />} />
        <Route path="/admin" element={<AdminView />} />
      </Routes>
    </Router>
  );
}

export default App
