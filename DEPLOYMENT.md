# 🚀 Backend API Deployment - Render.com

## Backend-Only Deployment

Since your frontend is already deployed elsewhere, here's the configuration for deploying just the backend API:

**Render Settings:**
- **Repository:** `https://github.com/Parthasarathirout/JobHunt.git`
- **Build Command:** `cd backend && npm install`  
- **Start Command:** `cd backend && npm start`
- **Auto Deploy:** Yes
- **Service Type:** Web Service

**Environment Variables:**
```
NODE_ENV=production
MONGO_URI=mongodb+srv://swayam123code_db_user:uOBrSMsc7bhBcnQz@cluster3.oxqwdd1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster3
SECRET_KEY=8ac78791b1bc867d05409e6bcc627a92d7c2d3f0c7cf6b329c13993591add47fffe2553a02c473f7db1e714d7541ecd0716d804285e51c7a0261bacdf4acceb0
CLOUD_NAME=dmeabd0vm
API_KEY=632685119924612
API_SECRET=uNrzR0igvfoRsVbvTuxDM0SKCP0
PORT=10000
```

## Frontend Integration

Since your frontend is already deployed, make sure to update your frontend's API base URL to point to your new Render backend:

```javascript
// In your frontend constants or config
const API_BASE_URL = 'https://your-backend-name.onrender.com';
```

## CORS Configuration

You may need to update your backend's CORS settings to allow requests from your frontend domain:

```javascript
// In backend/index.js
app.use(cors({
  origin: ['https://your-frontend-domain.com', 'http://localhost:5173'],
  credentials: true
}));
```

## Why This Setup?

✅ **Backend Only**: Focus on API deployment since frontend is handled elsewhere  
✅ **MongoDB Atlas**: Uses your existing database  
✅ **Cloudinary**: Uses your existing file storage  
✅ **Simple**: Clean separation of concerns  
✅ **Free Tier**: Efficient use of Render's free plan  

## Deploy Steps

1. Go to [Render.com](https://render.com)
2. Connect your GitHub repo: `Parthasarathirout/JobHunt`
3. Choose "Web Service"
4. Use build/start commands above
5. Add environment variables
6. Deploy! 🚀

## After Deployment

- Your API will be available at: `https://your-service-name.onrender.com`
- Update your frontend to use this URL
- Test API endpoints to ensure everything works