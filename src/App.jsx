import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminProperties from './pages/admin/Properties';
import AdminInquiries from './pages/admin/Inquiries';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="properties" element={<Properties />} />
          <Route path="properties/:id" element={<PropertyDetails />} />
          <Route path="admin/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="admin/dashboard" element={<Dashboard />} />
            <Route path="admin/properties" element={<AdminProperties />} />
            <Route path="admin/inquiries" element={<AdminInquiries />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
