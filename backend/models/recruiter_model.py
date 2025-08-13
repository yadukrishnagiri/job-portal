from database.db import execute_query, get_db

class RecruiterProfile:
    @staticmethod
    def create_profile(user_id, company_name, company_description=None, 
                      location=None, contact_person=None, phone=None, website=None):
        """Create recruiter profile"""
        query = """
        INSERT INTO recruiter_profiles 
        (user_id, company_name, company_description, location, contact_person, phone, website)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """
        return execute_query(query, (user_id, company_name, company_description, 
                                   location, contact_person, phone, website))
    
    @staticmethod
    def get_profile_by_user_id(user_id):
        """Get recruiter profile by user ID"""
        query = "SELECT * FROM recruiter_profiles WHERE user_id = ?"
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute(query, (user_id,))
            row = cursor.fetchone()
            return dict(row) if row else None
    
    @staticmethod
    def update_profile(user_id, **kwargs):
        """Update recruiter profile"""
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
        
        query = f"UPDATE recruiter_profiles SET {', '.join(fields)} WHERE user_id = ?"
        execute_query(query, values)
        return True