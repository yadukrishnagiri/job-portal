#!/bin/bash
# Production startup script for Render

# Install dependencies if not already installed
pip install --upgrade pip
pip install -r requirements.txt

# Start the application with gunicorn
exec gunicorn wsgi:app --bind 0.0.0.0:${PORT:-10000} --workers 2 --timeout 120
