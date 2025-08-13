from database.db import execute_query, get_db

class StudentProfile:
    @staticmethod
    def create_profile(user_id, name, education=None, skills=None, location=None, 
                      expected_salary=None, bio=None, phone=None):
        """Create student profile"""
        query = """
        INSERT INTO student_profiles 
        (user_id, name, education, skills, location, expected_salary, bio, phone)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """
        return execute_query(query, (user_id, name, education, skills, location, 
                                   expected_salary, bio, phone))
    
    @staticmethod
    def get_profile_by_user_id(user_id):
        """Get student profile by user ID"""
        query = "SELECT * FROM student_profiles WHERE user_id = ?"
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute(query, (user_id,))
            row = cursor.fetchone()
            return dict(row) if row else None
    
    @staticmethod
    def update_profile(user_id, **kwargs):
        """Update student profile"""
        fields = []
        values = []
        
        for field, value in kwargs.items():
            if value is not None:
                fields.append(f"{field} = ?")
                values.append(value)
        
        if not fields:
            return False
        
        fields.append("updated_at = CURRENT_TIMESTAMP")
        values.append(user_id)
        
        query = f"UPDATE student_profiles SET {', '.join(fields)} WHERE user_id = ?"
        execute_query(query, values)
        return True
    
    @staticmethod
    def update_cv_filename(user_id, cv_filename):
        """Update CV filename for student"""
        query = "UPDATE student_profiles SET cv_filename = ? WHERE user_id = ?"
        execute_query(query, (cv_filename, user_id))