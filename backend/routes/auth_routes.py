from flask import Blueprint, request, jsonify
from models.user_model import User
from models.student_model import StudentProfile
from models.recruiter_model import RecruiterProfile
from utils.auth import generate_token
import re

auth_bp = Blueprint('auth', __name__)

def validate_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

@auth_bp.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['email', 'password', 'role']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'error': f'{field} is required'}), 400
        
        email = data['email'].lower().strip()
        password = data['password']
        role = data['role']
        
        # Validate email format
        if not validate_email(email):
            return jsonify({'error': 'Invalid email format'}), 400
        
        # Validate password length
        if len(password) < 6:
            return jsonify({'error': 'Password must be at least 6 characters long'}), 400
        
        # Validate role
        if role not in ['student', 'recruiter']:
            return jsonify({'error': 'Invalid role'}), 400
        
        # Check if user already exists
        existing_user = User.get_user_by_email(email)
        if existing_user:
            return jsonify({'error': 'User already exists'}), 400
        
        # Create user
        user_id = User.create_user(email, password, role)
        
        # Create initial profile based on role
        if role == 'student':
            name = data.get('name', '')
            if not name:
                return jsonify({'error': 'Name is required for students'}), 400
            StudentProfile.create_profile(user_id, name)
        else:  # recruiter
            company_name = data.get('company_name', '')
            if not company_name:
                return jsonify({'error': 'Company name is required for recruiters'}), 400
            RecruiterProfile.create_profile(user_id, company_name)
        
        # Generate token
        token = generate_token(user_id, role)
        
        return jsonify({
            'message': 'User created successfully',
            'token': token,
            'user': {
                'id': user_id,
                'email': email,
                'role': role
            }
        }), 201
    
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email and password are required'}), 400
        
        email = data['email'].lower().strip()
        password = data['password']
        
        # Authenticate user
        user = User.authenticate_user(email, password)
        if not user:
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Generate token
        token = generate_token(user['id'], user['role'])
        
        return jsonify({
            'message': 'Login successful',
            'token': token,
            'user': {
                'id': user['id'],
                'email': user['email'],
                'role': user['role']
            }
        }), 200
    
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500