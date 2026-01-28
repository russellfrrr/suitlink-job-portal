# 👔 SuitLink - Job Portal Application

**SuitLink** is a modern, full-stack job portal web application that connects talented job seekers with innovative companies. Built with React and Node.js, SuitLink provides an intuitive platform for applicants to discover opportunities and for companies to find their perfect candidates.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

---

## Features

### For Job Seekers
- Secure user authentication and profile management
- Create and manage comprehensive applicant profiles
- Browse and search job postings
- Submit job applications with resume parsing
- Real-time notifications for application updates
- Track application status and history

### For Employers
- Company profile creation and management
- Post and manage job openings
- Review applicant profiles and applications
- AI-powered resume screening
- Communicate with candidates
- Application tracking and management

### General Features
- Modern, responsive UI with Tailwind CSS
- JWT-based authentication with HTTP-only cookies
- Mobile-friendly design
- Fast and optimized performance
- Security best practices with Helmet.js

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **React Router DOM 7** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Zod** - Schema validation
- **Vite** - Build tool and dev server

### Backend
- **Node.js** - Runtime environment
- **Express 5** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Cloud storage for media files
- **OpenAI** - AI-powered features
- **Nodemailer** - Email notifications
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger

---

## 📁 Project Structure

```
suitlink-job-portal/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── api/             # API integration
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # React context providers
│   │   ├── hooks/           # Custom React hooks
│   │   ├── pages/           # Page components
│   │   ├── routes/          # Route definitions
│   │   ├── services/        # Business logic services
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── package.json
│   └── vite.config.js
│
└── backend/                  # Node.js backend API
    ├── config/              # Configuration files
    ├── controllers/         # Request handlers
    ├── database/            # Database connection
    ├── middlewares/         # Custom middleware
    ├── models/              # Mongoose models
    ├── routes/              # API routes
    ├── services/            # Business logic
    ├── utils/               # Utility functions
    ├── validators/          # Input validation
    ├── app.js               # Express app setup
    ├── server.js            # Server entry point
    └── package.json
```

---


## 📚 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | User login |
| POST | `/auth/logout` | User logout |
| GET | `/auth/me` | Get current user |

### Company Profile Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/company/` | Get all companies |
| GET | `/company/:id` | Get company by ID |
| POST | `/company/` | Create company profile |
| PUT | `/company/:id` | Update company profile |
| DELETE | `/company/:id` | Delete company profile |

### Applicant Profile Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/applicant/` | Get all applicants |
| GET | `/applicant/:id` | Get applicant by ID |
| POST | `/applicant/` | Create applicant profile |
| PUT | `/applicant/:id` | Update applicant profile |
| DELETE | `/applicant/:id` | Delete applicant profile |

### Job Posting Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/jobs/` | Get all job postings |
| GET | `/jobs/:id` | Get job by ID |
| POST | `/jobs/` | Create job posting |
| PUT | `/jobs/:id` | Update job posting |
| DELETE | `/jobs/:id` | Delete job posting |

### Job Application Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/applications/` | Get all applications |
| GET | `/applications/:id` | Get application by ID |
| POST | `/applications/` | Submit application |
| PUT | `/applications/:id` | Update application status |
| DELETE | `/applications/:id` | Delete application |

### Notification Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/notifications/` | Get all notifications |
| GET | `/notifications/:id` | Get notification by ID |
| PUT | `/notifications/:id/read` | Mark notification as read |
| DELETE | `/notifications/:id` | Delete notification |

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Merge Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 👥 Team

Developed by **The Semicolons**

**Russell Ferrero** - Backend / System Design  
**Jericho Gabarda** - Frontend/ UI/UX Design  
**Jerwin Relacion** - Agile Coordinator

---

## 📞 Support

For support, please open an issue in the GitLab repository or contact the development team.

---

**Happy Hiring! 👔**
