from database.db import execute_query, get_db

class Job:
    @staticmethod
    def create_job(recruiter_id, title, description, skills_required=None, 
                   location=None, salary=None, work_mode=None, job_type=None, deadline=None):
        """Create a new job posting"""
        query = """
        INSERT INTO jobs 
        (recruiter_id, title, description, skills_required, location, salary, work_mode, job_type, deadline)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """
        return execute_query(query, (recruiter_id, title, description, skills_required, 
                                   location, salary, work_mode, job_type, deadline))
    
    @staticmethod
    def get_job_by_id(job_id):
        """Get job by ID with recruiter info"""
        query = """
        SELECT j.*, rp.company_name, rp.company_description
        FROM jobs j
        JOIN recruiter_profiles rp ON j.recruiter_id = rp.user_id
        WHERE j.id = ? AND j.is_active = 1
        """
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute(query, (job_id,))
            row = cursor.fetchone()
            return dict(row) if row else None
    
    @staticmethod
    def search_jobs(keyword=None, location=None, job_type=None, work_mode=None, 
                   salary_min=None, skills=None, sort_by='posted_at', order='DESC', 
                   page=1, per_page=20):
        """Search jobs with filters"""
        offset = (page - 1) * per_page
        
        # Base query
        query = """
        SELECT j.*, rp.company_name, rp.company_description
        FROM jobs j
        JOIN recruiter_profiles rp ON j.recruiter_id = rp.user_id
        WHERE j.is_active = 1
        """
        
        params = []
        
        # Add filters
        if keyword:
            query += " AND (j.title LIKE ? OR j.description LIKE ?)"
            params.extend([f"%{keyword}%", f"%{keyword}%"])
        
        if location:
            query += " AND j.location LIKE ?"
            params.append(f"%{location}%")
        
        if job_type:
            query += " AND j.job_type = ?"
            params.append(job_type)
        
        if work_mode:
            query += " AND j.work_mode = ?"
            params.append(work_mode)
        
        if salary_min:
            query += " AND j.salary >= ?"
            params.append(salary_min)
        
        if skills:
            query += " AND j.skills_required LIKE ?"
            params.append(f"%{skills}%")
        
        # Add sorting
        valid_sort_fields = ['posted_at', 'salary', 'title']
        if sort_by not in valid_sort_fields:
            sort_by = 'posted_at'
        
        if order.upper() not in ['ASC', 'DESC']:
            order = 'DESC'
        
        query += f" ORDER BY j.{sort_by} {order}"
        query += " LIMIT ? OFFSET ?"
        params.extend([per_page, offset])
        
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute(query, params)
            return [dict(row) for row in cursor.fetchall()]
    
    @staticmethod
    def get_jobs_by_recruiter(recruiter_id):
        """Get all jobs posted by a recruiter"""
        query = """
        SELECT j.*, COUNT(a.id) as application_count
        FROM jobs j
        LEFT JOIN applications a ON j.id = a.job_id
        WHERE j.recruiter_id = ?
        GROUP BY j.id
        ORDER BY j.posted_at DESC
        """
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute(query, (recruiter_id,))
            return [dict(row) for row in cursor.fetchall()]
    
    @staticmethod
    def update_job(job_id, **kwargs):
        """Update job posting"""
        fields = []
        values = []
        
        for field, value in kwargs.items():
            if value is not None:
                fields.append(f"{field} = ?")
                values.append(value)
        
        if not fields:
            return False
        
        values.append(job_id)
        query = f"UPDATE jobs SET {', '.join(fields)} WHERE id = ?"
        execute_query(query, values)
        return True
    
    @staticmethod
    def delete_job(job_id, recruiter_id):
        """Delete job (soft delete by setting is_active to 0)"""
        query = "UPDATE jobs SET is_active = 0 WHERE id = ? AND recruiter_id = ?"
        execute_query(query, (job_id, recruiter_id))