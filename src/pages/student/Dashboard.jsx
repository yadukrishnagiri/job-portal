import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../../utils/api';
import { User, FileText, Briefcase, MapPin, DollarSign, Upload, Edit, CheckCircle } from 'lucide-react';

const StudentDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profileResponse, applicationsResponse] = await Promise.all([
        apiClient.get('/student/profile'),
        apiClient.get('/student/applications'),
      ]);
      
      setProfile(profileResponse.profile);
      setApplications(applicationsResponse.applications);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'shortlisted': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      case 'hired': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-100 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {profile?.name}!</h1>
            <p className="text-gray-600">Manage your profile and track your job applications</p>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/student/jobs"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
            >
              Find Jobs
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-100 p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 rounded-lg p-3">
              <Briefcase className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
              <p className="text-gray-600">Total Applications</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-blue-100 p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-lg p-3">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {applications.filter(app => app.status === 'shortlisted').length}
              </p>
              <p className="text-gray-600">Shortlisted</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-teal-100 p-6">
          <div className="flex items-center">
            <div className="bg-teal-100 rounded-lg p-3">
              <User className="h-6 w-6 text-teal-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {profile?.cv_filename ? '100%' : '80%'}
              </p>
              <p className="text-gray-600">Profile Complete</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Overview */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-100 p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Profile Overview</h2>
          <Link
            to="/student/profile"
            className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium"
          >
            <Edit className="h-4 w-4" />
            <span>Edit Profile</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-medium text-gray-900">{profile?.name || 'Not set'}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <FileText className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Education</p>
              <p className="font-medium text-gray-900">{profile?.education || 'Not set'}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Location</p>
              <p className="font-medium text-gray-900">{profile?.location || 'Not set'}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <DollarSign className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Expected Salary</p>
              <p className="font-medium text-gray-900">
                {profile?.expected_salary ? `$${profile.expected_salary.toLocaleString()}` : 'Not set'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Upload className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">CV</p>
              <p className="font-medium text-gray-900">
                {profile?.cv_filename ? 'Uploaded' : 'Not uploaded'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Briefcase className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Skills</p>
              <p className="font-medium text-gray-900">{profile?.skills || 'Not set'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-100 p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Applications</h2>
          <Link
            to="/student/applications"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            View All
          </Link>
        </div>

        {applications.length > 0 ? (
          <div className="space-y-4">
            {applications.slice(0, 3).map((application) => (
              <div key={application.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{application.title}</h3>
                    <p className="text-gray-600 mb-2">{application.company_name}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{application.location}</span>
                      {application.salary && <span>${application.salary.toLocaleString()}</span>}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(application.status)}`}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </span>
                    <p className="text-sm text-gray-500 mt-2">
                      Applied {new Date(application.applied_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No applications yet</p>
            <Link
              to="/student/jobs"
              className="inline-block mt-2 text-purple-600 hover:text-purple-700 font-medium"
            >
              Browse Jobs
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;