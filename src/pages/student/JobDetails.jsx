import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiClient } from '../../utils/api';
import { Building2, MapPin, DollarSign, Briefcase } from 'lucide-react';

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [job, setJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await apiClient.get(`/jobs/${jobId}`);
        setJob(res.job);
      } catch (err) {
        setError(err.message || 'Failed to load job');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId]);

  const applyToJob = async () => {
    setError('');
    setSuccess('');
    try {
      await apiClient.post(`/student/jobs/apply/${jobId}`, { cover_letter: coverLetter });
      setSuccess('Application submitted successfully');
      setCoverLetter('');
    } catch (err) {
      setError(err.message || 'Failed to apply');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!job) {
    return <div className="text-center py-16">Job not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-100 p-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
            <div className="flex items-center gap-3 text-gray-600 mb-2">
              <Building2 className="h-5 w-5" />
              <span>{job.company_name}</span>
            </div>
            <div className="flex flex-wrap gap-4 text-gray-600">
              {job.location && (<span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" />{job.location}</span>)}
              {job.salary && (<span className="inline-flex items-center gap-1"><DollarSign className="h-4 w-4" />{job.salary.toLocaleString()}</span>)}
              {job.job_type && (<span className="inline-flex items-center gap-1"><Briefcase className="h-4 w-4" />{job.job_type}</span>)}
            </div>
          </div>
        </div>

        <div className="prose max-w-none mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">About the role</h2>
          <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
        </div>

        <div className="mt-8">
          {error && <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}
          {success && <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">{success}</div>}

          <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter (optional)</label>
          <textarea value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="Write a brief cover letter" />

          <div className="mt-4 flex items-center gap-3">
            <button onClick={applyToJob} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700">Apply Now</button>
            <button onClick={() => navigate(-1)} className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">Back</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;


