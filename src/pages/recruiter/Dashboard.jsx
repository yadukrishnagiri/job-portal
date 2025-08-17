import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../../utils/api';
import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  Clock, 
  Plus, 
  Eye,
  CheckCircle,
  XCircle,
  UserCheck,
  Calendar,
  MapPin,
  DollarSign
} from 'lucide-react';

const RecruiterDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    pendingApplications: 0,
    hiredApplications: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profileResponse, jobsResponse] = await Promise.all([
        apiClient.get('/recruiter/profile'),
        apiClient.get('/recruiter/jobs'),
      ]);
      
      setProfile(profileResponse.profile);
      setJobs(jobsResponse.jobs || []);
      
      // Calculate stats
      const totalJobs = jobsResponse.jobs?.length || 0;
      const totalApplications = jobsResponse.jobs?.reduce((sum, job) => sum + (job.application_count || 0), 0) || 0;
      
      setStats({
        totalJobs,
        totalApplications,
        pendingApplications: Math.floor(totalApplications * 0.6), // Mock data for demo
        hiredApplications: Math.floor(totalApplications * 0.15)
      });
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

  const statCards = [
    {
      title: 'Active Jobs',
      value: stats.totalJobs,
      icon: Briefcase,
      color: 'bg-blue-100 text-blue-600',
      bgColor: 'border-blue-100'
    },
    {
      title: 'Total Applications',
      value: stats.totalApplications,
      icon: Users,
      color: 'bg-green-100 text-green-600',
      bgColor: 'border-green-100'
    },
    {
      title: 'Pending Review',
      value: stats.pendingApplications,
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-600',
      bgColor: 'border-yellow-100'
    },
    {
      title: 'Hired',
      value: stats.hiredApplications,
      icon: UserCheck,
      color: 'bg-purple-100 text-purple-600',
      bgColor: 'border-purple-100'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-100 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {profile?.company_name || 'Recruiter'}!
            </h1>
            <p className="text-gray-600">Manage your job postings and review applications</p>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/recruiter/post-job"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Post New Job
            </Link>
            <Link
              to="/recruiter/profile"
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border ${stat.bgColor} p-6`}>
              <div className="flex items-center">
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/recruiter/post-job"
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
          >
            <Plus className="h-8 w-8 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Post New Job</h3>
            <p className="text-purple-100">Create a new job posting to attract talent</p>
          </Link>
          
          <Link
            to="/recruiter/jobs"
            className="bg-white border-2 border-blue-200 text-blue-600 p-6 rounded-xl hover:bg-blue-50 transition-all transform hover:scale-105"
          >
            <Briefcase className="h-8 w-8 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Manage Jobs</h3>
            <p className="text-blue-500">View and edit your active job postings</p>
          </Link>
          
          <Link
            to="/recruiter/profile"
            className="bg-white border-2 border-green-200 text-green-600 p-6 rounded-xl hover:bg-green-50 transition-all transform hover:scale-105"
          >
            <TrendingUp className="h-8 w-8 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Company Profile</h3>
            <p className="text-green-500">Update your company information</p>
          </Link>
        </div>
      </div>

      {/* Recent Jobs */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-100 p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Job Posts</h2>
          <Link
            to="/recruiter/jobs"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            View All Jobs
          </Link>
        </div>

        {jobs.length > 0 ? (
          <div className="space-y-4">
            {jobs.slice(0, 3).map((job) => (
              <div key={job.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{job.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                      {job.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                      )}
                      {job.salary && (
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          ${job.salary.toLocaleString()}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Posted {new Date(job.posted_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                        {job.application_count || 0} Applications
                      </span>
                      {job.is_active ? (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Active
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full flex items-center gap-1">
                          <XCircle className="h-3 w-3" />
                          Inactive
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-6">
                    <Link
                      to={`/recruiter/jobs/${job.id}/applications`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
                    >
                      <Eye className="h-4 w-4" />
                      View Applications
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs posted yet</h3>
            <p className="text-gray-600 mb-6">Start by creating your first job posting to attract talented candidates</p>
            <Link
              to="/recruiter/post-job"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              <Plus className="h-5 w-5" />
              Post Your First Job
            </Link>
          </div>
        )}
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border border-purple-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 Recruiter Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/70 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Write Clear Job Descriptions</h3>
            <p className="text-gray-600 text-sm">Include specific requirements, responsibilities, and benefits to attract the right candidates.</p>
          </div>
          <div className="bg-white/70 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Respond Quickly</h3>
            <p className="text-gray-600 text-sm">Fast response times improve candidate experience and your company's reputation.</p>
          </div>
          <div className="bg-white/70 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Use Competitive Salaries</h3>
            <p className="text-gray-600 text-sm">Research market rates and offer competitive compensation to attract top talent.</p>
          </div>
          <div className="bg-white/70 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Keep Your Profile Updated</h3>
            <p className="text-gray-600 text-sm">An up-to-date company profile builds trust with potential candidates.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;