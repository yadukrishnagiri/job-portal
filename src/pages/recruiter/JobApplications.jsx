import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiClient } from '../../utils/api';

const statusOptions = ['pending', 'shortlisted', 'rejected', 'hired'];

const JobApplications = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [applications, setApplications] = useState([]);
  const [jobTitle, setJobTitle] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const [appsRes, jobRes] = await Promise.all([
        apiClient.get(`/recruiter/jobs/${jobId}/applications`),
        apiClient.get(`/jobs/${jobId}`),
      ]);
      setApplications(appsRes.applications || []);
      setJobTitle(jobRes.job?.title || '');
    } catch (err) {
      setError(err.message || 'Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [jobId]);

  const updateStatus = async (applicationId, status) => {
    try {
      await apiClient.put(`/recruiter/applications/${applicationId}/status`, { status });
      fetchData();
    } catch (err) {
      setError(err.message || 'Failed to update status');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Applications for: {jobTitle}</h1>
        <button onClick={() => navigate(-1)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Back</button>
      </div>

      {error && <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}

      {applications.length === 0 ? (
        <div className="text-center py-16 bg-white/60 rounded-2xl border border-purple-100">No applications yet</div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{app.name}</h3>
                  <div className="text-gray-600">{app.email}</div>
                  <div className="text-sm text-gray-600 mt-1">{app.education}</div>
                  <div className="text-sm text-gray-600">{app.skills}</div>
                  {app.cv_filename && (
                    <div className="mt-2">
                      <a href={`/uploads/${app.cv_filename}`} target="_blank" rel="noreferrer" className="text-purple-600 hover:text-purple-700 font-medium">View CV</a>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <select value={app.status} onChange={(e) => updateStatus(app.id, e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg">
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              {app.cover_letter && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 whitespace-pre-line">
                  {app.cover_letter}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobApplications;




