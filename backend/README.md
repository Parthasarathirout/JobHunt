# 🔧 JobHunt Backend API

The backend API for the JobHunt job portal platform, built with Node.js, Express.js, and MongoDB. Provides comprehensive job management, user authentication, and file upload functionality.

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

## 🚀 Features

- **RESTful API** - Clean, organized endpoints
- **JWT Authentication** - Secure token-based authentication
- **File Upload** - Cloudinary integration for image uploads
- **Data Validation** - Comprehensive input validation
- **Error Handling** - Structured error responses
- **CORS Support** - Cross-origin resource sharing
- **Security** - Password hashing and secure cookies

## 📁 Project Structure

```
backend/
├── controllers/           # Business logic handlers
│   ├── application.controller.js
│   ├── company.controller.js
│   ├── job.controller.js
│   └── user.controller.js
├── middlewares/          # Custom middleware functions
│   ├── isAuthenticated.js
│   └── mutler.js
├── models/              # Mongoose database models
│   ├── application.model.js
│   ├── company.model.js
│   ├── job.model.js
│   └── user.model.js
├── routes/              # API route definitions
│   ├── application.route.js
│   ├── company.route.js
│   ├── job.route.js
│   └── user.route.js
├── utils/               # Utility functions
│   ├── cloudinary.js
│   ├── datauri.js
│   └── db.js
├── index.js             # Server entry point
├── package.json         # Dependencies and scripts
└── .env                 # Environment variables
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Cloudinary account

### Installation Steps

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables**
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/jobhunt
   SECRET_KEY=your_super_secret_jwt_key_here
   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   PORT=3000
   ```

5. **Start the server**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## 📊 Dependencies

### Core Dependencies
```json
{
  "express": "^4.18.2",           // Web framework
  "mongoose": "^7.5.0",           // MongoDB ODM
  "jsonwebtoken": "^9.0.2",       // JWT implementation
  "bcryptjs": "^2.4.3",          // Password hashing
  "cloudinary": "^1.40.0",       // Image upload service
  "multer": "^1.4.5-lts.1",      // File upload middleware
  "cookie-parser": "^1.4.6",     // Cookie parsing
  "cors": "^2.8.5",              // Cross-origin requests
  "dotenv": "^16.3.1",           // Environment variables
  "datauri": "^4.1.0"            // File URI conversion
}
```

### Development Dependencies
```json
{
  "nodemon": "^3.0.1"            // Auto-restart during development
}
```

## 🔗 API Endpoints

### Authentication Routes (`/api/v1/user`)
```
POST   /register           # User registration
POST   /login             # User login
GET    /logout            # User logout
POST   /profile/update    # Update user profile
```

### Job Routes (`/api/v1/job`)
```
POST   /post              # Create new job (Auth required)
GET    /get               # Get all jobs (Public)
GET    /get/:id           # Get job by ID (Public)
GET    /getadminjobs      # Get recruiter's jobs (Auth required)
```

### Company Routes (`/api/v1/company`)
```
POST   /register          # Register company (Auth required)
GET    /get               # Get all companies (Public)
GET    /get/:id           # Get company by ID (Public)
PUT    /update/:id        # Update company (Auth required)
```

### Application Routes (`/api/v1/application`)
```
POST   /apply/:id         # Apply for job (Auth required)
GET    /get               # Get user applications (Auth required)
GET    /:id/applicants    # Get job applicants (Auth required)
POST   /status/:id/update # Update application status (Auth required)
```

## 🗄️ Database Models

### User Model
```javascript
{
  fullname: String,         // User's full name
  email: String,            // Unique email address
  phoneNumber: String,      // Contact number
  password: String,         // Hashed password
  role: String,             // 'student' or 'recruiter'
  profile: {
    bio: String,            // User biography
    skills: [String],       // Array of skills
    resume: String,         // Resume file URL
    resumeOriginalName: String,
    company: ObjectId,      // Reference to Company
    profilePhoto: String    // Profile image URL
  }
}
```

### Company Model
```javascript
{
  name: String,             // Company name
  description: String,      // Company description
  website: String,          // Company website
  location: String,         // Company location
  logo: String,             // Company logo URL
  userId: ObjectId          // Reference to User (recruiter)
}
```

### Job Model
```javascript
{
  title: String,            // Job title
  description: String,      // Job description
  requirements: [String],   // Job requirements
  salary: Number,           // Salary amount
  experienceLevel: Number,  // Required experience in years
  location: String,         // Job location
  jobType: String,          // 'Full Time', 'Part Time', etc.
  position: Number,         // Number of positions
  company: ObjectId,        // Reference to Company
  created_by: ObjectId,     // Reference to User (recruiter)
  applications: [ObjectId]  // References to Applications
}
```

