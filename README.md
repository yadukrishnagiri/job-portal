# Submitted by:
- ## Prathmesh Pramod Goje - 52339100
- ## Pratham Bhatnagar - 52337157
- ## Yadukrishnagiri - 52339054
- ## Krishna Chadha - 52339050
- ## Raj Aryan - 52336727

# 🚀 Modern Student Job Portal

A comprehensive full-stack web application that connects students with recruiters and companies for job opportunities. Built with modern technologies and production-ready deployment configurations to provide a seamless job search and recruitment experience.

## 🌐 Live Demo
- **Frontend**: [https://job-portal-blush-pi.vercel.app/](https://job-portal-blush-pi.vercel.app/)
- **Backend**: Deploy using the configurations provided below

## ✨ Features

### 🎓 For Students
- **Complete Profile Management**: Create detailed profiles with education, skills, location, and salary expectations
- **CV Upload System**: Secure file upload for PDF, DOC, and DOCX resumes
- **Advanced Job Search**: Browse and filter jobs by location, type, work mode, salary, and skills
- **Job Application System**: Apply to jobs with custom cover letters
- **Application Tracking**: Real-time status monitoring (pending, shortlisted, rejected, hired)
- **Responsive Dashboard**: Modern UI with statistics and recent activity

### 🏢 For Recruiters
- **Professional Dashboard**: Comprehensive overview with job statistics and quick actions
- **Job Management**: Create, edit, and delete job postings with detailed requirements
- **Application Review**: Browse candidate profiles with CV access and application details
- **Hiring Pipeline**: Update application status and manage the recruitment process
- **Company Profile**: Maintain detailed company information and branding
- **Analytics**: Track job performance and application metrics

### 🔐 Security & Authentication
- **JWT Authentication**: Secure token-based authentication with 7-day expiry
- **Role-Based Access Control**: Separate interfaces and permissions for students vs. recruiters
- **Protected Routes**: Secure access to user-specific features
- **CORS Configuration**: Production-ready cross-origin resource sharing
- **File Security**: Safe handling and serving of uploaded documents

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - Modern UI library with hooks and concurrent features
- **TypeScript 5.5.3** - Type-safe JavaScript development
- **Vite 5.4.2** - Lightning-fast build tool and development server
- **Tailwind CSS 3.4.1** - Utility-first CSS framework with custom gradients
- **React Router DOM 6.8.0** - Client-side routing with protected routes
- **Lucide React 0.344.0** - Beautiful, customizable icon library

### Backend
- **Flask 2.3.3** - Lightweight Python web framework
- **Flask-CORS 4.0.0** - Cross-origin resource sharing with production configs
- **PyJWT 2.8.0** - JSON Web Token authentication and authorization
- **Werkzeug 2.3.7** - WSGI utility library for production deployment
- **Gunicorn 21.2.0** - Production WSGI HTTP Server
- **SQLite** - Lightweight database with schema migrations

### Development & Deployment
- **ESLint & TypeScript ESLint** - Code quality and type checking
- **Autoprefixer & PostCSS** - CSS processing and optimization
- **Vercel** - Frontend deployment platform
- **Render/Railway** - Backend deployment platforms

## 📁 Project Structure

```
job-portal-/
├── frontend/                    # React frontend application
├── backend/                     # Flask backend API
│   ├── app.py                  # Main Flask application with CORS config
│   ├── wsgi.py                 # Production WSGI entry point
│   ├── config.py               # Environment-based configuration
│   ├── requirements.txt        # Python dependencies with Gunicorn
│   ├── models/                 # Database models and business logic
│   │   ├── user_model.py       # User authentication model
│   │   ├── student_model.py    # Student profile management
│   │   ├── recruiter_model.py  # Recruiter/company profiles
│   │   ├── job_model.py        # Job posting and search
│   │   └── application_model.py # Job application management
│   ├── routes/                 # API route handlers
│   │   ├── auth_routes.py      # Authentication endpoints
│   │   ├── student_routes.py   # Student-specific API
│   │   ├── recruiter_routes.py # Recruiter-specific API
│   │   └── job_routes.py       # Job search and details API
│   ├── utils/                  # Utility functions
│   │   ├── auth.py             # JWT token management
│   │   └── file_handler.py     # File upload and management
│   └── database/               # Database configuration and schema
│       ├── db.py               # Database connection and utilities
│       └── schema.sql          # Database schema definitions
├── src/                        # Frontend source code
│   ├── components/             # Reusable React components
│   │   ├── Layout.jsx          # App layout with navigation
│   │   └── ProtectedRoute.jsx  # Route protection component
│   ├── pages/                  # Page components
│   │   ├── Home.jsx            # Landing page
│   │   ├── Login.jsx           # Authentication page
│   │   ├── Signup.jsx          # User registration
│   │   ├── student/            # Student-specific pages
│   │   │   ├── Dashboard.jsx   # Student dashboard with stats
│   │   │   ├── Profile.jsx     # Profile management with CV upload
│   │   │   ├── Jobs.jsx        # Job search and filtering
│   │   │   ├── JobDetails.jsx  # Job details and application
│   │   │   └── Applications.jsx # Application tracking
│   │   └── recruiter/          # Recruiter-specific pages
│   │       ├── Dashboard.jsx   # Recruiter dashboard with analytics
│   │       ├── Profile.jsx     # Company profile management
│   │       ├── Jobs.jsx        # Job management interface
│   │       ├── PostJob.jsx     # Job creation form
│   │       └── JobApplications.jsx # Application review system
│   └── utils/                  # Frontend utilities
│       ├── api.js              # API client with environment support
│       └── auth.js             # Authentication state management
├── supabase/                   # Database migrations (optional)
├── uploads/                    # File storage directory
├── render.yaml                 # Render deployment configuration
├── Procfile                    # Heroku/Railway deployment
└── package.json                # Project dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **Python** (v3.9 or higher)
- **Git**

### Quick Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd job-portal-
   ```

2. **Frontend Setup**
   ```bash
   npm install
   npm run dev
   ```

3. **Backend Setup**
   ```bash
   cd backend
   pip install -r requirements.txt
   python app.py
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

### Environment Configuration

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000  # For development
# VITE_API_URL=https://your-backend-url.onrender.com  # For production
```

#### Backend Environment Variables
```env
SECRET_KEY=your-secret-key-here
FLASK_ENV=development  # or 'production'
PORT=5000
UPLOAD_FOLDER=uploads
```

## 📱 Application Workflow

### Student Journey
1. **Registration**: Sign up with student role and basic information
2. **Profile Setup**: Complete profile with education, skills, location, and upload CV
3. **Job Discovery**: Browse jobs with advanced search and filtering options
4. **Application Process**: Apply to positions with personalized cover letters
5. **Progress Tracking**: Monitor application status and receive updates

### Recruiter Journey
1. **Company Registration**: Sign up with recruiter role and company details
2. **Profile Management**: Set up comprehensive company profile and branding
3. **Job Posting**: Create detailed job listings with requirements and specifications
4. **Candidate Review**: Browse applications, view CVs, and assess candidates
5. **Hiring Management**: Update application status and manage recruitment pipeline

## 🔧 API Documentation

### Authentication Endpoints
```
POST /auth/signup     - User registration with role selection
POST /auth/login      - User authentication with JWT token
```

### Student Endpoints
```
GET    /student/profile              - Retrieve student profile
PUT    /student/profile              - Update profile information
POST   /student/upload-cv            - Upload CV file
GET    /student/applications         - Get application history
POST   /student/jobs/apply/{job_id}  - Apply to specific job
```

### Recruiter Endpoints
```
GET    /recruiter/profile                    - Get company profile
PUT    /recruiter/profile                    - Update company information
POST   /recruiter/jobs                      - Create new job posting
GET    /recruiter/jobs                      - Get recruiter's job listings
PUT    /recruiter/jobs/{job_id}             - Update job posting
DELETE /recruiter/jobs/{job_id}             - Delete job posting
GET    /recruiter/jobs/{job_id}/applications - Get job applications
PUT    /recruiter/applications/{app_id}/status - Update application status
```

### Job Search Endpoints
```
GET /jobs/search  - Search jobs with filters (keyword, location, type, salary, etc.)
GET /jobs/{id}    - Get detailed job information
```

## 🚀 Production Deployment

### Backend Deployment (Render - Recommended)

1. **Push code to GitHub**
2. **Connect to Render**: Visit [render.com](https://render.com)
3. **Create Web Service** with these settings:
   - **Build Command**: `cd backend && pip install -r requirements.txt`
   - **Start Command**: `cd backend && gunicorn wsgi:app`
   - **Environment Variables**:
     ```
     SECRET_KEY=your-production-secret-key
     FLASK_ENV=production
     PORT=10000
     ```

### Alternative Deployment Options

#### Railway
```bash
# Push to GitHub, connect Railway, auto-deploy from backend folder
```

#### Heroku
```bash
git subtree push --prefix backend heroku main
```

### Frontend Deployment (Vercel)

1. **Already deployed**: https://job-portal-blush-pi.vercel.app/
2. **Add environment variable**:
   - Go to Vercel project settings
   - Add `VITE_API_URL` with your backend URL
   - Redeploy

## 🧪 Testing & Development

### Development Scripts
```bash
npm run dev        # Start frontend development server
npm run build      # Build for production
npm run lint       # Run ESLint
npm run preview    # Preview production build
```

### Backend Testing
```bash
cd backend
python app.py      # Development server
gunicorn wsgi:app  # Production server
```

## 🔒 Security Features

- **JWT Token Authentication** with automatic expiry
- **Role-based access control** with protected routes
- **Input validation** and sanitization
- **File upload restrictions** (PDF, DOC, DOCX only)
- **CORS configuration** for production deployment
- **Environment-based configuration** for sensitive data

## 🎨 Design Features

- **Modern gradient UI** with purple/blue theme
- **Responsive design** for all device types
- **Glassmorphism effects** with backdrop blur
- **Smooth animations** and hover effects
- **Professional typography** with proper spacing
- **Accessible color contrast** and navigation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is created for educational purposes as part of a university assignment.

## 🙏 Acknowledgments

- **React Team** for the excellent frontend framework
- **Flask Community** for the lightweight backend framework
- **Tailwind CSS** for the utility-first styling approach
- **Vercel & Render** for seamless deployment platforms

---

**Built with ❤️ by the Job Portal Team**
