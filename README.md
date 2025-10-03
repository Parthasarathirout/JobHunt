# 🚀 JobHunt - Complete Job Portal Platform

A modern, full-stack job search platform built with the MERN stack, featuring advanced UI/UX design, real-time animations, and comprehensive job management functionality.

![JobHunt Platform](https://img.shields.io/badge/JobHunt-Job%20Portal-purple?style=for-the-badge&logo=briefcase)
![MERN Stack](https://img.shields.io/badge/MERN-Full%20Stack-green?style=for-the-badge&logo=react)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)

## 🌟 Features

### 🎯 For Job Seekers
- **Advanced Job Search** - Search by title, company, location, or keywords
- **Smart Filtering** - Filter by location, job type, experience, salary range
- **Job Applications** - Apply to jobs with profile management
- **Application Tracking** - View all applied jobs in one place
- **Profile Management** - Complete profile with skills and experience

### 🏢 For Recruiters
- **Company Dashboard** - Comprehensive analytics and job management
- **Job Posting** - Create and manage job listings
- **Applicant Management** - Review and manage job applications
- **Company Profile** - Complete company information and branding

### 🎨 Design & UX
- **Modern UI/UX** - Beautiful gradient designs and animations
- **Responsive Design** - Works perfectly on all devices
- **Animated Backgrounds** - Dynamic grid animations and floating elements
- **Smooth Transitions** - Professional animations using Framer Motion
- **Dark/Light Theme** - Customizable theme support

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Redux Toolkit** - State management
- **React Router Dom** - Client-side routing
- **Radix UI** - Accessible UI components
- **Lucide React** - Beautiful SVG icons

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, minimalist web framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Token authentication
- **Bcryptjs** - Password hashing
- **Cloudinary** - Image upload and management
- **Multer** - File upload middleware
- **Cookie Parser** - Cookie handling

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Cloudinary account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/JobHunt.git
   cd JobHunt
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Variables**
   
   Create `.env` file in the backend directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   SECRET_KEY=your_jwt_secret_key
   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   PORT=3000
   ```

5. **Run the Application**
   
   Backend (Terminal 1):
   ```bash
   cd backend
   npm start
   ```
   
   Frontend (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3000`

## 📁 Project Structure

```
JobHunt/
├── backend/
│   ├── controllers/        # Business logic
│   ├── middlewares/        # Authentication & file upload
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   ├── index.js           # Server entry point
│   └── package.json       # Backend dependencies
├── frontend/
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── redux/         # State management
│   │   ├── utils/         # Utility functions
│   │   └── main.jsx       # Frontend entry point
│   └── package.json       # Frontend dependencies
└── README.md              # Project documentation
```

## 🔑 Key Features Explained

### Authentication System
- JWT-based authentication with httpOnly cookies
- Password hashing with bcryptjs
- Protected routes for authenticated users
- Role-based access control (Student/Recruiter)

### Job Management
- CRUD operations for job postings
- Advanced search and filtering
- Application tracking system
- Company-specific job management

### File Upload System
- Cloudinary integration for image uploads
- Profile photo and resume upload support
- Optimized image processing and storage

### Modern UI/UX
- Gradient-based color scheme (purple to blue)
- Animated grid backgrounds
- Smooth page transitions
- Responsive design patterns
- Interactive hover effects

## 🎨 Design System

### Color Palette
- **Primary**: Purple (#7C3AED) to Blue (#2563EB) gradient
- **Secondary**: Gray tones for text and borders
- **Background**: Soft gradient from purple-50 to blue-50
- **Accents**: Green for success, Red for errors, Orange for warnings

### Typography
- **Headings**: Bold, gradient text effects
- **Body**: Clean, readable fonts
- **Interactive**: Hover state color transitions

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Gradient backgrounds with hover animations
- **Forms**: Clean inputs with focus states
- **Navigation**: Sticky navbar with backdrop blur

## 📊 Database Schema

### User Model
- Authentication information
- Profile details and preferences
- Role-based permissions

### Company Model
- Company information and branding
- Location and contact details
- Associated jobs and recruiters

### Job Model
- Job details and requirements
- Salary and location information
- Application tracking

### Application Model
- Job application status
- Applicant information
- Application timestamps

## 🔒 Security Features

- **Password Hashing** - Bcryptjs with salt rounds
- **JWT Authentication** - Secure token-based auth
- **HTTP-Only Cookies** - XSS protection
- **Input Validation** - Server-side validation
- **CORS Configuration** - Cross-origin request handling
- **Environment Variables** - Sensitive data protection

## 🚀 Deployment

### Backend Deployment (Railway/Heroku)
1. Set environment variables in platform dashboard
2. Configure MongoDB Atlas connection
3. Set up Cloudinary integration
4. Deploy backend with build commands

### Frontend Deployment (Vercel/Netlify)
1. Connect GitHub repository
2. Configure build settings for Vite
3. Set environment variables for API endpoints
4. Deploy with automatic builds

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- Framer Motion for smooth animations
- MongoDB for the flexible database
- Cloudinary for image management
- Radix UI for accessible components

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information
4. Contact the development team

---

<div align="center">
  <p>Made with ❤️ by the JobHunt Team</p>
  <p>⭐ Don't forget to star this repository if you found it helpful!</p>
</div>