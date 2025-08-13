from database.db import execute_query, get_db

class Application:
    @staticmethod
    def create_application(job_id, student_id, cover_letter=None):
        """Create job application"""
        query = """
        INSERT INTO applications (job_id, student_id, cover_letter)
        VALUES (?, ?, ?)
        """
        return execute_query(query, (job_id, student_id, cover_letter))
    
    @staticmethod
    def get_applications_by_job(job_id):
        """Get all applications for a job"""
        query = """
        SELECT a.*, sp.name, sp.phone, sp.education, sp.skills, sp.cv_filename, u.email
        FROM applications a
        JOIN student_profiles sp ON a.student_id = sp.user_id
        JOIN users u ON a.student_id = u.id
        WHERE a.job_id = ?
        ORDER BY a.applied_at DESC
        """
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute(query, (job_id,))
            return [dict(row) for row in cursor.fetchall()]
    
    @staticmethod
    def get_applications_by_student(student_id):
        """Get all applications by a student"""
        query = """
        SELECT a.*, j.title, j.description, j.location, j.salary, rp.company_name
        FROM applications a
        JOIN jobs j ON a.job_id = j.id
        JOIN recruiter_profiles rp ON j.recruiter_id = rp.user_id
        WHERE a.student_id = ?
        ORDER BY a.applied_at DESC
        """
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute(query, (student_id,))
            return [dict(row) for row in cursor.fetchall()]
    
    @staticmethod
    def check_application_exists(job_id, student_id):
        """Check if student has already applied to job"""
        query = "SELECT id FROM applications WHERE job_id = ? AND student_id = ?"
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute(query, (job_id, student_id))
            return cursor.fetchone() is not None
    
    @staticmethod
    def update_application_status(application_id, status):
        """Update application status"""
        query = "UPDATE applications SET status = ? WHERE id = ?"
        execute_query(query, (status, application_id))