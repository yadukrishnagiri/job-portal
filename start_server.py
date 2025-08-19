#!/usr/bin/env python3
"""
Production startup script for Render deployment
"""
import os
import sys
import subprocess

def main():
    # Change to backend directory
    backend_dir = os.path.join(os.path.dirname(__file__), 'backend')
    os.chdir(backend_dir)
    
    # Add backend to Python path
    sys.path.insert(0, backend_dir)
    
    # Get port from environment
    port = os.environ.get('PORT', '10000')
    
    # Install gunicorn if not available
    try:
        import gunicorn
    except ImportError:
        print("Installing gunicorn...")
        subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'gunicorn'])
    
    # Start the application
    cmd = [
        sys.executable, '-m', 'gunicorn',
        '--bind', f'0.0.0.0:{port}',
        '--workers', '2',
        '--timeout', '120',
        'wsgi:app'
    ]
    
    print(f"Starting server on port {port}")
    print(f"Command: {' '.join(cmd)}")
    
    os.execv(sys.executable, cmd)

if __name__ == '__main__':
    main()
