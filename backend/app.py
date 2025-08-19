from flask import Flask, send_from_directory
from flask_cors import CORS
from config import Config
from database.db import init_database
from routes.auth_routes import auth_bp
from routes.student_routes import student_bp
from routes.recruiter_routes import recruiter_bp
from routes.job_routes import job_bp
import os

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize CORS
    CORS(app)
    
    # Initialize database
    init_database()
    
    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(student_bp, url_prefix='/student')
    app.register_blueprint(recruiter_bp, url_prefix='/recruiter')
    app.register_blueprint(job_bp, url_prefix='/jobs')
    
    @app.route('/')
    def index():
        return {'message': 'Job Portal API is running'}
    
    @app.route('/health')
    def health():
        return {'status': 'healthy'}

    # Serve uploaded files
    @app.route('/uploads/<path:filename>')
    def uploaded_file(filename):
        upload_folder = app.config.get('UPLOAD_FOLDER')
        return send_from_directory(upload_folder, filename)
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)