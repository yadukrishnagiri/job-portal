from flask import Blueprint, request, jsonify
from models.job_model import Job

job_bp = Blueprint('job', __name__)

@job_bp.route('/search', methods=['GET'])
def search_jobs():
    try:
        # Get search parameters
        keyword = request.args.get('keyword', '')
        location = request.args.get('location', '')
        job_type = request.args.get('job_type', '')
        work_mode = request.args.get('work_mode', '')
        salary_min = request.args.get('salary_min', type=int)
        skills = request.args.get('skills', '')
        sort_by = request.args.get('sort_by', 'posted_at')
        order = request.args.get('order', 'DESC')
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        
        # Limit per_page to prevent abuse
        per_page = min(per_page, 100)
        
        # Search jobs
        jobs = Job.search_jobs(
            keyword=keyword if keyword else None,
            location=location if location else None,
            job_type=job_type if job_type else None,
            work_mode=work_mode if work_mode else None,
            salary_min=salary_min,
            skills=skills if skills else None,
            sort_by=sort_by,
            order=order,
            page=page,
            per_page=per_page
        )
        
        return jsonify({
            'jobs': jobs,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': len(jobs)
            }
        }), 200
    
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@job_bp.route('/<int:job_id>', methods=['GET'])
def get_job_details(job_id):
    try:
        job = Job.get_job_by_id(job_id)
        
        if not job:
            return jsonify({'error': 'Job not found'}), 404
        
        return jsonify({'job': job}), 200
    
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500