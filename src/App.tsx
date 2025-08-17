import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from './utils/auth';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StudentDashboard from './pages/student/Dashboard';
// Newly added pages
import StudentProfile from './pages/student/Profile.jsx';
import StudentJobs from './pages/student/Jobs.jsx';
import StudentApplications from './pages/student/Applications.jsx';
import StudentJobDetails from './pages/student/JobDetails.jsx';
import RecruiterDashboard from './pages/recruiter/Dashboard.jsx';
import RecruiterJobs from './pages/recruiter/Jobs.jsx';
import RecruiterPostJob from './pages/recruiter/PostJob.jsx';
import RecruiterProfile from './pages/recruiter/Profile.jsx';
import RecruiterJobApplications from './pages/recruiter/JobApplications.jsx';

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
        <Route 
          path="/student/profile" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <Layout>
                <StudentProfile />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/student/jobs" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <Layout>
                <StudentJobs />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/student/jobs/:jobId" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <Layout>
                <StudentJobDetails />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/student/applications" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <Layout>
                <StudentApplications />
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
                <RecruiterDashboard />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/recruiter/profile" 
          element={
            <ProtectedRoute allowedRoles={['recruiter']}>
              <Layout>
                <RecruiterProfile />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/recruiter/jobs" 
          element={
            <ProtectedRoute allowedRoles={['recruiter']}>
              <Layout>
                <RecruiterJobs />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/recruiter/jobs/:jobId/applications" 
          element={
            <ProtectedRoute allowedRoles={['recruiter']}>
              <Layout>
                <RecruiterJobApplications />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/recruiter/post-job" 
          element={
            <ProtectedRoute allowedRoles={['recruiter']}>
              <Layout>
                <RecruiterPostJob />
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