from flask import Blueprint, request, jsonify
from models.recruiter_model import RecruiterProfile
from models.job_model import Job
from models.application_model import Application
from utils.auth import role_required

recruiter_bp = Blueprint('recruiter', __name__)

@recruiter_bp.route('/profile', methods=['GET'])
@role_required('recruiter')
def get_profile():
    try:
        user_id = request.current_user['user_id']
        profile = RecruiterProfile.get_profile_by_user_id(user_id)
        
        if not profile:
            return jsonify({'error': 'Profile not found'}), 404
        
        return jsonify({'profile': profile}), 200
    
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@recruiter_bp.route('/profile', methods=['PUT'])
@role_required('recruiter')
def update_profile():
    try:
        user_id = request.current_user['user_id']
        data = request.get_json()
        
        # Extract allowed fields
        allowed_fields = ['company_name', 'company_description', 'location', 'contact_person', 'phone', 'website']
        update_data = {k: v for k, v in data.items() if k in allowed_fields and v is not None}
        
        if not update_data:
            return jsonify({'error': 'No valid fields to update'}), 400
        
        # Update profile
        success = RecruiterProfile.update_profile(user_id, **update_data)
        
        if not success:
            return jsonify({'error': 'Failed to update profile'}), 500
        
        # Get updated profile
        profile = RecruiterProfile.get_profile_by_user_id(user_id)
        
        return jsonify({
            'message': 'Profile updated successfully',
            'profile': profile
        }), 200
    
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@recruiter_bp.route('/jobs', methods=['POST'])
@role_required('recruiter')
def create_job():
    try:
        user_id = request.current_user['user_id']
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['title', 'description']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Extract job data
        title = data['title']
        description = data['description']
        skills_required = data.get('skills_required', '')
        location = data.get('location', '')
        salary = data.get('salary')
        work_mode = data.get('work_mode')
        job_type = data.get('job_type')
        deadline = data.get('deadline')
        
        # Create job
        job_id = Job.create_job(
            user_id, title, description, skills_required, 
            location, salary, work_mode, job_type, deadline
        )
        
        return jsonify({
            'message': 'Job posted successfully',
            'job_id': job_id
        }), 201
    
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@recruiter_bp.route('/jobs', methods=['GET'])
@role_required('recruiter')
def get_my_jobs():
    try:
        user_id = request.current_user['user_id']
        jobs = Job.get_jobs_by_recruiter(user_id)
        
        return jsonify({'jobs': jobs}), 200
    
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@recruiter_bp.route('/jobs/<int:job_id>', methods=['PUT'])
@role_required('recruiter')
def update_job(job_id):
    try:
        user_id = request.current_user['user_id']
        data = request.get_json()
        
        # Check if job belongs to the recruiter
        job = Job.get_job_by_id(job_id)
        if not job or job['recruiter_id'] != user_id:
            return jsonify({'error': 'Job not found or access denied'}), 404
        
        # Extract allowed fields
        allowed_fields = ['title', 'description', 'skills_required', 'location', 
                         'salary', 'work_mode', 'job_type', 'deadline']
        update_data = {k: v for k, v in data.items() if k in allowed_fields and v is not None}
        
        if not update_data:
            return jsonify({'error': 'No valid fields to update'}), 400
        
        # Update job
        success = Job.update_job(job_id, **update_data)
        
        if not success:
            return jsonify({'error': 'Failed to update job'}), 500
        
        return jsonify({'message': 'Job updated successfully'}), 200
    
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@recruiter_bp.route('/jobs/<int:job_id>', methods=['DELETE'])
@role_required('recruiter')
def delete_job(job_id):
    try:
        user_id = request.current_user['user_id']
        
        # Check if job belongs to the recruiter
        job = Job.get_job_by_id(job_id)
        if not job or job['recruiter_id'] != user_id:
            return jsonify({'error': 'Job not found or access denied'}), 404
        
        # Delete job (soft delete)
        Job.delete_job(job_id, user_id)
        
        return jsonify({'message': 'Job deleted successfully'}), 200
    
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@recruiter_bp.route('/jobs/<int:job_id>/applications', methods=['GET'])
@role_required('recruiter')
def get_job_applications(job_id):
    try:
        user_id = request.current_user['user_id']
        
        # Check if job belongs to the recruiter
        job = Job.get_job_by_id(job_id)
        if not job or job['recruiter_id'] != user_id:
            return jsonify({'error': 'Job not found or access denied'}), 404
        
        # Get applications
        applications = Application.get_applications_by_job(job_id)
        
        return jsonify({'applications': applications}), 200
    
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@recruiter_bp.route('/applications/<int:application_id>/status', methods=['PUT'])
@role_required('recruiter')
def update_application_status(application_id):
    try:
        data = request.get_json()
        
        if 'status' not in data:
            return jsonify({'error': 'Status is required'}), 400
        
        status = data['status']
        valid_statuses = ['pending', 'shortlisted', 'rejected', 'hired']
        
        if status not in valid_statuses:
            return jsonify({'error': 'Invalid status'}), 400
        
        # Update application status
        Application.update_application_status(application_id, status)
        
        return jsonify({'message': 'Application status updated successfully'}), 200
    
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500