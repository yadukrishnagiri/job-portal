import React, { useEffect, useMemo, useState } from 'react';
import { apiClient } from '../../utils/api';
import { Search, MapPin, Briefcase, Filter, DollarSign, Building2 } from 'lucide-react';

const StudentJobs = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    job_type: '',
    work_mode: '',
    salary_min: '',
    skills: '',
    sort_by: 'posted_at',
    order: 'DESC',
  });

  const jobTypes = ['full-time', 'part-time', 'internship', 'contract'];
  const workModes = ['remote', 'onsite', 'hybrid'];

  const fetchJobs = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {
        ...filters,
        salary_min: filters.salary_min ? Number(filters.salary_min) : undefined,
        page: 1,
        per_page: 20,
      };
      const res = await apiClient.get('/jobs/search', params);
      setJobs(res.jobs || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-100 p-6">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input name="keyword" value={filters.keyword} onChange={handleChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="Search by title or description" />
            </div>
          </div>
          <div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input name="location" value={filters.location} onChange={handleChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="Location" />
            </div>
          </div>
          <div>
            <select name="job_type" value={filters.job_type} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
              <option value="">Job Type</option>
              {jobTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <select name="work_mode" value={filters.work_mode} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
              <option value="">Work Mode</option>
              {workModes.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input type="number" name="salary_min" value={filters.salary_min} onChange={handleChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="Min Salary" />
            </div>
          </div>
          <div className="md:col-span-6 flex items-center gap-3">
            <button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700">Search</button>
            <button type="button" onClick={() => { setFilters({ keyword: '', location: '', job_type: '', work_mode: '', salary_min: '', skills: '', sort_by: 'posted_at', order: 'DESC' }); fetchJobs(); }} className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">Reset</button>
          </div>
        </form>
      </div>

      <div className="space-y-4">
        {loading && (
          <div className="flex items-center justify-center min-h-32">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600"></div>
          </div>
        )}
        {!loading && jobs.length === 0 && (
          <div className="text-center py-16 bg-white/60 rounded-2xl border border-purple-100">No jobs found</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-100 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Building2 className="h-4 w-4" />
                    <span>{job.company_name}</span>
                  </div>
                  <p className="text-gray-700 mb-3 line-clamp-3">{job.description}</p>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    {job.location && (<span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" />{job.location}</span>)}
                    {job.salary && (<span className="inline-flex items-center gap-1"><DollarSign className="h-4 w-4" />{job.salary.toLocaleString()}</span>)}
                    {job.job_type && (<span className="inline-flex items-center gap-1"><Briefcase className="h-4 w-4" />{job.job_type}</span>)}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-500">Posted {new Date(job.posted_at).toLocaleDateString()}</div>
                <a href={`/student/jobs/${job.id}`} className="text-purple-600 hover:text-purple-700 font-semibold">View</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentJobs;