### Application Model
```javascript
{
  job: ObjectId,            // Reference to Job
  applicant: ObjectId,      // Reference to User (applicant)
  status: String            // 'pending', 'accepted', 'rejected'
}
```

## 🔐 Authentication System

### JWT Implementation
- **Token Generation**: Using jsonwebtoken with custom secret
- **Token Storage**: HTTP-only cookies for security
- **Token Verification**: Middleware for protected routes
- **Role-based Access**: Different permissions for students and recruiters

### Password Security
- **Hashing**: Bcryptjs with salt rounds
- **Validation**: Strong password requirements
- **Storage**: Never store plain text passwords

### Example Authentication Middleware
```javascript
const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Authentication failed",
            success: false,
        });
    }
};
```

## 📁 File Upload System

### Cloudinary Integration
- **Image Processing**: Automatic optimization and compression
- **Secure URLs**: Generated secure URLs for file access
- **Multiple Formats**: Support for various image formats
- **Storage Management**: Organized folder structure

### Upload Configuration
```javascript
// Cloudinary setup
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
});

// Multer configuration for memory storage
const storage = multer.memoryStorage();
export const singleUpload = multer({ storage }).single("file");
```

## 🛡️ Security Features

### Input Validation
- **Data Sanitization**: Clean user inputs
- **Type Validation**: Ensure correct data types
- **Length Limits**: Prevent buffer overflow attacks
- **SQL Injection Prevention**: Mongoose ODM protection

### CORS Configuration
```javascript
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};
app.use(cors(corsOptions));
```

### Environment Variables Security
- Sensitive data stored in `.env` file
- Never commit secrets to version control
- Use different configs for dev/prod environments

## 🧪 Testing

### Manual Testing with curl
```bash
# Test user registration
curl -X POST http://localhost:3000/api/v1/user/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":"John Doe","email":"john@example.com","password":"password123","role":"student"}'

# Test job creation (requires authentication)
curl -X POST http://localhost:3000/api/v1/job/post \
  -H "Content-Type: application/json" \
  -H "Cookie: token=your_jwt_token" \
  -d '{"title":"Software Engineer","description":"Great opportunity","salary":50000}'
```

## 📈 Performance Optimization

### Database Optimization
- **Indexing**: Proper indexes on frequently queried fields
- **Population**: Efficient data population with select fields
- **Pagination**: Implement pagination for large datasets
- **Caching**: Consider Redis for frequently accessed data

### Response Optimization
- **Compression**: Gzip compression for responses
- **Minification**: Minify JSON responses
- **Caching Headers**: Appropriate cache headers for static content

## 🐛 Error Handling

### Structured Error Responses
```javascript
// Success Response Format
{
    "message": "Operation successful",
    "success": true,
    "data": { ... }
}

// Error Response Format
{
    "message": "Error description",
    "success": false,
    "error": "Detailed error information"
}
```

### Global Error Handler
```javascript
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    
    res.status(statusCode).json({
        success: false,
        message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});
```

## 🚀 Deployment

### Environment Setup
1. Set up MongoDB Atlas cluster
2. Configure Cloudinary account
3. Set environment variables in hosting platform
4. Update CORS origins for production

### Deployment Platforms
- **Railway**: Easy deployment with GitHub integration
- **Heroku**: Traditional PaaS platform
- **DigitalOcean**: VPS deployment
- **AWS EC2**: Full server control

### Production Checklist
- [ ] Environment variables configured
- [ ] Database connection tested
- [ ] CORS settings updated
- [ ] SSL certificates installed
- [ ] Monitoring tools configured
- [ ] Backup strategies implemented

## 📝 API Documentation

### Postman Collection
Import the provided Postman collection for easy API testing:
```json
{
  "info": {
    "name": "JobHunt API",
    "description": "Complete API documentation for JobHunt backend"
  }
}
```

### Swagger Documentation
Access interactive API documentation at:
```
http://localhost:3000/api-docs
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow coding standards
4. Add tests for new features
5. Submit a pull request

### Coding Standards
- Use ES6+ syntax
- Follow camelCase naming convention
- Add JSDoc comments for functions
- Handle errors appropriately
- Write clean, readable code

## 📞 Support

For backend-specific issues:
- Check the logs for error messages
- Verify environment variables
- Test database connectivity
- Review API endpoints with Postman

---

<div align="center">
  <p>🔧 Backend API for JobHunt Platform</p>
  <p>Built with Node.js, Express.js, and MongoDB</p>
</div>