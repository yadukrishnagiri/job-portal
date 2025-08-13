from database.db import execute_query, get_db
from utils.auth import hash_password, verify_password

class User:
    @staticmethod
    def create_user(email, password, role):
        """Create a new user"""
        password_hash = hash_password(password)
        query = """
        INSERT INTO users (email, password_hash, role)
        VALUES (?, ?, ?)
        """
        return execute_query(query, (email, password_hash, role))
    
    @staticmethod
    def get_user_by_email(email):
        """Get user by email"""
        query = "SELECT * FROM users WHERE email = ?"
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute(query, (email,))
            row = cursor.fetchone()
            return dict(row) if row else None
    
    @staticmethod
    def get_user_by_id(user_id):
        """Get user by ID"""
        query = "SELECT * FROM users WHERE id = ?"
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute(query, (user_id,))
            row = cursor.fetchone()
            return dict(row) if row else None
    
    @staticmethod
    def authenticate_user(email, password):
        """Authenticate user with email and password"""
        user = User.get_user_by_email(email)
        if user and verify_password(password, user['password_hash']):
            return user
        return None