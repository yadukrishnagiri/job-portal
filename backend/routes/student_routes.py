from flask import Blueprint, request, jsonify
from models.student_model import StudentProfile
from models.job_model import Job
from models.application_model import Application
from utils.auth import role_required
from utils.file_handler import save_cv_file, delete_cv_file

student_bp = Blueprint('student', __name__)

@student_bp.route('/profile', methods=['GET'])
@role_required('student')
def get_profile():
    try:
        user_id = request.current_user['user_id']
        profile = StudentProfile.get_profile_by_user_id(user_id)
        
        if not profile:
            return jsonify({'error': 'Profile not found'}), 404
        
        return jsonify({'profile': profile}), 200
    
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@student_bp.route('/profile', methods=['PUT'])
@role_required('student')
def update_profile():
    try:
        user_id = request.current_user['user_id']
        data = request.get_json()
        
        # Extract allowed fields
        allowed_fields = ['name', 'education', 'skills', 'location', 'expected_salary', 'bio', 'phone']
        update_data = {k: v for k, v in data.items() if k in allowed_fields and v is not None}
        
        if not update_data:
            return jsonify({'error': 'No valid fields to update'}), 400
        
        # Update profile
        success = StudentProfile.update_profile(user_id, **update_data)
        
        if not success:
            return jsonify({'error': 'Failed to update profile'}), 500
        
        # Get updated profile
        profile = StudentProfile.get_profile_by_user_id(user_id)
        
        return jsonify({
            'message': 'Profile updated successfully',
            'profile': profile
        }), 200
    
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@student_bp.route('/upload-cv', methods=['POST'])
@role_required('student')
def upload_cv():
    try:
        user_id = request.current_user['user_id']
        
        if 'cv' not in request.files:
            return jsonify({'error': 'No CV file provided'}), 400
        
        file = request.files['cv']
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Save new CV file
        filename = save_cv_file(file)
        if not filename:
            return jsonify({'error': 'Invalid file type or failed to save file'}), 400
        
        # Get current profile to delete old CV
        profile = StudentProfile.get_profile_by_user_id(user_id)
        if profile and profile['cv_filename']:
            delete_cv_file(profile['cv_filename'])
        
        # Update profile with new CV filename
        StudentProfile.update_cv_filename(user_id, filename)
        
        return jsonify({
            'message': 'CV uploaded successfully',
            'filename': filename
        }), 200
    
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@student_bp.route('/applications', methods=['GET'])
@role_required('student')
def get_applications():
    try:
        user_id = request.current_user['user_id']
        applications = Application.get_applications_by_student(user_id)
        
        return jsonify({'applications': applications}), 200
    
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@student_bp.route('/jobs/apply/<int:job_id>', methods=['POST'])
@role_required('student')
def apply_to_job(job_id):
    try:
        user_id = request.current_user['user_id']
        data = request.get_json() or {}
        
        # Check if job exists
        job = Job.get_job_by_id(job_id)
        if not job:
            return jsonify({'error': 'Job not found'}), 404
        
        # Check if student has already applied
        if Application.check_application_exists(job_id, user_id):
            return jsonify({'error': 'You have already applied to this job'}), 400
        
        # Create application
        cover_letter = data.get('cover_letter', '')
        application_id = Application.create_application(job_id, user_id, cover_letter)
        
        return jsonify({
            'message': 'Application submitted successfully',
            'application_id': application_id
        }), 201
    
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500