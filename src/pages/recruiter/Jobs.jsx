import React, { useEffect, useState } from 'react';
import { apiClient } from '../../utils/api';
import { Briefcase, Edit, Trash2 } from 'lucide-react';

const RecruiterJobs = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await apiClient.get('/recruiter/jobs');
      setJobs(res.jobs || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  const deleteJob = async (jobId) => {
    if (!confirm('Delete this job?')) return;
    try {
      await apiClient.delete(`/recruiter/jobs/${jobId}`);
      fetchJobs();
    } catch (err) {
      setError(err.message || 'Failed to delete job');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Job Posts</h1>
        <a href="/recruiter/post-job" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700">Post New Job</a>
      </div>

      {error && <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}

      {loading ? (
        <div className="flex items-center justify-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-16 bg-white/60 rounded-2xl border border-purple-100">No jobs posted yet</div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
                  <div className="text-gray-600">Applications: {job.application_count || 0}</div>
                </div>
                <div className="flex items-center gap-3">
                  <a href={`/recruiter/jobs/${job.id}/applications`} className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                    <Briefcase className="h-4 w-4" /> View Applications
                  </a>
                  <button onClick={() => deleteJob(job.id)} className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-red-50 text-red-600">
                    <Trash2 className="h-4 w-4" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecruiterJobs;


