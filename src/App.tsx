import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SuperAdminDashboard from './pages/superadmin/superadminView';
import AdminView from './pages/admin/adminView';
import Login from './login';

import './App.css'
import AuthCallback from './handlers/AuthCallback';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/superadmin" element={<SuperAdminDashboard />} />
        <Route path="/admin" element={<AdminView />} />
        <Route path='/auth/google/callback' element={<AuthCallback />} />
      </Routes>
    </Router>
  );
}

export default App
