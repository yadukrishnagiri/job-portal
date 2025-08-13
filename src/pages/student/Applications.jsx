import React, { useEffect, useState } from 'react';
import { apiClient } from '../../utils/api';

const statusClasses = {
  pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  shortlisted: 'bg-blue-100 text-blue-700 border-blue-200',
  rejected: 'bg-red-100 text-red-700 border-red-200',
  hired: 'bg-green-100 text-green-700 border-green-200',
};

const Applications = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await apiClient.get('/student/applications');
      setApplications(res.applications || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-100 p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
          <button onClick={fetchApplications} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Refresh</button>
        </div>

        {error && <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}

        {applications.length === 0 ? (
          <div className="text-center py-16 bg-white/60 rounded-2xl border border-purple-100">No applications yet</div>
        ) : (
          <div className="space-y-4">
            {applications.map((application) => (
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
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${statusClasses[application.status] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </span>
                    <p className="text-sm text-gray-500 mt-2">Applied {new Date(application.applied_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;


