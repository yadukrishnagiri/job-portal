# Submitted by:
- ## Prathmesh Pramod Goje - 52339100
- ## Pratham Bhatnagar - 52337157
- ## Yadukrishnagiri - 52339054
- ## Krishna Chadha - 52339050
- ## Raj Aryan - 52336727

A comprehensive full-stack web application that connects students with recruiters and companies for job opportunities. Built with modern technologies to provide a seamless job search and recruitment experience.

## ✨ Features

### 🎓 For Students
- **Profile Management**: Create and manage detailed profiles with education, skills, and experience
- **CV Upload**: Secure file upload system for resumes and cover letters
- **Job Search**: Browse and search for relevant job opportunities
- **Smart Matching**: Set preferences for job type, location, and salary expectations
- **Application Tracking**: Monitor application status (pending, shortlisted, rejected, hired)
- **Job Alerts**: Get notified about new positions matching your criteria

### 🏢 For Recruiters
- **Job Posting**: Create detailed job listings with requirements and specifications
- **Candidate Management**: Browse student profiles and review applications
- **Hiring Pipeline**: Manage the entire hiring process from posting to hiring
- **Company Profile**: Maintain company information and branding

### 🔐 Security & Access
- **JWT Authentication**: Secure token-based authentication system
- **Role-Based Access**: Different interfaces for students vs. recruiters
- **Protected Routes**: Secure access to user-specific features
- **File Security**: Safe handling of uploaded documents

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - Modern UI library with hooks
- **TypeScript 5.5.3** - Type-safe JavaScript development
- **Vite 5.4.2** - Fast build tool and development server
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **React Router DOM 6.8.0** - Client-side routing
- **Lucide React** - Beautiful icon library

### Backend
- **Flask 2.3.3** - Python web framework
- **Flask-CORS** - Cross-origin resource sharing
- **PyJWT 2.8.0** - JSON Web Token authentication
- **SQLite** - Lightweight database
- **python-multipart** - File upload handling

### Database
- **SQLite** - Local database for development
- **Supabase** - PostgreSQL-based backend service (migrations included)

## 📁 Project Structure

```
job-portal-/
├── frontend/                 # React frontend application
├── backend/                  # Flask backend API
│   ├── app.py               # Main Flask application
│   ├── config.py            # Configuration settings
│   ├── models/              # Data models
│   ├── routes/              # API route handlers
│   ├── utils/               # Utility functions
│   └── database/            # Database configuration
├── src/                     # Main source code
│   ├── components/          # Reusable React components
│   ├── pages/               # Page components
│   │   ├── student/         # Student-specific pages
│   │   └── recruiter/       # Recruiter-specific pages
│   └── utils/               # Frontend utility functions
├── supabase/                # Database migrations
└── uploads/                 # File storage
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **Git**

### Frontend Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment**
   ```bash
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Initialize database**
   ```bash
   python -c "from database.db import init_database; init_database()"
   ```

6. **Run Flask application**
   ```bash
   python app.py
   ```

### Environment Variables

Create a `.env` file in the backend directory:

```env
SECRET_KEY=your_secret_key_here
UPLOAD_FOLDER=uploads
DATABASE_URL=sqlite:///database/portal.db
```

## 📱 Usage

### Student Workflow
1. **Sign up** with student role
2. **Complete profile** with education, skills, and upload CV
3. **Browse jobs** using search and filters
4. **Apply to positions** with cover letter
5. **Track applications** and status updates

### Recruiter Workflow
1. **Sign up** with recruiter role
2. **Complete company profile** with details
3. **Post job openings** with requirements
4. **Review applications** from candidates
5. **Manage hiring process** and status updates

## 🔧 API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/login` - User authentication
- `POST /auth/logout` - User logout

### Student Routes
- `GET /student/profile` - Get student profile
- `PUT /student/profile` - Update student profile
- `GET /student/jobs` - Browse available jobs
- `POST /student/apply` - Apply to a job

### Recruiter Routes
- `GET /recruiter/profile` - Get company profile
- `PUT /recruiter/profile` - Update company profile
- `POST /recruiter/jobs` - Create new job posting
- `GET /recruiter/applications` - Review applications

### Job Routes
- `GET /jobs` - List all jobs
- `GET /jobs/<id>` - Get job details
- `PUT /jobs/<id>` - Update job posting

## 🧪 Testing

```bash
# Frontend linting
npm run lint

# Backend testing (if tests are implemented)
cd backend
python -m pytest
```

## 📦 Deployment

### Frontend
```bash
npm run build
# Deploy dist/ folder to your hosting service
```

### Backend
```bash
# Set production environment variables
export FLASK_ENV=production
export SECRET_KEY=your_production_secret

# Run with production server
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/job-portal-/issues) page
2. Create a new issue with detailed description
3. Contact the development team

## 🔮 Future Enhancements

- [ ] Email notifications system
- [ ] Advanced job matching algorithms
- [ ] Video interview integration
- [ ] Mobile application
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Payment integration for premium features

---

**Built with ❤️ for connecting students with their dream careers**
