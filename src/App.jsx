import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from './utils/auth';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StudentDashboard from './pages/student/Dashboard';

function App() {
  const authenticated = isAuthenticated();
  const userRole = getUserRole();

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route 
          path="/login" 
          element={authenticated ? (
            <Navigate to={userRole === 'student' ? '/student/dashboard' : '/recruiter/dashboard'} replace />
          ) : (
            <Login />
          )} 
        />
        <Route 
          path="/signup" 
          element={authenticated ? (
            <Navigate to={userRole === 'student' ? '/student/dashboard' : '/recruiter/dashboard'} replace />
          ) : (
            <Signup />
          )} 
        />
        
        {/* Student routes */}
        <Route 
          path="/student/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <Layout>
                <StudentDashboard />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        {/* Recruiter routes */}
        <Route 
          path="/recruiter/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['recruiter']}>
              <Layout>
                <div className="text-center py-20">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">Recruiter Dashboard</h1>
                  <p className="text-xl text-gray-600">Welcome to your recruiter dashboard!</p>
                </div>
              </Layout>
            </ProtectedRoute>
          } 
        />

        {/* Unauthorized page */}
        <Route 
          path="/unauthorized" 
          element={
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Access Denied</h1>
                <p className="text-xl text-gray-600 mb-8">You don't have permission to access this page.</p>
                <button
                  onClick={() => window.history.back()}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
                >
                  Go Back
                </button>
              </div>
            </div>
          } 
        />

        {/* Catch all route */}
        <Route 
          path="*" 
          element={
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
                <p className="text-xl text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
                <a
                  href="/"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
                >
                  Go Home
                </a>
              </div>
            </div>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;